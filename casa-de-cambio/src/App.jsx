import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('BRL');
  const [coins, setCoins] = useState([]);
  console.log(coins);
  

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSearch = () => {
    const endPoint = search;

    const url = `https://api.exchangerate.host/latest?base=${endPoint}`;

    let rates;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        rates = data.rates
        const coinArr = Object.entries(rates);
        setCoins(coinArr);
      })
  }

  return (
    <div>
      <h1>
        Casa de <span className='cambio-title'>Câmbio</span>
      </h1>
      <div className='inputs-container'>
        <input
        placeholder="BRL"
        className="input"
        name="text"
        type="text"
        onChange={handleChange}
        />
        <button
        onClick={handleSearch}
        >
          SEARCH
        </button>
      </div>
      <h2>
        Valores Referentes a 1 {search}
      </h2>
    
      
        <div className='divizinha'>
          {
            coins.length > 0 ?
            coins.map((e, index) => (
              
                <li className='values-area' key={index}>
                 💲 {e[0]}  <span className='yellow-text'>{Number(e[1]).toFixed(2)}</span>
                </li>
              
            ))
            : <span>
              Sua Pesquisa
            </span>
          }
        </div>
      
    </div>
  )
}

export default App
