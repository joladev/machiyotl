#!/usr/bin/env bun
import { siteSignature } from "../src/core/sign";

const site = process.argv[2];

if (!site) {
  console.error("Usage: bun run scripts/generate-sig.ts <site>");
  console.error("");
  console.error("Requires <SITE>_SECRET to be set in the environment.");
  console.error(
    "Example: LARM_SECRET=$(openssl rand -hex 32) bun run scripts/generate-sig.ts larm",
  );
  process.exit(1);
}

const sig = siteSignature(site);

if (!sig) {
  console.error(`No secret found for site "${site}".`);
  console.error(`Set ${site.toUpperCase()}_SECRET in your environment.`);
  process.exit(1);
}

console.log(sig);
