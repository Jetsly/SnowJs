import { readdirSync } from 'fs';
import path from 'path';

export function requireDir(dir) {
    let requireList=[];
    readdirSync(dir).forEach(file=> {
       let ext = path.extname(file);
       let base = path.basename(file, ext);
       let modulePath=path.join(dir, base);
       requireList.push(require(modulePath));            
    });
    return requireList;        
}

export function requireDirs(dirs) {
    let reqireList=[];
    dirs.forEach(dir=>{
        reqireList.push(...requireDir(dir));
    })   
    return reqireList;    
}