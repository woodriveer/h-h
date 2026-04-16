import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            An Interactive Story
          </p>
          <h1 className="text-3xl font-bold">Heaven &amp; Hell</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A soul stands at the crossroads of eternity. Every choice matters. Some battles must be
            won before you can move on. Your fate is in the dice.
          </p>
        </div>

        <Button asChild size="lg" className="px-8">
          <Link href="/game">Begin your journey</Link>
        </Button>

        <p className="text-xs text-muted-foreground">(Press d to toggle dark mode)</p>
      </div>
    </main>
  )
}
