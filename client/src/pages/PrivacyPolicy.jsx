import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fcfdfa] text-gray-800 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <nav className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
          <Link to="/" className="hover:text-green-700 transition">← Home</Link>
        </nav>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-green-950 mt-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-5 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">1. Introduction</h2>
              <p>
                Janai Landscape Services ("we," "us," "our") operates a website at
                janailandscape.com serving customers in Pune, Maharashtra, India. This Privacy
                Policy explains what information we collect, how we use it, and your rights
                regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">2. Information We Collect</h2>
              <p>We collect personal information you voluntarily provide, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
                <li>Name, phone number, and email address (via quote request, contact form, site visit booking)</li>
                <li>Property details (location, area, property type, budget range)</li>
                <li>Service preferences and project requirements</li>
                <li>Account credentials (email, hashed password) if you register</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">3. How We Use Your Information</h2>
              <p>We use your data to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
                <li>Respond to quote requests, inquiries, and site visit bookings</li>
                <li>Generate and deliver quotations</li>
                <li>Send service-related notifications (only with your consent)</li>
                <li>Manage your account if you register</li>
                <li>Improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">4. WhatsApp Communications</h2>
              <p>
                If you initiate contact via WhatsApp using our published number, your messages
                are handled through WhatsApp's platform. We do not store WhatsApp message
                content beyond what is needed to respond to your inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">5. Data Sharing</h2>
              <p>We do not sell or rent your personal information. We may share data only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
                <li>Service providers assisting with website hosting or email delivery</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">6. Data Retention</h2>
              <p>
                Inquiry records are retained for business operations and follow-up. You may
                request deletion of your personal data by contacting us at the email below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">7. Your Rights</h2>
              <p>You may:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-600">
                <li>Request access to your personal data</li>
                <li>Request correction or deletion of your data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Lodge a complaint with the appropriate data protection authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">8. Contact Us</h2>
              <p>
                For privacy-related questions or requests, contact us at:
              </p>
              <p className="text-sm text-gray-600">
                <strong>Janai Landscape Services</strong><br />
                Email: contact@janailandscape.com<br />
                Phone: +91 97676 71968<br />
                Address: Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
