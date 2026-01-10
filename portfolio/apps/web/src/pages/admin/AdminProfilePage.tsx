import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { useAdminProfile, useUpdateProfile } from "../../hooks/admin";

export function AdminProfilePage() {
  const profileQ = useAdminProfile();
  const update = useUpdateProfile();

  const [heroHello, setHeroHello] = useState("");
  const [heroName, setHeroName] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroTagline, setHeroTagline] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    if (profileQ.data) {
      setHeroHello(profileQ.data.heroHello ?? "");
      setHeroName(profileQ.data.heroName ?? "");
      setHeroTitle(profileQ.data.heroTitle ?? "");
      setHeroTagline(profileQ.data.heroTagline ?? "");
      setBio(profileQ.data.bio ?? "");
      setAvatarUrl(profileQ.data.avatarUrl ?? "");
      setContactEmail(profileQ.data.contactEmail ?? "");
    }
  }, [profileQ.data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await update.mutateAsync({
      heroHello,
      heroName,
      heroTitle,
      heroTagline,
      bio,
      avatarUrl: avatarUrl || null,
      contactEmail: contactEmail || null,
      socialLinks: profileQ.data?.socialLinks ?? [],
      aboutSkills: profileQ.data?.aboutSkills ?? [],
      aboutEducation: profileQ.data?.aboutEducation ?? [],
      aboutExperience: profileQ.data?.aboutExperience ?? [],
    });
  };

  if (profileQ.isLoading) return <LoadingState />;
  if (profileQ.error) return <ErrorState error={profileQ.error} />;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Edit Profile</h1>
          <p className="mt-2 text-muted">Update hero content and bio</p>
        </div>
        <Link to="/admin/dashboard">
          <Button variant="ghost">← Dashboard</Button>
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold">Hero Hello</label>
            <input
              type="text"
              required
              value={heroHello}
              onChange={(e) => setHeroHello(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="Hello, I'm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Hero Name</label>
            <input
              type="text"
              required
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Hero Title</label>
            <input
              type="text"
              required
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="Professional Web Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Hero Tagline</label>
            <textarea
              required
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="A short tagline about what you do"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Bio (About page)</label>
            <textarea
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="Tell visitors about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Avatar URL (optional)</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="https://example.com/avatar.jpg"
            />
            <p className="mt-1 text-xs text-muted">Direct link to an image for the hero section</p>
          </div>

          <div>
            <label className="block text-sm font-semibold">Contact Email (optional)</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="contact@example.com"
            />
          </div>

          {update.error ? (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
              {update.error.message}
            </div>
          ) : null}

          {update.isSuccess ? (
            <div className="rounded-md bg-accent/10 border border-accent/20 px-3 py-2 text-sm text-accent">
              Profile updated successfully!
            </div>
          ) : null}

          <Button type="submit" disabled={update.isPending}>
            {update.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs text-muted">
            Note: Social links, skills, education, and experience can be edited via JSON in a future update,
            or you can modify them directly in the database.
          </p>
        </div>
      </Card>
    </div>
  );
}

