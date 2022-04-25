const express = require('express')
const axios = require("axios")
const app = express()

app.get('/', (req, res) => {
  res.send('Hello JDT!')
})

async function getCalories(food) {
  const options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: {query: food},
    headers: {
      'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
      'X-RapidAPI-Key': 'dfcaddd723msh6b216a6f6b60baep1fb122jsn29391c842471'
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
      .then(res => calories = res)
      .catch(err => console.log(err))
    
    // setTimeout for 1 second (1000 ms) so we wait for the result of the API request above
    setTimeout(() => {
      res.send(`${food} has ${calories} calories`)
    }, 1000)
    
  })

app.listen(3001, () => {
  console.log("App listening on port 3001")
})
