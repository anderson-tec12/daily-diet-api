import 'dotenv'
import { env } from './env'

import { app } from './app'

app
  .listen({
    port: env.PORT,
  })
  .then((info) => {
    console.log('HTTP Server is running ' + info)
  })
