import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { wrapItUp } from "@/data/wrap-it-up";

export default function WrapItUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="project-page app-page shell">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#archive">All projects</Link>
          <span aria-hidden="true">/</span>
          <Link href={wrapItUp.path}>{wrapItUp.name}</Link>
        </nav>
        {children}
        <div className="app-page-footer">
          <p>Wrap It Up! by Jade Laurence Empleo · SyntaxSurge</p>
          <Link href={`${wrapItUp.path}/support`}>Get help</Link>
          <Link href={`${wrapItUp.path}/privacy`}>Privacy policy</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
