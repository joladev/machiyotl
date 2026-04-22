import { ConfigSchema, type Config } from "./config";

export function loadConfig(): Config {
  const raw = process.env.SITES_CONFIG;

  if (!raw) {
    throw new Error("SITES_CONFIG env var is not set");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `SITES_CONFIG is not valid JSON: ${(err as Error).message}`,
    );
  }

  const result = ConfigSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`SITES_CONFIG failed validation: ${result.error.message}`);
  }

  return result.data;
}
