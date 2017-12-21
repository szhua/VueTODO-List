'use strict' ;

const fs =require('mz/fs');
const path =require('path');
const mime =require('mime') ;


/**
 * 加载静态文件
 * @param {*} url like /static/ 
 * @param {*} dir like app/static/.....等
 */
function staticFiles(url ,dir){
    return async(ctx,next)=>{
        let rpath =ctx.request.path;
        if(rpath.startsWith(url)){
           let fp =path.join(dir,rpath.substring(url.length)) ;
           if(await fs.exists(fp)){
               ctx.response.type =mime.lookup(fp);
               //异步读取内容；
               ctx.response.body =await fs.readFile(fp);
           }else{
               ctx.response.status =404 ;
           }
        }else{
            await next();
        }
    }
}


module.exports = staticFiles;







