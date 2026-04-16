#!/bin/bash
# .claude/feature-validate.sh
#
# Runs after Claude stops (Stop asyncRewake hook).
# Fast-exits silently when there are no uncommitted changes.
# When changes exist: typechecks → commits → pushes → polls GitHub Actions.
# Exits with code 2 to wake Claude with the pipeline result.

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$REPO_ROOT" ]; then
  exit 0
fi

cd "$REPO_ROOT" || exit 0

WEB_DIR="heaven-and-hell-web"

# ── 1. Check for uncommitted changes ─────────────────────────────────────────
# Use git ls-files + git diff to count tracked/staged changes + new files
TRACKED_CHANGES=$(git diff --name-only "$WEB_DIR/" 2>/dev/null | wc -l | tr -d ' ')
STAGED_CHANGES=$(git diff --cached --name-only "$WEB_DIR/" 2>/dev/null | wc -l | tr -d ' ')
UNTRACKED=$(git ls-files --others --exclude-standard "$WEB_DIR/" 2>/dev/null | wc -l | tr -d ' ')
TOTAL=$(( TRACKED_CHANGES + STAGED_CHANGES + UNTRACKED ))

if [ "$TOTAL" -eq 0 ]; then
  exit 0  # Nothing to do — silent
fi

echo "━━━ Feature Validation Pipeline ━━━"
echo ""

# ── 2. Typecheck ──────────────────────────────────────────────────────────────
echo "▶ Running typecheck..."
cd "$REPO_ROOT/$WEB_DIR" || exit 2
if ! pnpm typecheck 2>&1; then
  echo ""
  echo "✗ TYPECHECK FAILED — fix the errors above before committing."
  exit 2
fi
echo "✓ Typecheck passed"

# ── 3. Commit ─────────────────────────────────────────────────────────────────
cd "$REPO_ROOT" || exit 2
git add "$WEB_DIR/"

if git diff --cached --quiet; then
  echo "✓ No staged changes (possibly already committed)"
else
  echo ""
  echo "▶ Committing..."

  # Derive message from top-level dirs that changed
  CHANGED_AREAS=$(
    git diff --cached --name-only "$WEB_DIR/" \
      | sed "s|${WEB_DIR}/||" \
      | awk -F/ '{ print $1 }' \
      | sort -u \
      | tr '\n' ', ' \
      | sed 's/,[ ]*$//'
  )
  [ -z "$CHANGED_AREAS" ] && CHANGED_AREAS="game"

  COMMIT_MSG="feat: update ${CHANGED_AREAS} in ${WEB_DIR}"
  git commit -m "$COMMIT_MSG" 2>&1
  echo "✓ Committed: $COMMIT_MSG"
fi

# ── 4. Push ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ Pushing to origin..."
if ! git push 2>&1; then
  echo "✗ PUSH FAILED — see error above"
  exit 2
fi
echo "✓ Pushed"

# ── 5. GitHub Actions ─────────────────────────────────────────────────────────
echo ""
echo "▶ Checking GitHub Actions pipeline..."
sleep 8  # Give GitHub time to register the push

# gh CLI returns JSON; parse with shell + grep instead of jq
RUN_INFO=$(gh run list --limit 1 --json databaseId,name,status 2>/dev/null)
RUN_ID=$(echo "$RUN_INFO" | grep -o '"databaseId":[0-9]*' | grep -o '[0-9]*')
RUN_NAME=$(echo "$RUN_INFO" | grep -o '"name":"[^"]*"' | sed 's/"name":"//;s/"//')

if [ -z "$RUN_ID" ]; then
  echo "ℹ  No GitHub Actions run found."
  echo "   Add a workflow under .github/workflows/ to enable CI checks."
  exit 2
fi

echo "Watching: ${RUN_NAME:-CI} (run #$RUN_ID)..."
gh run watch "$RUN_ID" --exit-status 2>&1
CI_STATUS=$?

echo ""
gh run view "$RUN_ID" 2>&1

echo ""
if [ "$CI_STATUS" -eq 0 ]; then
  echo "✓ CI PASSED — pipeline is green."
else
  echo "✗ CI FAILED — see errors above."
fi

exit 2  # Always wake Claude with the final report
