import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiClock } from "react-icons/hi";
import { motion } from "framer-motion";
import { Card } from "../components/Card";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { StaggerChildren, staggerItem } from "../components/AnimatedSection";
import { usePosts } from "../hooks/public";
import { calculateReadingTime, formatReadingTime } from "../utils/readingTime";
import { SearchBar } from "../components/blog/SearchBar";
import { AboutBlog } from "../components/blog/AboutBlog";
import { Categories } from "../components/blog/Categories";
import { PopularPosts } from "../components/blog/PopularPosts";
import { Tags } from "../components/blog/Tags";
import { Newsletter } from "../components/blog/Newsletter";
import { Archive } from "../components/blog/Archive";

export function BlogPage() {
  const q = usePosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedTag, setSelectedTag] = useState<string>();

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    let posts = q.data ?? [];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      );
    }

    // Category filter (basic implementation - match against title/excerpt)
    if (selectedCategory) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTag) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }

    return posts;
  }, [q.data, searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black">Blog</h1>
          <p className="mt-2 text-lg text-muted">
            Notes on development, design, and building products.
          </p>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory || selectedTag) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Active filters:</span>
            {searchQuery && (
              <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:text-accent"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className="ml-1 hover:text-accent"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {selectedTag}
                <button
                  onClick={() => setSelectedTag(undefined)}
                  className="ml-1 hover:text-accent"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(undefined);
                setSelectedTag(undefined);
              }}
              className="text-xs text-muted hover:text-accent"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {q.isLoading ? <LoadingState /> : null}
        {q.error ? <ErrorState error={q.error} /> : null}

        {filteredPosts.length === 0 && !q.isLoading && !q.error && (
          <Card className="p-8 text-center">
            <p className="text-muted">No posts found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(undefined);
                setSelectedTag(undefined);
              }}
              className="mt-4 text-sm font-semibold text-accent hover:brightness-110"
            >
              Clear filters
            </button>
          </Card>
        )}

        <StaggerChildren className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((p) => {
          const publishedDate = p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }) : 'Draft';
          const readingTime = calculateReadingTime(p.body || p.excerpt);
          
          return (
            <motion.div key={p.id} variants={staggerItem}>
              <Link to={`/blog/${p.slug}`}>
                <Card className="group h-full overflow-hidden p-0 transition-all duration-300 hover:shadow-glow">
                  {/* Blog Post Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                    {p.coverImageUrl ? (
                      <img 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={p.coverImageUrl} 
                        alt={p.title}
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/800x500/0C1111/22C55E?text=${encodeURIComponent(p.title.substring(0, 30))}`;
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10 p-6">
                        <div className="text-center">
                          <div className="text-5xl font-black text-accent/20">📝</div>
                          <div className="mt-2 text-xs text-muted">Blog Post</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Reading Time Badge */}
                    <div className="absolute bottom-3 right-3 rounded-full bg-bg/90 px-3 py-1 backdrop-blur-sm">
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <HiClock className="h-3 w-3" />
                        <span>{formatReadingTime(readingTime)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Blog Post Content */}
                  <div className="p-5">
                    {/* Date */}
                    <div className="mb-2 text-xs font-semibold text-accent">
                      {publishedDate}
                    </div>
                    
                    {/* Title */}
                    <h3 className="line-clamp-2 text-base font-bold leading-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {p.excerpt}
                    </p>
                    
                    {/* Read More Link */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">
                      <span>Read More</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </StaggerChildren>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        {/* Search */}
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search articles..."
        />

        {/* About Blog */}
        <AboutBlog />

        {/* Categories */}
        <Categories
          onSelectCategory={(category) => {
            setSelectedCategory(category === selectedCategory ? undefined : category);
            setSelectedTag(undefined);
          }}
          activeCategory={selectedCategory}
        />

        {/* Popular Posts */}
        {q.data && q.data.length > 0 && (
          <PopularPosts posts={q.data.filter(p => p.publishedAt !== undefined) as any} />
        )}

        {/* Tags */}
        <Tags
          onSelectTag={(tag) => {
            setSelectedTag(tag === selectedTag ? undefined : tag);
            setSelectedCategory(undefined);
          }}
          activeTag={selectedTag}
        />

        {/* Archive */}
        {q.data && q.data.length > 0 && (
          <Archive
            posts={q.data.filter(p => p.publishedAt !== undefined) as any}
            onSelectMonth={(month) => {
              // Simple implementation - you could enhance this
              console.log("Filter by month:", month);
            }}
          />
        )}

        {/* Newsletter */}
        <Newsletter />
      </aside>
    </div>
  );
}


