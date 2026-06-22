## Node.js HTTP Module

The `http` module is Node.js's built-in way to create a server without any external dependencies.

## Code

```
import http from "http";
const PORT = 3000;

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });

	res.end("Hello world");
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
```

## What each part does

- `http.createServer()` - creates a new HTTP server instance the callback function is executed for each request with two parameters:
- `req` - the request object
- `res` - the response object or string
- `res.writeHead()` - sets the headers
- `res.end()` - sends the response and ends the connection
- `server.listen()` - starts the server on the specified port
