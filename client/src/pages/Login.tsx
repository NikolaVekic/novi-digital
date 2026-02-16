import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardShell from "../components/CardShell";
import { api } from "../api/http";

type Props = { onAuthed: () => Promise<void> };

export default function Login({ onAuthed }: Props) {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setError("Email is not valid");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      setLoading(true);
      await api("/auth/login", { method: "POST", body: JSON.stringify(form) });
      await onAuthed();
      nav("/home");
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const input =
    "rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 outline-none focus:ring-4 focus:ring-neutral-200";

  return (
    <CardShell title="Welcome back">
      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          className={input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <input
          className={input}
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />

        <button
          disabled={loading}
          className="mt-2 rounded-2xl cursor-pointer bg-neutral-900 px-4 py-3 text-white shadow-sm hover:bg-neutral-800 disabled:opacity-60"
          type="submit"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-sm text-neutral-600">
          No account yet?{" "}
          <button
            type="button"
            className="underline cursor-pointer"
            onClick={() => nav("/register")}
          >
            Register
          </button>
        </p>
      </form>
    </CardShell>
  );
}
