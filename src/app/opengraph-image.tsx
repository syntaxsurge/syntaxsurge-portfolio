import { ImageResponse } from "next/og";
export const alt = "Jade Laurence Empleo — Ideas into things people use.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "65px 72px",
          background: "#f6f5ef",
          color: "#25342c",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -110,
            width: 410,
            height: 410,
            borderRadius: "50%",
            background: "#d0e9a0",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3 }}>
          JADE LAURENCE EMPLEO / SYNTAXSURGE
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 99,
            lineHeight: 1.05,
            letterSpacing: -5,
            marginTop: 91,
          }}
        >
          <span>Ideas into things</span>
          <span style={{ color: "#7b8a70" }}>people use.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 21,
            marginTop: 56,
            color: "#64725d",
          }}
        >
          PRODUCTS · AI · WEB3 · THOUGHTFUL INTERFACES
        </div>
      </div>
    ),
    size,
  );
}
