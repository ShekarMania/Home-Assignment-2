// ENTRY FILE

const server = require('./lib/server')

// Define App
let app = {}

// app init
app.init = () => {
  // server init
  server.init()
}

app.init()
