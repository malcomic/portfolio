import { Link } from "react-router-dom";
import { Card } from "../Card";
import { HiClock, HiTrendingUp } from "react-icons/hi";

interface PopularPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  views?: number;
}

interface PopularPostsProps {
  posts: PopularPost[];
}

export function PopularPosts({ posts }: PopularPostsProps) {
  const topPosts = posts.slice(0, 5);

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <HiTrendingUp className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Popular Posts</h3>
      </div>
      <ul className="space-y-4">
        {topPosts.map((post, index) => (
          <li key={post.id}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex gap-3 transition-all"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-text transition-colors group-hover:text-accent">
                  {post.title}
                </h4>
                {post.publishedAt && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <HiClock className="h-3 w-3" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

