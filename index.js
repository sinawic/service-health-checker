// Get net module 
const net = require('net');
// load upstreams
const upstreams = require('./upstreams.json')

// required express stuff
const express = require('express');
const app = express();
const router = express.Router();

// timeout for tcp connection
TIMEOUT = 2000

// to actually load static files like bootstrap ...
app.use('/static', express.static('static'))

// set the view engine to ejs to be able to redner ejs files to the ui
app.set("view engine", "ejs")

// main page get request handler
router.get('/', function (req, res) {

  collectTCPInfo().finally(() => {
    res.render("index", {
      data: upstreams,
    }); // index refers to index.ejs
  })

});

//add the / router
app.use('/', router);

// start listening on given port
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');

// function to make tcp connection to an upstream
const collectTCPInfo = async () => {
  const promises = []

  upstreams.map(async (upstream, i) => {
    if (upstream.mode === 'tcp') {
      promises[i] = new Promise((resolve) => {

        const client = new net.Socket();

        client.setTimeout(TIMEOUT, () => {
          // when could not make connection within X secs
          upstream.resultText = `Connection timedout`
          upstream.result = false
          client.destroy()
          resolve('timedout')
        })

        client.connect(upstream.port, upstream.host, () => {
          // when the connection is established
          upstream.resultText = `Connected`
          upstream.result = true
          client.destroy()
          resolve(upstream)
        });

        client.on("error", () => {
          // when there is an error making the connection
          upstream.resultText = 'inaccessible'
          upstream.result = false
          client.destroy()
          resolve(upstream)
        })
      })
    } else {
      upstream.resultText = `any mode except for TCP (${upstream.mode}) not currently supported!`
      upstream.result = false
    }

  })

  return await Promise.all(promises)

}
