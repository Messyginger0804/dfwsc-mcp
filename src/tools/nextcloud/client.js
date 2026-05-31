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

import { execSync } from "child_process";

export function occ(cmd) {
  const occPath = process.env.NEXTCLOUD_OCC_PATH || "php /var/www/html/occ";
  try {
    return execSync(`${occPath} ${cmd}`, { encoding: "utf8" });
  } catch (e) {
    return e.stderr || e.message;
  }
}
