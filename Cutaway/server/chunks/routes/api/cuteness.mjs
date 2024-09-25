import fs from 'fs';
import path from 'path';
import { d as defineEventHandler } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const cuteness = defineEventHandler(async (event) => {
  const photosDir = path.join(process.cwd(), "public/cuteness");
  try {
    const files = fs.readdirSync(photosDir);
    const photos = files.map((file) => `/cuteness/${file}`);
    return photos;
  } catch (error) {
    return { error: "Unable to scan directory" };
  }
});

export { cuteness as default };
//# sourceMappingURL=cuteness.mjs.map
