'use strict';


//集中处理rest api 
/**
 * 
 * @param {*} pathPrefix like /api/ 
 */
function handlerRest(pathPrefix){
    return  async(ctx,next)=>{
        pathPrefix =pathPrefix ||'/api/'
        //当以 /api/开始的时候
        console.log(ctx.path);
        if(ctx.request.path.startsWith(pathPrefix)){
            ctx.rest =(data)=>{
                ctx.response.type ="application/json" ;
                ctx.response.body =data ;   
            }
            //必须将错误的处理写在他的后面；即app.use(this) 写在前面
            try {
                await next() ;
            } catch (e) {
                ctx.response.type ='application/json' ;
                ctx.response.body ={
                    message :e.message ,
                    code :e.code||''
                }
            }
        }else{
            await next();
        }
     }
}


module.exports={
    APIerror:function (message ,code){
        this.code =code || '' ;
        this.message =message || 'internal:unknow_error' ;
    },
    handle:function(pathPrefix){
       return   handlerRest(pathPrefix);
    }
}
