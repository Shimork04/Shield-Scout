// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const axios = require('axios');
// // const rateLimit = require('express-rate-limit');
// // const geoip = require('geoip-lite');
// // const fs = require('fs');
// // const WebSocket = require('ws');

// // const app = express();
// // app.use(bodyParser.json());
// // app.use(cors());

// // const PORT = 5000;
// // let activeIPs = [];
// // let blacklistedIPs = new Set(); // Blacklisted IPs
// // // const wss = require('ws').Server({ port: 5001 });
// // const wss = new WebSocket.Server({ port: 5001 });

// // // Rate Limiting
// // const limiter = rateLimit({
// //   windowMs: 60 * 1000, // 1 minute
// //   max: 100, // Limit each IP to 100 requests per minute
// //   message: 'Too many requests from this IP, please try again after a minute',
// // });
// // app.use(limiter); // Apply rate limiting

// // // Middleware to check if IP is blacklisted
// // app.use((req, res, next) => {
// //   const ip = req.ip;
// //   if (blacklistedIPs.has(ip)) {
// //     return res.status(403).json({ message: 'Your IP is blacklisted due to suspicious activity.' });
// //   }
// //   next();
// // });

// // // IP Access Simulation
// // app.post('/analyze', (req, res) => {
// //   const { url, time } = req.body;
// //   console.log(`Starting analysis for ${url} for ${time} seconds...`);

// //   const interval = setInterval(async () => {
// //     const simulatedIP = await simulateIPAccess();
// //     activeIPs.push(simulatedIP);
// //     wss.clients.forEach((client) => {
// //       if (client.readyState === 1) {
// //         client.send(JSON.stringify(simulatedIP));
// //       }
// //     });
// //   }, 1000);

// //   setTimeout(() => {
// //     clearInterval(interval);
// //     saveToLog(activeIPs);
// //     res.json({ message: 'Analysis complete', ips: activeIPs });
// //   }, time * 1000);
// // });

// // // Simulate an incoming IP with request frequency and blacklist check
// // async function simulateIPAccess() {
// //   const ip = generateRandomIP();
// //   const requests = Math.floor(Math.random() * 100); // Simulate request frequency

// //   const flag = requests > 50 || await checkBlacklistedIP(ip); // Mark as suspicious based on request rate or blacklist check

// //   if (flag) {
// //     updateBlacklist(ip); // Add IP to blacklist if flagged
// //   }

// //   const geo = geoip.lookup(ip);
// //   return {
// //     address: ip,
// //     origin: geo ? geo.country : 'Unknown',
// //     flag,
// //     requests,
// //     timestamp: new Date().toLocaleString(),
// //   };
// // }

// // // Generate random IPs
// // function generateRandomIP() {
// //   return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
// // }

// // // Check if the IP is blacklisted using AbuseIPDB
// // async function checkBlacklistedIP(ip) {
// //   const apiKey = 'YOUR_ABUSE_IPDB_API_KEY'; // Replace with your AbuseIPDB API key
// //   const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;

// //   try {
// //     const response = await axios.get(url, {
// //       headers: { 'Key': apiKey, 'Accept': 'application/json' },
// //     });
// //     const data = response.data;
// //     return data.data.abuseConfidenceScore > 50; // Flag if abuse score is high
// //   } catch (error) {
// //     console.error(`Error checking IP ${ip}: `, error.message);
// //     return false;
// //   }
// // }

// // // Add IP to blacklist
// // function updateBlacklist(ip) {
// //   blacklistedIPs.add(ip);
// //   setTimeout(() => blacklistedIPs.delete(ip), 60 * 60 * 1000); // Remove IP after 1 hour
// // }

// // // Save log data to file
// // function saveToLog(ips) {
// //   const logData = { timestamp: new Date().toISOString(), ips };
// //   const filePath = 'logs/history.json';
// //   if (!fs.existsSync('logs')) fs.mkdirSync('logs');
// //   if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
// //   const currentLogs = JSON.parse(fs.readFileSync(filePath));
// //   currentLogs.push(logData);
// //   fs.writeFileSync(filePath, JSON.stringify(currentLogs, null, 2));
// // }

// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });




// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// const rateLimit = require('express-rate-limit');
// const geoip = require('geoip-lite');
// const fs = require('fs');
// const WebSocket = require('ws');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const PORT = 5000;
// let activeIPs = [];
// let blacklistedIPs = new Set(); // Blacklisted IPs

// // WebSocket for real-time monitoring
// const wss = new WebSocket.Server({ port: 5001 });

// // Rate Limiting
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 100, // Limit each IP to 100 requests per minute
//   message: 'Too many requests from this IP, please try again after a minute',
// });
// app.use(limiter); // Apply rate limiting

// // Middleware to check if IP is blacklisted
// app.use((req, res, next) => {
//   const ip = req.ip;
//   if (blacklistedIPs.has(ip)) {
//     return res.status(403).json({ message: 'Your IP is blacklisted due to suspicious activity.' });
//   }
//   next();
// });

// // Analyze and Simulate IP Access
// app.post('/analyze', (req, res) => {
//   const { url, time } = req.body;
//   console.log(`Starting analysis for ${url} for ${time} seconds...`);

//   const interval = setInterval(async () => {
//     const simulatedIP = await simulateIPAccess();
//     activeIPs.push(simulatedIP);
//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(JSON.stringify(simulatedIP));
//       }
//     });
//   }, 1000);

//   setTimeout(() => {
//     clearInterval(interval);
//     saveToLog(activeIPs);
//     res.json({ message: 'Analysis complete', ips: activeIPs });
//   }, time * 1000);
// });

// // Simulate IP Access with Blacklist Check
// async function simulateIPAccess() {
//   const ip = generateRandomIP();
//   const requests = Math.floor(Math.random() * 100); // Simulate request frequency
//   const flag = requests > 50 || await checkBlacklistedIP(ip); // Mark as suspicious

//   if (flag) {
//     updateBlacklist(ip); // Add to blacklist
//   }

//   const geo = geoip.lookup(ip);
//   return {
//     address: ip,
//     origin: geo ? geo.country : 'Unknown',
//     flag,
//     requests,
//     timestamp: new Date().toLocaleString(),
//   };
// }

// // Generate random IPs for simulation
// function generateRandomIP() {
//   return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
// }

// // Check if IP is blacklisted (using AbuseIPDB)
// async function checkBlacklistedIP(ip) {
//   const apiKey = 'YOUR_ABUSE_IPDB_API_KEY'; // Replace with your AbuseIPDB API key
//   const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;

//   try {
//     const response = await axios.get(url, {
//       headers: { 'Key': apiKey, 'Accept': 'application/json' },
//     });
//     const data = response.data;
//     return data.data.abuseConfidenceScore > 50; // Mark as suspicious if abuse score is high
//   } catch (error) {
//     console.error(`Error checking IP ${ip}: `, error.message);
//     return false;
//   }
// }

// // Add IP to blacklist
// function updateBlacklist(ip) {
//   blacklistedIPs.add(ip);
//   setTimeout(() => blacklistedIPs.delete(ip), 60 * 60 * 1000); // Remove after 1 hour
// }

// // Save log data to file
// function saveToLog(ips) {
//   const logData = { timestamp: new Date().toISOString(), ips };
//   const filePath = 'logs/history.json';
//   if (!fs.existsSync('logs')) fs.mkdirSync('logs');
//   if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
//   const currentLogs = JSON.parse(fs.readFileSync(filePath));
//   currentLogs.push(logData);
//   fs.writeFileSync(filePath, JSON.stringify(currentLogs, null, 2));
// }

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });





const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const geoip = require('geoip-lite');
const fs = require('fs');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;
let activeIPs = [];
let blacklistedIPs = new Set(); // Blacklisted IPs

// WebSocket for real-time monitoring
const wss = new WebSocket.Server({ port: 5001 });

// Rate Limiting Middleware to prevent DDoS attacks
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
  message: 'Too many requests from this IP, please try again after a minute',
});
app.use(limiter); // Apply rate limiting

// Middleware to check if IP is blacklisted
app.use((req, res, next) => {
  const ip = req.ip;
  if (blacklistedIPs.has(ip)) {
    return res.status(403).json({ message: 'Your IP is blacklisted due to suspicious activity.' });
  }
  next();
});

// API Route to start IP traffic analysis
app.post('/analyze', (req, res) => {
  const { url, time } = req.body;
  console.log(`Starting analysis for ${url} for ${time} seconds...`);

  const interval = setInterval(async () => {
    const simulatedIP = await simulateIPAccess();
    activeIPs.push(simulatedIP);

    // Send traffic data to all WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(simulatedIP));
      }
    });
  }, 1000);

  // Stop analysis after the given time and return the results
  setTimeout(() => {
    clearInterval(interval);
    saveToLog(activeIPs);
    res.json({ message: 'Analysis complete', ips: activeIPs });
  }, time * 1000);
});

// Function to simulate incoming IP access and check for blacklisting
async function simulateIPAccess() {
  const ip = generateRandomIP();
  const requests = Math.floor(Math.random() * 100); // Simulate request frequency
  const flag = requests > 50 || await checkBlacklistedIP(ip); // Mark as suspicious based on request rate or blacklist check

  if (flag) {
    updateBlacklist(ip); // Add to blacklist if flagged
  }

  const geo = geoip.lookup(ip);
  return {
    address: ip,
    origin: geo ? geo.country : 'Unknown',
    flag,
    requests,
    timestamp: new Date().toLocaleString(),
  };
}

// Function to generate random IPs for simulation
function generateRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Function to check if an IP is blacklisted using AbuseIPDB
async function checkBlacklistedIP(ip) {
  const apiKey = '570e6322aab844c5b139dcee99d44baa320ea13516c39ee71dd24b0a75c45a9d0fc405f6388e6c35'; // Replace with your AbuseIPDB API key
  const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;

  try {
    const response = await axios.get(url, {
      headers: { 'Key': apiKey, 'Accept': 'application/json' },
    });
    const data = response.data;
    return data.data.abuseConfidenceScore > 50; // Mark as suspicious if abuse score is high
  } catch (error) {
    console.error(`Error checking IP ${ip}:`, error.message);
    return false; // If the API call fails, default to not blacklisting the IP
  }
}

// Function to add IP to blacklist for a specific period (1 hour in this case)
function updateBlacklist(ip) {
  blacklistedIPs.add(ip);
  setTimeout(() => blacklistedIPs.delete(ip), 60 * 60 * 1000); // Remove IP from blacklist after 1 hour
}

// Function to save IP log data to a file
function saveToLog(ips) {
  const logData = { timestamp: new Date().toISOString(), ips };
  const filePath = 'logs/history.json';
  if (!fs.existsSync('logs')) fs.mkdirSync('logs'); // Create directory if it doesn't exist
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]'); // Create log file if it doesn't exist

  try {
    const currentLogs = JSON.parse(fs.readFileSync(filePath));
    currentLogs.push(logData);
    fs.writeFileSync(filePath, JSON.stringify(currentLogs, null, 2));
  } catch (error) {
    console.error(`Error saving logs: ${error.message}`);
  }
}

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
