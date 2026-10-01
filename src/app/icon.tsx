import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export const dynamic = 'force-static';
/**
 * Favicon dinámico: monograma "S" sobre fondo oscuro con acento esmeralda.
 * Next.js lo expone automáticamente en /icon.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0b0f1a 0%,#0f172a 100%)",
          borderRadius: 8,
          color: "#10b981",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -1,
          border: "2px solid #10b981",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
