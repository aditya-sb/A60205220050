const express = require('express');
const axios = require('axios');

const app = express();

// Create a GET route for the /numbers endpoint
app.get('/numbers', async (req, res) => {
    const urls = req.query.url; // Get the URL query parameter as an array

    if (!urls) {
      return res.status(400).json({ error: 'No URLs provided' });
    }
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      const mergedNumbers = [];

      responses.forEach(response => {
        const numbersArray = response.data.numbers;
        mergedNumbers.push(...numbersArray);
      });
  
      // Merge and sort the numbers array in ascending order
      const distinctSortedNumbers = Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);
  
      res.json({ numbers: distinctSortedNumbers });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

// Listen for requests on port 3000
app.listen(8008, () => {
  console.log('Server is running on port 3000');
});
