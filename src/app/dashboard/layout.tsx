"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between bg-gray-800 text-white p-4">
        <Button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          Menu
        </Button>
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <Button onClick={logout} className="hidden md:block">
          Logout
        </Button>
      </header>
      <div className="flex flex-1">
        <aside
          className={`bg-gray-100 w-64 p-4 space-y-2 transform top-0 left-0 md:relative fixed h-full md:h-auto md:translate-x-0 transition-transform ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <nav className="space-y-2">
            <Link
              href="/dashboard/analytics"
              className="block px-2 py-1 rounded hover:bg-gray-200"
            >
              Analytics
            </Link>
            <Link
              href="/dashboard/properties"
              className="block px-2 py-1 rounded hover:bg-gray-200"
            >
              Properties
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4">{token && children}</main>
      </div>
    </div>
  );
}
