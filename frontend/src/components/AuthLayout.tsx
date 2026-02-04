import { type ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
