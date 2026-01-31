import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer & Safety Warning - WhiteScreen Tools",
  description: "Disclaimer, safety warnings, and responsible use for WhiteScreen Tools.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-page text-page">
      <Navigation />
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-page/80 hover:text-page transition-colors mb-8"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Disclaimer & Safety Warning</h1>
          <p className="text-sm text-page/70 text-center mb-12">WhiteScreen Tools — Use at your own risk</p>

          <div className="space-y-10 text-page/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-page mb-3">1. Epilepsy & Photosensitivity Warning</h2>
              <p>
                Some tools on WhiteScreenTools.com, including the Dead Pixel Test and certain creative backgrounds,
                may involve flashing colors or rapid light changes. If you have a history of epilepsy or photosensitivity,
                please consult a medical professional before use. Discontinue use immediately if you experience dizziness,
                altered vision, or muscle twitches.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-3">2. Prank Tools & Responsible Use</h2>
              <p>
                Our &quot;Broken Screen,&quot; &quot;BSOD,&quot; and &quot;Fake Update&quot; tools are provided for entertainment
                purposes only. WhiteScreenTools.com is not responsible for any distress, property damage, or disciplinary
                actions resulting from the use of these pranks. Always use these tools responsibly and ensure the
                &quot;victim&quot; is aware it is a simulation in a timely manner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-3">3. Hardware Safety</h2>
              <p>
                While our tools are designed to assist with monitor testing and lighting, prolonged use of high-brightness
                solid colors (especially on OLED or Plasma displays) can contribute to screen burn-in. Users are encouraged
                to use the &quot;Pixel Shifter&quot; feature or limit continuous display time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-3">4. No Professional Liability</h2>
              <p>
                WhiteScreenTools.com provides these utilities &quot;as-is.&quot; We are not liable for any hardware failure,
                data loss, or professional errors occurring during the use of our digital signature or monitor testing tools.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-card text-center">
            <Link
              href="/terms"
              className="text-accent hover:underline"
              style={{ color: "var(--accent-color)" }}
            >
              Terms and Conditions
            </Link>
            <span className="mx-2 text-page/60">·</span>
            <Link
              href="/privacy"
              className="text-accent hover:underline"
              style={{ color: "var(--accent-color)" }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
