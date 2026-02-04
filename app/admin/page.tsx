"use client";

import dynamic from "next/dynamic";

const TinaCMS = dynamic(() => import("tinacms").then((mod) => mod.TinaCMS), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <TinaCMS>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Tina CMS</h1>
          <p>Loading admin interface...</p>
          <p>Please visit: <a href="/admin/index.html">/admin/index.html</a></p>
        </div>
      </TinaCMS>
    </div>
  );
}
