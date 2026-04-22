import { z } from "zod";

export const FontSchema = z.object({
  family: z.string(),
  url: z.string().url(),
  weight: z.number().optional(),
});

export const ThemeSchema = z.object({
  siteName: z.string(),
  bg: z.string(),
  fg: z.string(),
  accent: z.string(),
  logoUrl: z.string().url().optional(),
  fonts: z.array(FontSchema).optional(),
  bodyFont: z.string().optional(),
  monoFont: z.string().optional(),
});

export const SiteSchema = z.object({
  theme: ThemeSchema,
});

export const ConfigSchema = z.record(z.string(), SiteSchema);

export type Font = z.infer<typeof FontSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type SiteConfig = z.infer<typeof SiteSchema>;
export type Config = z.infer<typeof ConfigSchema>;
