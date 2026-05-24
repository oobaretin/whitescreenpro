import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us - WhiteScreen Tools",
  description: "Learn about WhiteScreen Tools, the ultimate screen utility tool.",
};

export default function AboutPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About WhiteScreen Tools</h1>
          
          <div className="space-y-8 text-page/90 leading-relaxed">
            <section className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-800 mb-6">
                WhiteScreen Tools is a comprehensive, feature-rich screen utility web application 
                designed for professionals, creators, and everyday users. We provide the most 
                complete collection of screen tools available—all free, accessible, and privacy-focused.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-black mb-4">Our Mission</h2>
              <p className="text-lg text-page/90">
                We aim to provide the most complete screen utility tool available, combining 
                professional features for photography, videography, and design with fun prank 
                tools and ambient screensavers—all in one free, accessible platform. No downloads, 
                no registration, no ads.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-black mb-4">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Professional Tools</h3>
                  <ul className="list-disc list-inside space-y-2 text-page/90">
                    <li>Zoom Lighting for video calls</li>
                    <li>Digital signature capture</li>
                    <li>Tip calculator for POS systems</li>
                    <li>Dead pixel test for monitors</li>
                    <li>Color calibration tools</li>
                    <li>Pattern overlays for alignment</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Fun Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-page/90">
                    <li>Broken screen prank</li>
                    <li>Blue screen of death (BSOD)</li>
                    <li>Fake system updates</li>
                    <li>Hacker terminal effects</li>
                    <li>DVD screensaver</li>
                    <li>Matrix rain effect</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-black mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-3 text-page/90">
                <li><strong>15+ Professional Tools</strong> - Zoom lighting, signature capture, tip calculator, dead pixel test, and more</li>
                <li><strong>10+ Fun Pranks</strong> - Broken screen, BSOD, fake updates, hacker terminal</li>
                <li><strong>5+ Ambient Modes</strong> - DVD screensaver, Matrix rain, flip clock, white noise</li>
                <li><strong>Full Color Customization</strong> - Custom colors, gradients, temperature control, brightness adjustment</li>
                <li><strong>Export Options</strong> - Download screens at various resolutions (480p to 8K)</li>
                <li><strong>100% Free</strong> - No ads, no tracking, no registration required</li>
                <li><strong>Privacy First</strong> - Everything runs in your browser, no data sent to servers</li>
                <li><strong>Mobile Friendly</strong> - Works perfectly on phones, tablets, and desktop computers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-black mb-4">Who Uses WhiteScreen Tools?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">📸 Photographers</h3>
                  <p className="text-page/90">
                    Use white screens for fill lighting, color calibration, and product photography backgrounds.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">🎥 Videographers</h3>
                  <p className="text-page/90">
                    Green and blue screens for chroma key effects, zoom lighting for video calls.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">🎨 Designers</h3>
                  <p className="text-page/90">
                    Color testing, monitor calibration, and neutral backgrounds for design work.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">👨‍💻 Developers</h3>
                  <p className="text-page/90">
                    Screen testing, dead pixel detection, and display calibration.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">🎓 Educators</h3>
                  <p className="text-page/90">
                    Presentations, focus tools, and distraction-free backgrounds.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">🎭 Content Creators</h3>
                  <p className="text-page/90">
                    Prank tools, screensavers, and creative effects for videos and streams.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card border border-card p-6 rounded-lg">
              <h2 className="text-3xl font-semibold text-black mb-4">Privacy & Transparency</h2>
              <p className="text-page/90 mb-4">
                WhiteScreen Tools is built with privacy in mind. Everything runs entirely in your browser—no 
                data is collected, stored, or transmitted to our servers. All your preferences and settings 
                are saved locally on your device.
              </p>
              <p className="text-page/90">
                We believe in transparency and user control. You can use WhiteScreen Tools with complete 
                confidence that your privacy is protected.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

