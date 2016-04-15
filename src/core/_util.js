import { readdirSync } from 'fs';
import path from 'path';

export function requireDir(dir) {
    return new Promise((resolve, reject) => {
        let requireList=[];
        readdirSync(dir).forEach(file=> {
            let ext = path.extname(file);
            let base = path.basename(file, ext);
            let modulePath=path.join(dir, base);
            requireList.push(require(modulePath));            
        });
        resolve(requireList);        
    })
}