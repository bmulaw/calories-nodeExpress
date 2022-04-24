const express = require('express')
const axios = require("axios")
const app = express()
const port = 3000

async function getCaloriees(food) {

  const options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: {query: food},
    headers: {
      'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
      'X-RapidAPI-Key': 'dfcaddd723msh6b216a6f6b60baep1fb122jsn29391c842471'
    }
  };
  
  return new Promise ((resolve, reject) => {
    axios.request(options)
    .then(res => {
      let calories = res.data.items[0].calories;
      resolve(calories);
    })
    .catch(error => {
    console.error(error);
  });
})
}

app.get('/', (req, res) => {
  res.send('Hello JDT!')
})

app.get('/calories/:food', (req, res) => {
    let calories;
    const food = req.params.food;
    getCaloriees(food)
      .then(res => calories = res)
      .catch(err => console.log(err))
    
    setTimeout(() => {
      res.send(`${food} has ${calories} calories`)
    }, 1000)
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})