import { Link } from "react-router-dom";
import { Card } from "../components/Card";

export function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="text-sm text-accent hover:brightness-110">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-black">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {new Date().toLocaleDateString()}</p>

      <Card className="mt-8 p-8">
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Agreement to Terms</h2>
            <p>
              By accessing this portfolio website, you agree to be bound by these Terms of Service and
              all applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Use License</h2>
            <p>
              Permission is granted to temporarily view the materials on this website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Disclaimer</h2>
            <p>
              The materials on this website are provided on an 'as is' basis. I make no warranties,
              expressed or implied, and hereby disclaim and negate all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Limitations</h2>
            <p>
              In no event shall I or my suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising
              out of the use or inability to use the materials on this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Links</h2>
            <p>
              I have not reviewed all of the sites linked to this website and am not responsible for
              the contents of any such linked site. The inclusion of any link does not imply endorsement
              by me of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Modifications</h2>
            <p>
              I may revise these Terms of Service at any time without notice. By using this website you
              are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please{" "}
              <Link to="/contact" className="text-accent hover:brightness-110">
                contact me
              </Link>
              .
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}

