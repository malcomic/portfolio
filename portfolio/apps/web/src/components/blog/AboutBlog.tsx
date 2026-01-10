import { Card } from "../Card";

export function AboutBlog() {
  return (
    <Card>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">About This Blog</h3>
      <p className="text-sm leading-relaxed text-muted">
        Welcome to my blog! Here I share insights about web development, cybersecurity, 
        best practices, and lessons learned from building modern applications.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Whether you're a beginner or experienced developer, you'll find practical 
        tips and in-depth tutorials to level up your skills.
      </p>
    </Card>
  );
}

