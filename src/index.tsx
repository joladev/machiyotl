import { Hono } from "hono";
import { ImageResponse } from "takumi-js/response";
import { z } from "zod";
import { loadConfig } from "./core/load-config";
import { preloadFonts, getFontsForSite } from "./core/fonts";
import { templates } from "./templates";
import { verify } from "./core/sign";

const config = loadConfig();
await preloadFonts(config);

const app = new Hono();

const ParamSchema = z.object({
  title: z.string().min(1).max(200),
  eyebrow: z.string().max(40).optional(),
  description: z.string().max(200).optional(),
  author: z.string().max(80).optional(),
});

app.get("/", (c) => c.text("machiyotl"));

app.get("/v1/:site/:template", (c) => {
  const { site, template } = c.req.param();
  const url = new URL(c.req.url);

  if (!/^[a-z0-9]+$/.test(site) || !/^[a-z0-9-]+$/.test(template)) {
    return c.text("Invalid site or template name", 400);
  }

  const skipAuth =
    process.env.NODE_ENV === "development" &&
    url.searchParams.get("preview") === "1";

  if (!skipAuth) {
    if (!verify(site, url.searchParams)) {
      return c.text("Forbidden", 403);
    }
  }

  const siteConfig = config[site];
  if (!siteConfig) return c.text("Unknown site", 404);

  const TemplateFn = templates[template];
  if (!TemplateFn) return c.text("Unknown template", 404);

  const raw: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    if (key !== "sig" && key !== "preview") raw[key] = value;
  });

  const parsed = ParamSchema.safeParse(raw);
  if (!parsed.success) {
    return c.text("Invalid params", 400);
  }

  const response = new ImageResponse(
    TemplateFn({ ...parsed.data, theme: siteConfig.theme }),
    {
      width: 1200,
      height: 630,
      fonts: getFontsForSite(siteConfig.theme.fonts),
    },
  );
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  response.headers.set(
    "CDN-Cache-Control",
    "public, max-age=31536000, immutable",
  );
  return response;
});

app.onError((err, c) => {
  console.error("render error:", err);
  return c.text("Internal error", 500);
});

export default {
  port: process.env.PORT ?? 3000,
  fetch: app.fetch,
};
