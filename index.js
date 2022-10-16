// Get net module 
const net = require('net');
const upstreams = require('./upstreams.json')

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.set("view engine", "ejs")

router.get('/', function (req, res) {
  upstreams.map(async (upstream, i) => {
    if (upstream.mode === 'tcp')
      await collectTCPInfo(upstream, i)
    else
      upstream.res = `${i + 1}. any mode except for TCP (${upstream.mode}) not currently supported!`

  })

  res.render("index", {
    data: upstreams,
  }); // index refers to index.ejs
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');


const INTERVAL = 5000, TIMEOUT = 2000

console.log(`Started listening to ${upstreams.length} servers...`)
// Connect to the server on the configured port 
// setInterval(() => {

//   upstreams.map((upstream, i) => {
//     if (upstream.mode === 'tcp')
//       collectTCPInfo(upstream, i)
//     else
//       console.log(`${i + 1}. any mode except for TCP (${upstream.mode}) not currently supported!`)

//   })
//   console.log('==========================================================')

// }, INTERVAL);


const collectTCPInfo = (upstream, i) => {
  return new Promise((resolve) => {
    const client = new net.Socket();

    client.setTimeout(TIMEOUT, () => {
      // Logs when could not make connection within X secs
      upstream.res = `${i + 1}. ${upstream.name}:\t Connection timedout \t ${upstream.host}:${upstream.port}`
      client.destroy()
      resolve('timedout')
    })

    client.connect(upstream.port, upstream.host, () => {
      // Logs when the connection is established
      upstream.res = `${i + 1}. ${upstream.name}:\t Connected \t\t ${upstream.host}:${upstream.port}`
      client.destroy()
      resolve('done')
    });
  })

}
