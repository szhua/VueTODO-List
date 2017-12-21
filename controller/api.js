'use strict' ;


const APIerror =require('../rest').APIerror;

var gid =  0 ;
function nextId(){
 gid ++ ;
 return `g${gid}` ;
}

function TD(name ,description ){
    this.id =nextId() ;
    this.description =description ;
    this.name =name ;
}

var todos=[
    new TD('Learn Git','Learn how to use git as distributed version control'),
    new TD('Learn JavaScript','Learn JavaScript, Node.js, NPM and other libraries') ,
    new TD('Learn Python','Learn Python, WSGI, asyncio and NumPy') ,
    new TD('Learn Java','Learn Java, Servlet, Maven and Spring')
]


module.exports= {

    'GET /':async(ctx,next)=>{
        ctx.response.redirect('/static/index.html') 
    },
    "GET /api/todos":async(ctx,next)=>{
        ctx.rest({
            data:todos 
        });
    },
    'POST /api/todos':async(ctx,next)=>{
        let 
           name =ctx.request.body.name,
           description =ctx.request.body.description ;

          console.log(ctx.request.body);

        if(!name||!description){
            throw new APIerror('Missing name or descrption', 'invilad input');
        }   
        let todo =new TD(name,description) ;
        todos.push(todo); 
        ctx.rest({
              data:todo
        })
    },
    'DELETE /api/todos/:id':async(ctx,next)=>{
        let i =0 , index =-1 ;
        for(i;i<todos.length;i++){
            console.log(i);
             if(todos[i].id===ctx.params.id){
                index =i ;
               
                break 
             }
        }
        console.log(index);
        if(index == -1){
            throw new APIerror('notfound', 'Todo not found by id: ' + ctx.params.id);
        }  
        //使用splice ;
        ctx.rest({
            data:todos.splice(index,1)[0] ,
            index:index 
        });
    },
    'PUT /api/todos/:id':async(ctx,next)=>{
        var
            t = ctx.request.body,
            index = -1,
            i, todo;
        if (!t.name || !t.name.trim()) {
            throw new APIerror('invalid_input', 'Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIerror('invalid_input', 'Missing description');
        }
        for (i=0; i<todos.length; i++) {
            if (todos[i].id === ctx.params.id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new APIerror('notfound', 'Todo not found by id: ' + ctx.params.id);
        }
        todo = todos[index];
        todo.name = t.name.trim();
        todo.description = t.description.trim();
        ctx.rest({data:todo});
   }
           
}


















