// @ts-check
import { defineConfig } from "astro/config";

// Static output: every page is plain HTML in dist/, deployable to any host or subdomain root.
// SITE_URL / BASE_PATH let the same build run at a domain root or a sub-path (e.g. GitHub Pages).
const base = (process.env.BASE_PATH ?? "").replace(/\/$/, "");
const to = (path) => `${base}${path}`;

export default defineConfig({
  site: process.env.SITE_URL ?? "https://mahabbati.com",
  base: process.env.BASE_PATH ?? "/",
  trailingSlash: "always",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  // Old URLs from the first version of the microsite keep working.
  redirects: {
    "/taaruf": to("/aplikasi/"),
    "/wedding-organizer": to("/layanan/"),
    "/wedding-organizer/wedding-planner": to("/layanan/wedding-planner/"),
    "/wedding-organizer/intimate-wedding": to("/layanan/intimate-wedding/"),
    "/wedding-organizer/full-package": to("/layanan/full-package/"),
  },
  image: {
    responsiveStyles: false,
  },
});
