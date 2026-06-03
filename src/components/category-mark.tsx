/**
 * Editorial line-art category marks.
 *
 * Every category and group on the site gets a hand-drawn line icon
 * instead of an emoji. The icons are intentionally:
 *
 *   - 24×24 viewBox
 *   - 1.5px stroke, no fill
 *   - currentColor, square caps & joins
 *   - geometric, not playful — the same vocabulary you would find
 *     in a 19th-century engraved field guide
 *
 * Mapping is by slug (or group id) so we can have two different
 * marks for icons that share the same underlying emoji (🖥️ is used
 * for both `gui` and `server_mgmt`, 📊 for `network_test` and
 * `monitoring`). The data file stays untouched.
 */

import * as React from "react";

type MarkProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
};

function base({
  size = 20,
  className,
  strokeWidth = 1.5,
  title,
  children,
}: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

// ---------- 21 category marks (one per slug) ----------

type MarkComponent = (p: MarkProps) => React.JSX.Element;

const MARKS: Record<string, MarkComponent> = {
  // Proxy Cores — gear with centre axis
  core: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
        </>
      ),
    }),
  // GUI Clients — monitor with stand
  gui: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="3" y="4" width="18" height="13" />
          <path d="M8 21h8M12 17v4" />
          <path d="M7 8h10M7 11h6" />
        </>
      ),
    }),
  // Subscription Management — clipboard with lines
  subscription: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="5" y="4" width="14" height="17" />
          <rect x="8" y="2" width="8" height="3" />
          <path d="M8 10h8M8 13h8M8 16h5" />
        </>
      ),
    }),
  // GitHub Acceleration — arc + arrowhead
  github_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M4 19c2-1 4-2 6-2s4 1 6 2" />
          <path d="M5 15c1.5-1 3-1.5 4.5-1.5S14 14 15.5 15" />
          <path d="M12 4l4 4-4 4M16 8H8" />
        </>
      ),
    }),
  // Router Plugins — globe with two meridians
  router: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="9" ry="4" />
          <path d="M12 3v18" />
        </>
      ),
    }),
  // Docker — stacked containers
  docker: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="3" y="11" width="18" height="8" />
          <path d="M3 14h18" />
          <path d="M6 8h2v2H6zM9 8h2v2H9zM12 8h2v2h-2zM6 5h2v2H6zM9 5h2v2H9z" />
        </>
      ),
    }),
  // Rule Collections — scroll
  rules: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M19 18H8M8 7h7M8 11h7" />
        </>
      ),
    }),
  // Utilities — wrench
  utilities: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M14 4a5 5 0 0 0-4.6 7L3 17.4 6.6 21l6.4-6.4A5 5 0 0 0 20 10l-3 3-3-1-1-3 3-3a5 5 0 0 0-2-2z" />
        </>
      ),
    }),
  // Mirror Acceleration — paired opposing arrows
  mirrors: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M3 8h14l-3-3M21 16H7l3 3" />
        </>
      ),
    }),
  // Network Testing — bar chart
  network_test: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M3 21h18" />
          <rect x="4" y="13" width="3" height="6" />
          <rect x="9" y="9" width="3" height="10" />
          <rect x="14" y="5" width="3" height="14" />
        </>
      ),
    }),
  // Node Tools — map pin in a circle
  node_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="10" r="6" />
          <path d="M12 16l-4 6h8z" />
          <circle cx="12" cy="10" r="2" />
        </>
      ),
    }),
  // Protocol Tools — padlock
  protocol_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="5" y="11" width="14" height="10" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="16" r="1" />
        </>
      ),
    }),
  // Server Management — rack with slots
  server_mgmt: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="3" y="4" width="18" height="5" />
          <rect x="3" y="11" width="18" height="5" />
          <rect x="3" y="18" width="18" height="3" />
          <circle cx="6" cy="6.5" r="0.5" />
          <circle cx="6" cy="13.5" r="0.5" />
        </>
      ),
    }),
  // Security Tools — shield
  security_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </>
      ),
    }),
  // Data Transfer — outbox tray with up arrow
  data_transfer: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M12 4v10M8 8l4-4 4 4" />
          <path d="M3 14h5l1 3h6l1-3h5v6H3z" />
        </>
      ),
    }),
  // Monitoring — pulse / line graph
  monitoring: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M3 20h18" />
          <path d="M3 12h4l2-5 3 10 3-7 2 4 3-2h3" />
        </>
      ),
    }),
  // Container Orchestration — helm wheel
  container: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 9V3M12 15v6M9 12H3M15 12h6M10 10l-3-5M14 14l3 5M14 10l3-5M10 14l-3 5" />
        </>
      ),
    }),
  // Tunnel Tools — portal
  tunnel_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
        </>
      ),
    }),
  // DNS Tools — globe with grid
  dns_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </>
      ),
    }),
  // Certificate Tools — key
  cert_tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="8" cy="12" r="4" />
          <path d="M12 12h9M17 12v4M21 12v3" />
        </>
      ),
    }),
  // Project Collections — folder
  collection: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </>
      ),
    }),
};

// ---------- 6 group marks (one per id) ----------

const GROUP_MARKS: Record<string, MarkComponent> = {
  // Proxy Core — plug
  proxy: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M9 3v6M15 3v6" />
          <rect x="6" y="9" width="12" height="6" />
          <path d="M12 15v3a3 3 0 0 1-3 3" />
        </>
      ),
    }),
  // Acceleration — diagonal up-arrow
  accel: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M5 19L19 5" />
          <path d="M9 5h10v10" />
        </>
      ),
    }),
  // Deploy & Ops — container cluster
  ops: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <circle cx="6.5" cy="6.5" r="0.5" />
          <circle cx="17.5" cy="6.5" r="0.5" />
          <circle cx="6.5" cy="17.5" r="0.5" />
          <circle cx="17.5" cy="17.5" r="0.5" />
        </>
      ),
    }),
  // Config & DNS — indented rule
  config: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M3 6h13M3 12h10M3 18h16" />
          <circle cx="19" cy="6" r="1" />
          <circle cx="16" cy="12" r="1" />
          <circle cx="22" cy="18" r="1" />
        </>
      ),
    }),
  // Tools & Test — toolbox
  tools: (p) =>
    base({
      ...p,
      children: (
        <>
          <rect x="3" y="8" width="18" height="12" />
          <path d="M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
          <path d="M3 13h7v3H3z" />
        </>
      ),
    }),
  // Security — shield
  security: (p) =>
    base({
      ...p,
      children: (
        <>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M12 8v5M12 16h.01" />
        </>
      ),
    }),
};

export function CategoryMark({
  slug,
  ...rest
}: MarkProps & { slug: string }) {
  // `MARKS[slug]` is typed `(p: MarkProps) => React.JSX.Element` —
  // a plain function. TypeScript does not widen that to a React
  // component for the JSX call signature, so we cast to
  // `ComponentType<MarkProps>` (the canonical, single-step cast;
  // the previous version used `as unknown as React.FC<MarkProps>`,
  // which skips type checking on every prop).
  const Mark = (MARKS[slug] ?? MARKS.collection) as React.ComponentType<MarkProps>;
  return <Mark {...rest} />;
}

export function GroupMark({ id, ...rest }: MarkProps & { id: string }) {
  const Mark = (GROUP_MARKS[id] ?? GROUP_MARKS.tools) as React.ComponentType<MarkProps>;
  return <Mark {...rest} />;
}

/**
 * Brand mark: a small "compass + meridian" that doubles as a
 * network node. The horizontal cross-line is the equator, the
 * vertical stroke is the prime meridian, and the diagonal needle
 * hints at a navigation / atlas instrument.
 */
export function SiteMark({
  size = 22,
  className,
  strokeWidth = 1.5,
}: MarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      role="presentation"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      <path d="M8 8l8 8M16 8l-8 8" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
