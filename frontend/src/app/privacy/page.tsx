import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-8">
        <div className="border-b border-gray-100 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#79716B]">
            Legal Document
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#121212] sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#79716B]">
            Last updated: July 8, 2026
          </p>
        </div>

        <div className="prose prose-neutral mt-10 max-w-none text-[15px] leading-relaxed text-gray-700 space-y-8">
          <p>
            At SubCaps, we take your privacy seriously. This Privacy Policy describes how SubCaps Inc. (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, stores, shares, and protects your information when you use our website and video captioning services.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#121212] md:text-2xl">
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide, maintain, and improve our subtitle generation services:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Account Information:</strong> When you sign up, we collect your name, email address, password, and billing information (processed securely through Stripe).
              </li>
              <li>
                <strong>Video Content:</strong> We temporarily upload and store the video files you submit to transcribe speech, align subtitles, and render final outputs.
              </li>
              <li>
                <strong>Usage Information:</strong> We collect technical log data including IP addresses, browser types, referral pages, and device specifications to diagnose errors and improve app performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#121212] md:text-2xl">
              2. How We Use Your Information
            </h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To transcribe, burn subtitles, and deliver your finished video exports.</li>
              <li>To process payments and manage billing subscriptions.</li>
              <li>To send you important system updates, security alerts, and customer support messages.</li>
              <li>To analyze usage metrics and optimize our transcription speed and styling features.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#121212] md:text-2xl">
              3. Data Storage &amp; Video Retention
            </h2>
            <p>
              We prioritize data safety and employ industry-standard encryption protocols.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Video Files:</strong> To protect your privacy and reduce storage costs, uploaded video files and generated subtitle scripts are kept for a maximum of 30 days on our servers. You can manually delete any video from your library at any time to remove it immediately.
              </li>
              <li>
                <strong>Account Data:</strong> Your account profile, email, settings, and subscription state are kept securely as long as your account is active.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#121212] md:text-2xl">
              4. Cookies &amp; Tracking Technology
            </h2>
            <p>
              We use essential cookies to keep you logged into your account and secure your session. We also use third-party analytics (like Google Analytics) to gather aggregated, anonymized trends on website traffic. You can disable cookies in your browser settings, though some security and login features may not function properly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#121212] md:text-2xl">
              5. Data Sharing &amp; Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal information or video content to third parties. We share data only with trusted service providers critical to our operations:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Payment Processing:</strong> Billing is securely managed by Stripe; we never store your raw credit card numbers.
              </li>
              <li>
                <strong>Transcription Services:</strong> Audio chunks are processed through secure, automated machine-learning engines. Your content is never used to train public models.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#121212] md:text-2xl">
              6. Your Rights (GDPR &amp; CCPA)
            </h2>
            <p>
              Depending on your location, you may have the following data rights:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>The right to access and copy the personal data we hold.</li>
              <li>The right to request correction of inaccurate data.</li>
              <li>The right to request the complete deletion of your account and files (&quot;Right to be Forgotten&quot;).</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please email us at the contact address listed below.
            </p>
          </section>

          <section className="space-y-3 border-t border-gray-100 pt-6">
            <h2 className="text-lg font-bold text-[#121212]">
              Contact Us
            </h2>
            <p className="text-sm">
              If you have any questions about this Privacy Policy or our data storage practices, please email us at{" "}
              <a href="mailto:privacy@subcaps.com" className="font-semibold text-[#121212] underline hover:text-[#79716B]">
                privacy@subcaps.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
