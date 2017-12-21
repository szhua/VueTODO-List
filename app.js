'use strict' ;

const controller =require('./controller');

const staticFiles =require('./static-files') ;

const bodyParser =require('koa-bodyparser');

const rest =require('./rest') ;

const app =new (require('koa'))() ;


//判断是不是成产环境
let production =process.env.NODE_EVN  ==='production' ;

console.log(production) ;

app.use(async(ctx,next)=>{
  console.log(`PROCESS meeting method ==${ctx.method} \nurl== ${ctx.request.path}`) ;
  await next() ;
});


app.use(bodyParser()) ;

app.use(rest.handle('/api/'));

app.use(staticFiles('/static/',__dirname+'/static/'))

app.use(controller());





app.listen(8080);
