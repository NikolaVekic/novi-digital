import type { ReactNode } from "react";

export default function CardShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <div className="rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-soft backdrop-blur">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
