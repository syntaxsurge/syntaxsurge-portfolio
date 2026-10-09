import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/data/business";

export const alt = business.legalName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", business.logo.src),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 68px",
          background: "#f5f7fc",
          color: "#172238",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <span style={{ fontWeight: 700 }}>{business.name}</span>
          <span style={{ fontSize: 19, color: "#52617a" }}>
            SOFTWARE DEVELOPMENT SERVICES
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: -3,
            }}
          >
            <span>Software that works.</span>
            <span style={{ color: "#295bff" }}>For your business.</span>
          </div>
          {/* ImageResponse uses a native image with embedded local asset bytes. */}
          <img
            src={`data:image/jpeg;base64,${logo}`}
            alt=""
            width={248}
            height={248}
            style={{ borderRadius: 24 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            borderTop: "1px solid #dbe2f0",
            paddingTop: 25,
            color: "#52617a",
          }}
        >
          <span>WEB APPLICATIONS · AI EXPERIENCES · PRODUCT DEVELOPMENT</span>
          <span style={{ color: "#172238" }}>syntaxsurge.com</span>
        </div>
      </div>
    ),
    size,
  );
}
