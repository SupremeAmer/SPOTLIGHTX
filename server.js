const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

const ACTIVITY_LOG = path.join(__dirname, 'user-activities.log');

app.use(express.json());

// Store activity (append to file)
app.post('/activity', (req, res) => {
  const activity = {
    ...req.body,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  };
  fs.appendFile(ACTIVITY_LOG, JSON.stringify(activity) + "\n", err => {
    if (err) {
      console.error("Failed to write activity:", err);
      return res.status(500).send("fail");
    }
    res.send("ok");
  });
});

// (Optional) Get all activities
app.get('/activity', (req, res) => {
  fs.readFile(ACTIVITY_LOG, 'utf8', (err, data) => {
    if (err) return res.status(500).send("fail");
    // Each line is a JSON object
    const activities = data.split('\n').filter(Boolean).map(line => JSON.parse(line));
    res.json(activities);
  });
});

app.listen(PORT, () => {
  console.log(`Activity logging server running at http://localhost:${PORT}`);
});
