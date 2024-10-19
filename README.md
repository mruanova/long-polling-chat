# Long Polling

https://en.wikipedia.org/wiki/Push_technology

Long polling is an older technique that involves the client making a request to the server, and the server holds the request open until new data is available. When the data is available, the server responds, and the client immediately sends another request, repeating the process.

## Key Features:
Simulates Real-Time Updates: Long polling simulates real-time communication but is not as efficient as WebSockets.

## HTTP-Based: 
Since it uses regular HTTP requests, it works over any HTTP connection, but each request incurs overhead.

## Server-Controlled Timing: 

The server waits until new information is available to respond, making it feel like a real-time update.

## How it works:

- The client sends an HTTP request to the server.
- The server holds the connection open until it has new information to send back.
- Once the server responds, the client immediately sends another request.
- This method can cause more overhead than WebSocket due to frequent reconnections and is generally used when WebSocket support isn't available. 

It can still be useful for:

- Basic notifications
- Simple, non-frequent updates

## Comparison:
### Efficiency: 
WebSockets are more efficient because they maintain a single connection. Long polling requires a new connection for each update.
### Latency: 
WebSockets offer lower latency as the server can push updates instantly. Long polling has higher latency due to the time spent opening new connections.
Browser and Server Support: WebSockets require server and browser support, but most modern web environments support them. Long polling works with older systems.
### Use Cases: 
WebSockets are ideal for frequent, real-time interactions, while long polling may be used for less frequent updates or when WebSockets aren't an option.

`npm install express cors`

`node server.js`
