const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const proxy = httpProxy.createProxyServer();

// Enable CORS
app.use(cors());

// Define the target website (replace this with the actual target website)
const TARGET_WEBSITE = ''; 

// Proxy route to forward traffic
app.use((req, res) => {
  proxy.web(req, res, { target: TARGET_WEBSITE }, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});



// const express = require('express');
// const httpProxy = require('http-proxy');
// const cors = require('cors');

// const app = express();
// const proxy = httpProxy.createProxyServer();

// // Enable CORS and JSON parsing
// app.use(cors());
// app.use(express.json());

// // Proxy configuration
// let TARGET_WEBSITE = ''; // Placeholder for dynamic URL

// // Start the proxy server based on user input
// app.post('/start-proxy', (req, res) => {
//     const { targetUrl } = req.body;
  
//     // Logic for starting proxy here
//     if (targetUrl) {
//       // Start the proxy logic
//       res.json({ message: `Proxy started for ${targetUrl}` });
//     } else {
//       res.status(400).json({ message: 'Invalid URL' });
//     }
//   });
  

// // Proxy route to forward traffic
// app.use((req, res) => {
//   if (!TARGET_WEBSITE) {
//     return res.status(400).send('Target website is not set. Please provide a URL.');
//   }

//   proxy.web(req, res, { target: TARGET_WEBSITE }, (err) => {
//     if (err) {
//       console.error('Proxy error:', err.message);
//       res.status(500).send('Proxy error');
//     }
//   });
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Proxy server running on port ${PORT}`);
// });
