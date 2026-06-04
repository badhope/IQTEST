import type { NextConfig } from "next";

// `GITHUB_REPOSITORY` is the GitHub Actions env var of the form
// "owner/repo". On CI we want the site to live at "/<repo>/" so
// the deploy workflow can publish it under
// https://<owner>.github.io/<repo>/. Locally (or in any other
// environment without that var) we drop the prefix so the dev
// server and the static `out/` build can be served from the
// filesystem root — no manual path rewriting required.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
