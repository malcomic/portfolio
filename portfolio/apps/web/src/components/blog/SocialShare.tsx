import { HiShare } from "react-icons/hi";
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface SocialShareProps {
  title: string;
  url?: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#4267B2] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0077B5] hover:text-white",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366] hover:text-white",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted">
        <HiShare className="h-4 w-4" />
        <span>Share:</span>
      </div>
      <div className="flex gap-2">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted transition-all ${link.color}`}
              title={`Share on ${link.name}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

