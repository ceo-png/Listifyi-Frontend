"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Property = {
  id: number;
  name: string;
  status: "pending" | "accepted" | "rejected";
};

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, name: "Seaside Villa", status: "pending" },
    { id: 2, name: "Mountain Cabin", status: "pending" },
  ]);

  const handleAction = (
    id: number,
    status: "accepted" | "rejected"
  ) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Property Listings</h2>
      <ul className="space-y-4">
        {properties.map((property) => (
          <li
            key={property.id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <span className="font-medium">{property.name}</span>
            {property.status === "pending" ? (
              <div className="space-x-2">
                <Button
                  className="bg-green-600 hover:bg-green-500"
                  onClick={() => handleAction(property.id, "accepted")}
                >
                  Accept
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-500"
                  onClick={() => handleAction(property.id, "rejected")}
                >
                  Reject
                </Button>
              </div>
            ) : (
              <span className="text-sm text-gray-600 capitalize">
                {property.status}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

