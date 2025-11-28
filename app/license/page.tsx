import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "License - WhiteScreen Pro",
  description: "License information for WhiteScreen Pro.",
};

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">License</h1>
        
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">MIT License</h2>
              <p className="text-sm text-gray-600 mb-6">Copyright (c) {new Date().getFullYear()} WhiteScreen Pro</p>
            
              <p className="mb-4 text-gray-700">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the &quot;Software&quot;), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>

              <p className="mb-4 text-gray-700">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>

              <p className="mb-4 text-gray-700 font-mono text-sm bg-white p-4 rounded border">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Third-Party Licenses</h2>
              <p className="text-lg text-gray-700 mb-4">
                WhiteScreen Pro uses the following open-source libraries, all of which are 
                licensed under permissive open-source licenses:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li><strong>Next.js</strong> - MIT License</li>
                <li><strong>React</strong> - MIT License</li>
                <li><strong>Tailwind CSS</strong> - MIT License</li>
                <li><strong>Zustand</strong> - MIT License</li>
                <li><strong>colord</strong> - MIT License</li>
                <li><strong>Radix UI</strong> - MIT License</li>
                <li><strong>Framer Motion</strong> - MIT License</li>
                <li><strong>Lucide React</strong> - ISC License</li>
              </ul>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">Open Source</h2>
              <p className="text-lg text-gray-700">
                WhiteScreen Pro is built with open-source technologies and is committed to 
                the open-source community. We believe in transparency, collaboration, and 
                the power of open-source software.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

