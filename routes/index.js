const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.redirect('/index.html');
})

module.exports = router
