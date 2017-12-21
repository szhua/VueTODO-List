'use strict' ;


const fs =require('fs') ;



/**
 * 将文件和router进行绑定；
 * @param {*} router 
 * @param {*} mapping 
 */
function addMapping(router ,mapping){
    for( var url in mapping){
        if(url.startsWith('GET ')){
            router.get(url.substring(4),mapping[url]); 
            console.log(`bind url GET ${url}`);
        }else if(url.startsWith("POST ")){
         router.post(url.substring(5),mapping[url]); 
         console.log(`bind url POST ${url}`);
        }else if(url.startsWith('DELETE ')){
         router.delete(url.substring(7),mapping[url]); 
         console.log(`bind url DELETE ${url}`);
        }else if(url.startsWith("PUT ")){
         router.put(url.substring(4),mapping[url]); 
         console.log(`bind url PUT ${url}`);
        }else{
            console.log('request do not has method: '+url)
        }
     }  
}



/**
 * 根据path 获得每一个需要添加router的文件
 * @param {*} router 
 * @param {*} path 
 */
function addController(router ,path){
  
    fs.readdirSync(__dirname+"/"+path).filter((f)=>{
        return f.endsWith('.js') ;
    }).forEach((f)=>{
        console.log(`process meeting controller ${f}`);
        let mapping =require(__dirname+"/"+path+"/"+f);
        addMapping(router,mapping) ;
    }); 
}



module.exports =function(dir) {
    
    let 
       controller_path =dir||'controller',
       router =require('koa-router')();
    addController(router,controller_path);
       
    return router.routes();

   
        

}


