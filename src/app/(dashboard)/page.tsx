"use client";

import { useAuth } from "@/context/auth-context";

export default function AnalyticsPage() {
  const { token } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <p className="text-gray-600">Analytics overview will appear here.</p>
      {token && (
        <p className="text-xs text-gray-400 mt-2">Session: {token}</p>
      )}
    </div>
  );
}
