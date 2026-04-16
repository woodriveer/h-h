"use client"

import { Button } from "@/components/ui/button"

interface ShareButtonProps {
  endingTitle: string
  endingType: "good" | "bad"
}

export function ShareButton({ endingTitle, endingType }: ShareButtonProps) {
  function handleShare() {
    const label = endingType === "good" ? "Salvation" : "The Fallen"
    const text = `I just reached "${endingTitle}" (${label}) in Heaven & Hell — a branching story of fate. #HeavenAndHell`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
      {/* X logo */}
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 fill-current"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Share on X
    </Button>
  )
}
