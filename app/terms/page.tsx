import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions - WhiteScreen Pro",
  description: "Terms and Conditions for WhiteScreen Pro.",
};

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Terms and Conditions</h1>
          <p className="text-sm text-gray-500 text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-3xl font-semibold text-black mb-4">Acceptance of Terms</h2>
              <p className="text-lg text-gray-700">
                By accessing and using WhiteScreen Pro, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by 
                the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Use License</h2>
              <p className="text-lg text-gray-700 mb-4">
                Permission is granted to use WhiteScreen Pro for personal and commercial purposes. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Modify or copy the materials without permission</li>
                <li>Use the materials for any illegal or unauthorized purpose</li>
                <li>Attempt to reverse engineer any software contained in WhiteScreen Pro</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              </ul>
            </section>

            <section className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">Disclaimer</h2>
              <p className="text-lg text-gray-700">
                The materials on WhiteScreen Pro are provided on an &apos;as is&apos; basis. WhiteScreen Pro 
                makes no warranties, expressed or implied, and hereby disclaims and negates all 
                other warranties including, without limitation, implied warranties or conditions of 
                merchantability, fitness for a particular purpose, or non-infringement of 
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Limitations</h2>
              <p className="text-lg text-gray-700">
                In no event shall WhiteScreen Pro or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on WhiteScreen Pro, even if WhiteScreen Pro or a WhiteScreen Pro authorized 
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Accuracy of Materials</h2>
              <p className="text-lg text-gray-700">
                The materials appearing on WhiteScreen Pro could include technical, typographical, 
                or photographic errors. WhiteScreen Pro does not warrant that any of the materials 
                on its website are accurate, complete, or current. WhiteScreen Pro may make changes 
                to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Links</h2>
              <p className="text-lg text-gray-700">
                WhiteScreen Pro has not reviewed all of the sites linked to its website and is 
                not responsible for the contents of any such linked site. The inclusion of any 
                link does not imply endorsement by WhiteScreen Pro of the site. Use of any such 
                linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Modifications</h2>
              <p className="text-lg text-gray-700">
                WhiteScreen Pro may revise these terms of service at any time without notice. 
                By using this website you are agreeing to be bound by the then current version 
                of these terms of service. We recommend reviewing this page periodically for 
                any updates.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">Governing Law</h2>
              <p className="text-lg text-gray-700">
                These terms and conditions are governed by and construed in accordance with applicable 
                laws. Any disputes relating to these terms and conditions will be subject to the 
                exclusive jurisdiction of the courts in the jurisdiction where WhiteScreen Pro operates.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

