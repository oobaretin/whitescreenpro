import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "License - WhiteScreen Tools",
  description: "License information for WhiteScreen Tools.",
};

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-page text-page">
      <Navigation />
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-page/80 hover:text-page transition-colors mb-8"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-page">
            License
          </h1>

          <div className="space-y-8 text-page/90 leading-relaxed">
            <section className="bg-card border border-card p-6 sm:p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-page mb-4">MIT License</h2>
              <p className="text-sm text-page/70 mb-6">
                Copyright (c) {new Date().getFullYear()} WhiteScreen Tools
              </p>

              <p className="mb-4">
                Permission is hereby granted, free of charge, to any person obtaining
                a copy of this software and associated documentation files (the
                &quot;Software&quot;), to deal in the Software without restriction,
                including without limitation the rights to use, copy, modify, merge,
                publish, distribute, sublicense, and/or sell copies of the Software,
                and to permit persons to whom the Software is furnished to do so,
                subject to the following conditions:
              </p>

              <p className="mb-4">
                The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.
              </p>

              <p className="font-mono text-sm bg-page/10 p-4 rounded-lg border border-card">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
                KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
                AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
                DEALINGS IN THE SOFTWARE.
              </p>
            </section>

            <section className="bg-card border border-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-page mb-4">
                Third-party libraries
              </h2>
              <p className="mb-4">
                WhiteScreen Tools uses open-source libraries, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Next.js — MIT</li>
                <li>React — MIT</li>
                <li>Tailwind CSS — MIT</li>
                <li>Zustand — MIT</li>
                <li>colord — MIT</li>
                <li>Radix UI — MIT</li>
              </ul>
            </section>

            <section>
              <p className="text-page/80">
                Source available on{" "}
                <a
                  href="https://github.com/oobaretin/whitescreenpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--accent-color)] hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
