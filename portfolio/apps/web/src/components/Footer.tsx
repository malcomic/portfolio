import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaGlobe } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useProfile } from "../hooks/public";

const socialIcons: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  website: FaGlobe,
  other: FaGlobe,
};

export function Footer() {
  const { data: profile } = useProfile();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Portfolio" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-panel/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Malcom Rono Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile?.bio?.substring(0, 120) || "Building innovative web solutions with modern technologies and best practices."}
              {profile?.bio && profile.bio.length > 120 ? "..." : ""}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services/Resources */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-sm text-muted transition-colors hover:text-accent">
                  My Work
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted transition-colors hover:text-accent">
                  Blog Posts
                </Link>
              </li>
              <li>
                <a 
                  href="/Malcom-Rono-Resume.pdf" 
                  download 
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Download CV
                </a>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-muted transition-colors hover:text-accent">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text">Connect</h3>
            
            {/* Contact Info */}
            {profile?.contactEmail && (
              <div className="mb-4 flex items-start gap-2">
                <HiMail className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <a 
                  href={`mailto:${profile.contactEmail}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {profile.contactEmail}
                </a>
              </div>
            )}

            {/* Social Links */}
            {profile?.socialLinks && profile.socialLinks.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase text-muted">Follow Me</p>
                <div className="flex flex-wrap gap-3">
                  {(profile.socialLinks as any[]).map((link: any, index: number) => {
                    const Icon = socialIcons[link.platform.toLowerCase()] || FaGlobe;
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted transition-all hover:bg-accent hover:text-black"
                        title={link.label || link.platform}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
            <div>
              © {currentYear} <span className="font-semibold text-text">Malcom Rono</span>. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/privacy" className="transition-colors hover:text-accent">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-accent">
                Terms of Service
              </Link>
              <a 
                href="https://github.com/malcomic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black shadow-glow transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Back to top"
      >
        <svg 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </footer>
  );
}


