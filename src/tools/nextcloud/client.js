const BASE = () => process.env.NEXTCLOUD_URL;
const auth = () =>
  Buffer.from(`${process.env.NEXTCLOUD_USER}:${process.env.NEXTCLOUD_PASSWORD}`).toString("base64");

export async function ocs(path, method = "GET", body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${BASE()}/ocs/v1.php${path}`, {
      method,
      headers: {
        Authorization: `Basic ${auth()}`,
        "OCS-APIRequest": "true",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body ? new URLSearchParams(body).toString() : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Nextcloud OCS ${res.status}: ${text}`);
    }
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

export async function ocsApps(path, method = "GET", body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${BASE()}/ocs/v2.php/apps${path}`, {
      method,
      headers: {
        Authorization: `Basic ${auth()}`,
        "OCS-APIRequest": "true",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body ? new URLSearchParams(body).toString() : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Nextcloud OCS Apps ${res.status}: ${text}`);
    }
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

export async function appJson(appId, path, method = "GET", body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const res = await fetch(`${BASE()}/index.php/apps/${appId}${cleanPath}`, {
      method,
      headers: {
        Authorization: `Basic ${auth()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Nextcloud app ${appId} ${res.status}: ${text}`);
    }

    if (!text.trim()) {
      return { ok: true };
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } finally {
    clearTimeout(timeout);
  }
}

const DECK_BASE = () => `${process.env.NEXTCLOUD_URL}/index.php/apps/deck/api/v1`;
const DAV_BASE = () => `${process.env.NEXTCLOUD_URL}/remote.php/dav`;

export async function deck(path, method = "GET", body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${DECK_BASE()}${path}`, {
      method,
      headers: {
        Authorization: `Basic ${auth()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Nextcloud Deck ${res.status}: ${text}`);
    }

    if (!text.trim()) {
      return { ok: true };
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function carddav(path, method = "GET", body, extraHeaders = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${DAV_BASE()}${path}`, {
      method,
      headers: {
        Authorization: `Basic ${auth()}`,
        ...(body ? { "Content-Type": "application/xml; charset=utf-8" } : {}),
        ...extraHeaders,
      },
      body,
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok && res.status !== 207) {
      throw new Error(`Nextcloud CardDAV ${res.status}: ${text}`);
    }
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

import { execSync } from "child_process";

export function occ(cmd) {
  const occPath = process.env.NEXTCLOUD_OCC_PATH || "php /var/www/html/occ";
  try {
    return execSync(`${occPath} ${cmd}`, { encoding: "utf8" });
  } catch (e) {
    return e.stderr || e.message;
  }
}
