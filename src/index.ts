export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // If the request has an extension (e.g. .css/.js/.png), let assets handle it.
    if (/\.[a-zA-Z0-9]+$/.test(url.pathname)) {
      return env.ASSETS.fetch(request);
    }

    // Clean URL routing:
    // /thankyou -> /thankyou/index.html
    // / -> /index.html
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
    }

    // Try folder index first
    const folderIndex = new URL(`${url.pathname.replace(/\/+$/, "")}/index.html`, url);
    const res = await env.ASSETS.fetch(new Request(folderIndex, request));
    if (res.status !== 404) return res;

    // Fallback: try .html
    const html = new URL(`${url.pathname}.html`, url);
    const res2 = await env.ASSETS.fetch(new Request(html, request));
    if (res2.status !== 404) return res2;

    // Final fallback: 404 page if you add one
    return new Response("Not Found", { status: 404 });
  }
} satisfies ExportedHandler;