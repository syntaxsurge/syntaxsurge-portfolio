import Link from "next/link";
import { Header } from "@/components/header";
import { Arrow } from "@/components/icons";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="not-found shell">
        <span className="eyebrow">404 / A SMALL DETOUR</span>
        <h1>
          This page isn’t
          <br />
          part of the collection.
        </h1>
        <Link className="button button-dark" href="/">
          Back to the work <Arrow />
        </Link>
      </main>
    </>
  );
}
