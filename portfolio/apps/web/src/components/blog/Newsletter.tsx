import { useState, FormEvent } from "react";
import { Card } from "../Card";
import { HiMail } from "react-icons/hi";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <div className="mb-3 flex items-center gap-2">
        <HiMail className="h-5 w-5 text-accent" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Newsletter</h3>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        Subscribe to get the latest posts delivered right to your inbox. No spam, unsubscribe anytime.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text placeholder-muted outline-none transition-all focus:border-accent/50 focus:bg-white/10 disabled:opacity-50"
        />
        
        {status === "success" && (
          <div className="rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">
            ✓ Successfully subscribed!
          </div>
        )}
        
        {status === "error" && (
          <div className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            Something went wrong. Please try again.
          </div>
        )}
        
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      
      <p className="mt-3 text-xs text-muted">
        By subscribing, you agree to receive email updates.
      </p>
    </Card>
  );
}

