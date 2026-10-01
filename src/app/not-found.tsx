import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/icons";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="not-found shell">
        <span className="eyebrow">404 / PAGE NOT FOUND</span>
        <h1>This page couldn’t be found.</h1>
        <p>Check the address or find what you need in the project collection.</p>
        <div className="project-links">
          <Link className="button button-dark" href="/#archive">
            Browse all projects <Arrow />
          </Link>
          <Link className="button button-outline" href="/">
            Back to home <Arrow />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
