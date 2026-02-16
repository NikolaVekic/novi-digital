import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Me } from "../hooks/useAuth";

export default function Home({ user }: { user: Me | null }) {
  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/register", { replace: true });
  }, [user, nav]);

  if (!user) return null;

  return (
    <div className="grid min-h-[calc(100vh-160px)] place-items-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}
