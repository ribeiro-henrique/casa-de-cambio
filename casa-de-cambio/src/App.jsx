import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState([]);
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
        Casa de Câmbio
      </h1>
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
      <h2>
        Valores Referentes a 1 {search}
      </h2>
      <table>
        <tbody>
          {
            coins.length > 0 ?
            coins.map((e, index) => (
              <tr key={index}>
                <td>
                  {e[0]}
                  --
                  {e[1]}
                </td>
              </tr>
            ))
            : <span>
              Sua Pesquisa
            </span>
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
