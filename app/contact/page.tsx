import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us - WhiteScreen Pro",
  description: "Get in touch with the WhiteScreen Pro team.",
};

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p className="text-xl text-gray-800 text-center mb-8">
              Have a question, suggestion, or found a bug? We&apos;d love to hear from you!
            </p>

            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-6">
                For inquiries, feature requests, or support, please reach out through one of 
                the following channels:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-1">Email</h3>
                  <a href="mailto:contact@whitescreenpro.com" className="text-blue-600 hover:text-blue-800">
                    contact@whitescreenpro.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">GitHub</h3>
                  <a href="https://github.com/whitescreenpro" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    github.com/whitescreenpro
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Report Issues</h2>
              <p className="text-lg text-gray-700">
                Found a bug or have a feature request? Please open an issue on our GitHub 
                repository with as much detail as possible. Include steps to reproduce, 
                expected behavior, and actual behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Feedback & Suggestions</h2>
              <p className="text-lg text-gray-700">
                Your feedback helps us improve WhiteScreen Pro. We appreciate all suggestions 
                and use them to prioritize new features and improvements. Whether it&apos;s a 
                new tool idea, UI improvement, or bug report, we want to hear from you.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">Response Time</h2>
              <p className="text-gray-700">
                We typically respond to inquiries within 24-48 hours. For urgent issues, 
                please use GitHub Issues for faster response times.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

