// server/api/photos.ts
import fs from 'fs';
import path from 'path';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const photosDir = path.join(process.cwd(), 'public/cuteness');
    try {
        const files = fs.readdirSync(photosDir);
        const photos = files.map(file => `/cuteness/${file}`);
        return photos;
    } catch (error) {
        return { error: 'Unable to scan directory' };
    }
});
