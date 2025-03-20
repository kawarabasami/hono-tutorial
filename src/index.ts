import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { View } from './view.js'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({ok: true, message: 'Hello Hono!'})
})

app.post('/posts', (c) => c.text('Created!', 201))

app.delete('/posts/:id', (c) => 
  c.text(`Deleted post with id: ${c.req.param('id')}`)
)

// HTML(JSX)を返すサンプル
app.get('/page', (c) => c.html(View()))

// 生レスポンスを返すサンプル
app.get('/raw', (c) => new Response('Good morning!'))

// middleware basic認証
app.use('/admin/*', basicAuth({username: 'admin', password: 'password'}))
app.get('/admin', (c) => c.text('Welcome to admin page!'))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
