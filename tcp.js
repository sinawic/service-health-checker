// Get net module 
const net = require('net');
const upstreams = require('./upstream.json')

const INTERVAL = 5000

console.log(`Started listening to ${upstreams.length} servers...`)
//Connect to the server on the configured port 
setInterval(() => {

  upstreams.map((upstream, i) => {
    const client = new net.Socket();
    client.setTimeout(2000, () => {
      console.log(`${i + 1}. ${upstream.name}:\t Connection timedout \t ${upstream.host}:${upstream.port}`)
      client.destroy()
    })
    client.connect(upstream.port, upstream.host, () => {
      //Log when the connection is established
      console.log(`${i + 1}. ${upstream.name}:\t Connected \t\t ${upstream.host}:${upstream.port}`);
      client.destroy()
    });
  })
  console.log('================================================')

}, INTERVAL);

