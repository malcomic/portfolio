import { Link } from "react-router-dom";
import { Card } from "../components/Card";

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="text-sm text-accent hover:brightness-110">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-black">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {new Date().toLocaleDateString()}</p>

      <Card className="mt-8 p-8">
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Introduction</h2>
            <p>
              Welcome to my portfolio website. This Privacy Policy explains how I collect, use, and protect
              your personal information when you visit this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Information Collection</h2>
            <p>
              This website may collect basic analytics data such as page views, browser type, and general
              location information to improve user experience. No personally identifiable information is
              collected without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Contact Forms</h2>
            <p>
              If you contact me through this website, your email address and message content will be used
              solely for the purpose of responding to your inquiry. This information will not be shared
              with third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Cookies</h2>
            <p>
              This website may use cookies to enhance your browsing experience. You can disable cookies
              in your browser settings if you prefer not to have them stored.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Third-Party Services</h2>
            <p>
              This website may use third-party services for analytics or hosting. These services have
              their own privacy policies which govern their use of your information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal
              information I hold about you. Please contact me if you wish to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-text">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please{" "}
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

