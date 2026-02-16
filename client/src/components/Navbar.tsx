import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Me } from "../hooks/useAuth";

type Props = {
  user: Me | null;
  onLogout: () => Promise<void>;
};

export default function Navbar({ user, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  async function handleLogout() {
    await onLogout();
    setOpen(false);
    nav("/register", { replace: true });
  }

  const links = user
    ? [{ to: "/home", label: "Home" }]
    : [
        { to: "/home", label: "Home" },
        { to: "/register", label: "Register" },
        { to: "/login", label: "Login" },
      ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/home" className="font-semibold tracking-tight">
          Novi Digital
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-neutral-700 hover:text-neutral-950"
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm shadow-sm hover:bg-neutral-50"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-sm"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <div className="h-0.5 w-5 bg-neutral-900" />
            <div className="h-0.5 w-5 bg-neutral-900" />
            <div className="h-0.5 w-5 bg-neutral-900" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-neutral-700 hover:text-neutral-950"
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="w-fit rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm shadow-sm hover:bg-neutral-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
