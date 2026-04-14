"use client";

import { useState } from "react";
import { ProcessUpdate } from "@/actions/ProcessUpdate";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handelClick = async () => {
    setLoading(true);

    await ProcessUpdate();

    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <button
        onClick={handelClick}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        {loading ? "Loading..." : "Click me"}
      </button>
    </div>
  );
}
