import type { Config, Font } from "./config";

const fontCache = new Map<string, ArrayBuffer>();

export async function preloadFonts(config: Config): Promise<void> {
	const allFonts: Font[] = [];
	for (const site of Object.values(config)) {
		if (site.theme.fonts) allFonts.push(...site.theme.fonts);
	}

	await Promise.all(
		allFonts.map(async (font) => {
			if (fontCache.has(font.url)) return;
			const res = await fetch(font.url);
			if (!res.ok) {
				throw new Error(`Failed to fetch font ${font.url}: ${res.status}`);
			}
			const buf = await res.arrayBuffer();
			fontCache.set(font.url, buf);
		}),
	);
}

export function getFontsForSite(fonts: Font[] | undefined) {
	if (!fonts) return [];
	return fonts
		.map((f) => {
			const data = fontCache.get(f.url);
			if (!data) return null;
			return { name: f.family, data };
		})
		.filter((f): f is { name: string; data: ArrayBuffer } => f !== null);
}
