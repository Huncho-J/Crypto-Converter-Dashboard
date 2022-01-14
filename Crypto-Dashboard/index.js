const PORT = 8000
const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/', (req,res)=>{
  res.json('hi')
})

app.get('/converter', (req,res)=>{
  const to_currency= req.query.to_currency;
  const from_currency= req.query.from_currency;
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {from_currency: from_currency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: to_currency},
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  };

  axios.request(options).then(function (response) {
  	res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
  }).catch(function (error) {
  	console.error(error);
  });
})

app.get('/news', (req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://crypto-news-live3.p.rapidapi.com/news',
    headers: {
      'x-rapidapi-host': 'crypto-news-live3.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  };

  axios.request(options).then(function (response) {
  	res.json(response.data);
  }).catch(function (error) {
  	console.error(error);
  });
})

app.listen(PORT, ()=>console.log(`Serving is running on ${PORT}`))
