import { createBrowserRouter } from "react-router-dom";
import { SiteLayout } from "../components/SiteLayout";
import { RequireAuth } from "../components/RequireAuth";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { ServicesPage } from "../pages/ServicesPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";
import { BlogPage } from "../pages/BlogPage";
import { PostDetailPage } from "../pages/PostDetailPage";
import { ContactPage } from "../pages/ContactPage";
import { AdminLandingPage } from "../pages/AdminLandingPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminProfilePage } from "../pages/admin/AdminProfilePage";
import { AdminServicesPage } from "../pages/admin/AdminServicesPage";
import { AdminProjectsPage } from "../pages/admin/AdminProjectsPage";
import { AdminPostsPage } from "../pages/admin/AdminPostsPage";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { TermsPage } from "../pages/TermsPage";

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:slug", element: <ProjectDetailPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:slug", element: <PostDetailPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/admin", element: <AdminLandingPage /> },
      { path: "/admin/login", element: <AdminLoginPage /> },
      {
        path: "/admin/dashboard",
        element: (
          <RequireAuth>
            <AdminDashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/profile",
        element: (
          <RequireAuth>
            <AdminProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/services",
        element: (
          <RequireAuth>
            <AdminServicesPage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <RequireAuth>
            <AdminProjectsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/posts",
        element: (
          <RequireAuth>
            <AdminPostsPage />
          </RequireAuth>
        ),
      },
      { path: "/privacy", element: <PrivacyPage /> },
      { path: "/terms", element: <TermsPage /> },
    ],
  },
]);


