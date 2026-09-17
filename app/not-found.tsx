import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { LINKS } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">404</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page went offline</h1>
      <p className="mt-4 max-w-md text-base text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get
        you back to a stable connection.
      </p>
      <Link href={LINKS.home} className="btn-primary mt-8">
        <FiArrowLeft size={15} />
        Back to homepage
      </Link>
    </main>
  );
}