import { readdirSync } from 'fs';
import path from 'path';

export function requireDir(dir) {
    return new Promise((resolve, reject) => {
        readdirSync(dir).forEach(file=> {
            var ext = path.extname(file);
            var base = path.basename(file, ext);
            resolve(require(path.join(dir, base)))
        });
    })
}