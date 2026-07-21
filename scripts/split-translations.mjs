#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "lib/translations.ts"), "utf8");

const typesEnd = src.indexOf("export const translations");
const typesBlock = src.slice(0, typesEnd).trim();

const localesDir = path.join(root, "lib/translations/locales");
fs.mkdirSync(localesDir, { recursive: true });

fs.writeFileSync(
  path.join(root, "lib/translations/types.ts"),
  typesBlock.replace(
    'export interface Translations',
    'export interface Translations',
  ),
);

const langRe = /^\s{2}(en|es|fr|de|it|pt|zh|ja|ko|ar|ru|hi|tr):\s*\{/gm;
const matches = [...src.matchAll(langRe)];

for (let i = 0; i < matches.length; i++) {
  const lang = matches[i][1];
  const start = matches[i].index + matches[i][0].length - 1;
  const end =
    i + 1 < matches.length ? matches[i + 1].index : src.lastIndexOf("};");
  let body = src.slice(start, end).trim();
  if (body.endsWith(",")) body = body.slice(0, -1);

  const file = `import type { Translations } from "../types";

export const ${lang}: Translations = ${body};
`;
  fs.writeFileSync(path.join(localesDir, `${lang}.ts`), file);
}

console.log(`Wrote ${matches.length} locale files to lib/translations/locales/`);
