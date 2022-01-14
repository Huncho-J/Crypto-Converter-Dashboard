import ExchangeRate from './ExchangeRate';
import {useState} from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const currencies =['BTC', 'ETH', 'USDC', 'XRP', 'ADA']
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate]= useState(0);
  const [result, setResult]= useState(0);


const convert = () =>{


  const options = {
    method: 'GET',
    url: 'http://localhost:8000/converter',
    params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency}
    };

  axios.request(options).then(function (response) {
  	console.log(response.data);
    setExchangeRate(response.data)
    setResult(response.data * amount)
  }).catch(function (error) {
  	console.error(error);
  });
  console.log(exchangeRate);
}

  return (
    <div className="currency-converter">
    <h2>CurrencyConverter</h2>
    <div className="input-box">
    <table>
      <tbody>
        <tr>
        <td>Primary Currency: </td>
        <td>
        <input type="number" name="currency-amount1" value = {amount}
        onChange={(e) => setAmount(e.target.value)}
         />
        </td>
        <td>
          <select  value={chosenPrimaryCurrency} name="currency-option1" className="currency-options"
          onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
          >
              {currencies.map(currency => (<option>{currency}</option>))}
          </select>
        </td>
        </tr>
        <tr>
        <td>Secondary Currency: </td>
        <td>
        <input type="number" name="currency-amount2" value ={result} disabled={true} />
        </td>
        <td>
          <select  value={chosenSecondaryCurrency} name="currency-option2" className="currency-options"
          onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
          >
            {currencies.map(currency => (<option>{currency}</option>))}
          </select>
        </td>
        </tr>
      </tbody>
    </table>
    <button id="convert-button" onClick={convert}>Convert</button>
    </div>
    <ExchangeRate
    exchangeRate ={exchangeRate}
     chosenPrimaryCurrency={chosenPrimaryCurrency}
     chosenSecondaryCurrency={chosenSecondaryCurrency}/>
    </div>
  );
}

export default CurrencyConverter;
