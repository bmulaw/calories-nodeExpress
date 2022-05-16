const axios = require("axios")
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello JDT!')
})

async function getCalories(food) {
  // copied code from RapidAPI here (till line 19)
  const options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: {query: food},
    headers: {
      'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
      'X-RapidAPI-Key': 'FAKE_API_KEY'
    }
  };
  
  // instead of returning the data itself, we return a promise with the data
  return new Promise ((resolve, reject) => {
    axios.request(options)
    .then(res => {
      let calories = res.data.items[0].calories;
      resolve(calories);
    })
    .catch(error => {
      reject(error)
  });
})
}

app.get('/calories/:food', (req, res) => {
    let calories;
    const food = req.params.food;
    getCalories(food)
      .then(data => calories = data)
      .catch(err => console.log(err))
    
    // setTimeout for 1.5 second (1500 ms) so we wait for the result of the API request above
    setTimeout(() => {
      res.send(`${food} has ${calories} calories`)
    }, 1500)
    
  })

app.listen(3001, () => {
  console.log("App listening on port 3001")
})
