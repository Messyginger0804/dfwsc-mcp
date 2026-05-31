const BASE = () => process.env.COOLIFY_URL;

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.COOLIFY_TOKEN}`,
});

export async function api(path, method = "GET", body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${BASE()}/api/v1${path}`, {
      method,
      headers: headers(),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!res.ok) {
      const msg =
        typeof data === "object" ? data.message || JSON.stringify(data) : text;
      throw new Error(`Coolify API ${res.status}: ${msg}`);
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}
