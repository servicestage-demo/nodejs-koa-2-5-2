const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// app.use(async(next) =>{  
//     try {
//       await next();
//        console.log('400004', ctx.status); 
//       if (ctx.status === 404) {
//         console.log('400004');
//       }
//     } catch (e) {
//        this.status = 500;
//        this.body = { error: 'System error' };
//     }
// });
// app.use(async (ctx, next) => {
//     console.log('123123    ', this.status);
//     if(parseInt(this.status) === 404){
//       if(ctx.is('text/html')) {
//          ctx.redirect('/404.html');
//       } else if(ctx.is('application/json')) {
//         this.body = { error: 'Not found' };
//       } else {
//         this.body = 'Not found111';
//       }
//     }
// })
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
