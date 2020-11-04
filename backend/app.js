const express = require('express');
const app = express();
const port = 8000;
const axios = require('axios').default;

app.get('/search', async (req, res) => {
  try {
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${q}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}!`);
});

module.exports = app;
