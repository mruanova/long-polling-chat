// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage for messages and clients
let messages = [];
let clients = [];

// Endpoint for clients to long poll
app.get('/poll', (req, res) => {
    // Set headers for SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // If there are new messages, send them immediately
    if (messages.length > 0) {
        res.json({ messages });
        messages = [];
    } else {
        // Otherwise, hold the request
        clients.push(res);

        // Set a timeout to prevent hanging forever
        req.on('close', () => {
            clients = clients.filter(client => client !== res);
        });
    }
});

// Endpoint for clients to send messages
app.post('/send', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Add the new message to the messages array
    messages.push(message);

    // Send the message to all connected clients
    clients.forEach(client => {
        client.json({ messages: [message] });
    });

    // Clear the clients array
    clients = [];

    res.status(200).json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
