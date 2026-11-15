import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0d0e" }}>
        <svg width="180" height="180" viewBox="0 0 64 64" fill="none" strokeWidth="6">
          <path d="M13 44V10l19 23 19-23v34" stroke="#e9eced" />
          <path d="M32 33v25" stroke="#4fd1c5" />
        </svg>
      </div>
    ),
    size,
  )
}
