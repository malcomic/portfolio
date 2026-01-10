import { Link, useParams } from "react-router-dom";
import { HiClock, HiCalendar } from "react-icons/hi";
import { Card } from "../components/Card";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { usePost } from "../hooks/public";
import { calculateReadingTime, formatReadingTime } from "../utils/readingTime";
import { SocialShare } from "../components/blog/SocialShare";

export function PostDetailPage() {
  const { slug = "" } = useParams();
  const q = usePost(slug);

  if (q.isLoading) return <LoadingState />;
  if (q.error) return <ErrorState error={q.error} />;
  if (!q.data) return <ErrorState error={new Error("Not found")} />;

  const p = q.data;
  const readingTime = p.body ? calculateReadingTime(p.body) : 1;
  const publishedDate = p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back Link */}
      <div className="mb-6 text-sm">
        <Link
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-accent transition-all hover:bg-white/5"
          to="/blog"
        >
          <span>←</span>
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-8">
        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
          {publishedDate ? (
            <div className="flex items-center gap-2 text-accent">
              <HiCalendar className="h-4 w-4" />
              <span className="font-medium">{publishedDate}</span>
            </div>
          ) : null}
          <div className="flex items-center gap-2 text-muted">
            <HiClock className="h-4 w-4" />
            <span>{formatReadingTime(readingTime)}</span>
          </div>
        </div>

        {/* Title & Excerpt */}
        <h1 className="text-4xl font-black leading-tight md:text-5xl">{p.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{p.excerpt}</p>

        {/* Social Share */}
        <div className="mt-6">
          <SocialShare title={p.title} />
        </div>
      </div>

      {/* Cover Image */}
      {p.coverImageUrl ? (
        <Card className="mb-8 overflow-hidden p-0">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={p.coverImageUrl}
              alt={p.title}
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/1200x514/0C1111/22C55E?text=${encodeURIComponent(p.title)}`;
              }}
            />
          </div>
        </Card>
      ) : null}

      {/* Content */}
      <Card className="p-8 md:p-12">
        <article className="prose prose-invert prose-lg max-w-none">
          {p.body ? (
            <div className="whitespace-pre-wrap leading-relaxed text-text/90">
              {p.body}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center">
              <p className="text-muted">
                📝 Content coming soon! This post is editable via the admin panel.
              </p>
            </div>
          )}
        </article>
      </Card>

      {/* Related/More Posts CTA */}
      <div className="mt-12 rounded-lg border border-white/10 bg-gradient-to-br from-accent/5 to-accent/10 p-8 text-center">
        <h3 className="text-xl font-bold">Want to read more?</h3>
        <p className="mt-2 text-muted">Check out more articles on development and design</p>
        <Link to="/blog">
          <button className="mt-4 rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-all hover:brightness-110">
            View All Posts
          </button>
        </Link>
      </div>
    </div>
  );
}


