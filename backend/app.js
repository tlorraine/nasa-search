const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;

app.get('/images/search', async (req, res) => {
  let paramsConfig = {};
  const q = req.query.q;
  if (q) {
    paramsConfig.q = q;
  }
  const page = req.query.page;
  if (page) {
    paramsConfig.page = page;
  } else {
    paramsConfig.page = 1;
  }
  try {
    const response = await axios.get(`https://images-api.nasa.gov/search`, {
      params: paramsConfig
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get('/images/nasa-details/:id', async (req, res) => {
  try {
    const nasaId = req.params.id;
    const response = await axios.get(`https://images-api.nasa.gov/search?nasa_id=${nasaId}`);
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
