import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - WhiteScreen Pro",
  description: "Privacy Policy for WhiteScreen Pro.",
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-sm text-gray-500 text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-3xl font-semibold text-black mb-4">Our Commitment to Privacy</h2>
              <p className="text-lg text-gray-700">
                WhiteScreen Pro is committed to protecting your privacy. This application 
                operates entirely in your browser and does not collect, store, or transmit 
                any personal information to our servers. Your privacy is our top priority.
              </p>
            </section>

            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">Data Collection</h2>
              <p className="text-lg text-gray-700 mb-4">
                <strong>We do not collect any data.</strong> WhiteScreen Pro:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Does not track your usage</li>
                <li>Does not collect personal information</li>
                <li>Does not use cookies for tracking</li>
                <li>Does not send data to third-party services</li>
                <li>Does not use analytics or advertising</li>
                <li>Stores all preferences locally in your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Local Storage</h2>
              <p className="text-lg text-gray-700">
                WhiteScreen Pro uses your browser&apos;s local storage to save your preferences 
                (colors, settings, favorites) for convenience. This data never leaves your device 
                and can be cleared at any time through your browser settings. You have complete 
                control over your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Third-Party Services</h2>
              <p className="text-lg text-gray-700">
                We do not use any third-party analytics, advertising, or tracking services. 
                The application is completely self-contained and operates independently. No 
                external scripts or services are loaded that could compromise your privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Browser Information</h2>
              <p className="text-lg text-gray-700">
                When you visit WhiteScreen Pro, your browser may automatically send certain 
                information (such as IP address, browser type, and device information) to our 
                hosting provider. This is standard web server logging and is not used for 
                tracking or identification purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Changes to This Policy</h2>
              <p className="text-lg text-gray-700">
                We may update this Privacy Policy from time to time. Any changes will be 
                posted on this page with an updated revision date. We encourage you to review 
                this policy periodically to stay informed about how we protect your privacy.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">Contact</h2>
              <p className="text-lg text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:contact@whitescreenpro.com" className="text-blue-600 hover:text-blue-800">
                  contact@whitescreenpro.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

