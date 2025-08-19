// 
const express = require('express');
const { createClient } = require('redis');

const app = express();

// Connect to the Redis service from docker-compose
const client = createClient({
  url: 'redis://redis:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Connect Redis before handling requests
(async () => {
  await client.connect();
})();

app.get('/', async (req, res) => {
  try {
    let visitsCounter = await client.get('visitsCounter');
    visitsCounter = visitsCounter ? parseInt(visitsCounter) : 0;

    await client.set('visitsCounter', visitsCounter + 1);
    res.send('visitsCounter: ' + (visitsCounter + 1));
  } catch (err) {
    res.send('Error: ' + err);
  }
});

app.listen(9090, () => {
  console.log('Listening to port 9090');
});