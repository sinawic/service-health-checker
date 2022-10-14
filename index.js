// Get net module 
const net = require('net');
const upstreams = require('./upstreams.json')

const INTERVAL = 5000, TIMEOUT = 2000

console.log(`Started listening to ${upstreams.length} servers...`)
// Connect to the server on the configured port 
setInterval(() => {

  upstreams.map((upstream, i) => {
    const client = new net.Socket();

    client.setTimeout(TIMEOUT, () => {
      // Logs when could not make connection within X secs
      console.log(`${i + 1}. ${upstream.name}:\t Connection timedout \t ${upstream.host}:${upstream.port}`)
      client.destroy()
    })

    client.connect(upstream.port, upstream.host, () => {
      // Logs when the connection is established
      console.log(`${i + 1}. ${upstream.name}:\t Connected \t\t ${upstream.host}:${upstream.port}`);
      client.destroy()
    });
  })
  console.log('==========================================================')

}, INTERVAL);

