/**
 * Bakes the rendered page into dist/index.html.
 *
 * Without this the file ships `<div id="root"></div>` and nothing else, so
 * anything that does not run JavaScript — most crawlers, and every link
 * preview — sees an empty page. It also means the text paints before the
 * React bundle has parsed, which matters most on a slow phone.
 */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { render } from "../dist-ssr/entry-server.js";

const page = "dist/index.html";
const html = readFileSync(page, "utf8");
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  console.error("prerender: could not find the root element in", page);
  process.exit(1);
}

const body = render();
writeFileSync(page, html.replace(marker, `<div id="root">${body}</div>`));
rmSync("dist-ssr", { recursive: true, force: true });

const bytes = Buffer.byteLength(body, "utf8");
console.log(`prerendered ${(bytes / 1024).toFixed(1)} kB of markup into ${page}`);
