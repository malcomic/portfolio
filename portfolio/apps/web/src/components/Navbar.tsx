import { NavLink, Link } from "react-router-dom";
import { HiSun, HiMoon } from "react-icons/hi";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import { useTheme } from "../contexts/ThemeContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.webp"
            alt="Malcom Rono Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-1 text-sm font-semibold text-muted transition hover:text-text",
                  isActive && "text-text",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-3 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-accent transition-all",
                      isActive && "w-full",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-text"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>
          <Link to="/contact">
            <Button className="hidden sm:inline-flex">Contact Me</Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" className="px-3">
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}


