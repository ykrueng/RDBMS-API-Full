const server = require('express')();

server.get("/", (req, res) => {
  res.send("Welcome to DB-Zoos API");
});

const port = 8000;
server.listen(port, () => { console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`); })