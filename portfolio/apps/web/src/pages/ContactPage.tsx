import { useState, type FormEvent } from "react";
import { HiMail, HiUser, HiPencil } from "react-icons/hi";
import toast from "react-hot-toast";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useProfile } from "../hooks/public";

export function ContactPage() {
  const q = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (q.isLoading) return <LoadingState />;
  if (q.error) return <ErrorState error={q.error} />;

  const contactEmail = q.data?.contactEmail ?? "malcom@example.com";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission - in production, this would call an API
    setTimeout(() => {
      toast.success("Message sent! I'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <div>
        <h1 className="text-3xl font-black">Contact</h1>
        <p className="mt-2 text-muted">Let's build something great together.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
              <HiUser className="h-4 w-4" />
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
              <HiMail className="h-4 w-4" />
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
              <HiPencil className="h-4 w-4" />
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows={6}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Card>

      <Card>
        <div className="text-sm text-muted">Or email me directly at</div>
        <a className="mt-1 inline-block text-lg font-bold text-accent hover:brightness-110" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </Card>
    </div>
  );
}


