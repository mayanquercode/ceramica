import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import os from 'node:os'

import productRouter from './products/router.js'

function getLocalIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    let localIp = '';
  
    for (const interfaceName in networkInterfaces) {
      const interfaceInfo = networkInterfaces[interfaceName];
      for (const info of interfaceInfo) {
        if (!info.internal && info.family === 'IPv4') {
          localIp = info.address;
          break;
        }
      }
      if (localIp) break;
    }
  
    return localIp;
  }
  

const app = express()
const port = 3000
const corsOptions = {}

// middleware
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// router
app.use('/api/v1', productRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, '0.0.0.0', () => {
    const localIp = getLocalIpAddress();
  console.log(`Server running`);
  console.log('')
  console.log(`[GET] http://localhost:${port}/api/v1/products`);
  console.log(`[GET] http://localhost:${port}/api/v1/products/:code`);
  console.log(`[GET] http://localhost:${port}/api/v1/products/category/:code`);
  console.log(`[GET] http://localhost:${port}/api/v1/categories`);
  console.log(`[POST] http://localhost:${port}/api/v1/products/:code`);
  console.log(`[POST] http://localhost:${port}/api/v1/filter`);
  console.log(`[PUT] http://localhost:${port}/api/v1/products/:code`);
  console.log('')
  console.log(`Server can also be accessed on http://${localIp}:${port}/...`);
})
