import { Link } from "react-router-dom";

export default function TermsConditions() {
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
              Terms and Conditions
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-5 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Janai Landscape Services website, you agree to be
                bound by these Terms and Conditions. If you do not agree, please do not use
                our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">2. Services</h2>
              <p>
                We provide landscaping, garden development, turf installation, nursery plant
                supply, irrigation, and related services in Pune, Maharashtra, India. All
                service descriptions, prices, and availability are subject to change without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">3. Quotations and Estimates</h2>
              <p>
                All quotations and estimates generated through our website are preliminary
                and non-binding. Final pricing is determined after a physical site inspection.
                Quotations are valid for 30 days from the date of issuance and are not tax
                invoices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">4. Nursery Catalog</h2>
              <p>
                Our plant catalog is inquiry-based. Listing a plant with a price does not
                constitute an offer to sell. Stock availability is subject to change. Contact
                us to confirm availability before visiting our nursery.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">5. Inquiry and Quote Requests</h2>
              <p>
                Submitting an inquiry or quote request does not create a binding contract. We
                will contact you to discuss your requirements and may issue a formal quotation
                following a site visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">6. User Accounts</h2>
              <p>
                If you register an account, you are responsible for maintaining the
                confidentiality of your credentials. Accounts are for individual use and
                cannot be transferred. We do not assign administrative roles through public
                registration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Janai Landscape Services is not liable
                for indirect, incidental, or consequential damages arising from your use of
                the website or reliance on estimates provided through it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">8. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject
                to the jurisdiction of courts in Pune, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-900 mb-2">9. Contact Us</h2>
              <p>
                For questions about these terms, contact us at:
              </p>
              <p className="text-sm text-gray-600">
                <strong>Janai Landscape Services</strong><br />
                Email: contact@janailandscape.com<br />
                Phone: +91 97676 71968
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
