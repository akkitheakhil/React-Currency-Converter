import React, { useEffect, useState } from "react";
import "./Converter.css";
import axios from "axios";
import Exchange from "./Exchange";
import Repeat from "./repeat.svg";
import { isEmpty } from "../util";
const BASE_API_URL = "https://api.exchangeratesapi.io/latest";

export default function Converter() {
  // React States
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // React UseEffect Hooks
  useEffect(() => {
    axios.get(BASE_API_URL).then((res) => {
      const data = res.data;
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
    });
  }, []);

  useEffect(() => {
    if (isEmpty(fromCurrency) || isEmpty(toCurrency)) return;
    axios
      .get(`${BASE_API_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then((res) => {
        setExchangeRate(res.data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleReverse() {
    if (isEmpty(fromCurrency) || isEmpty(toCurrency)) return;
    const from = fromCurrency;
    const to = toCurrency;
    setFromCurrency(to);
    setToCurrency(from);
  }

  return (
    <div className="converter">
      <h3>Currency Converter</h3>
      <Exchange
        exchangeText="FROM"
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />

      <div className="circle" onClick={handleReverse}>
        <img src={Repeat} alt="Repeat Logo" />
      </div>

      <Exchange
        exchangeText="TO"
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}
