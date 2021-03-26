import React from "react";
import "./Exchange.css";

export default function Exchange(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
    exchangeText,
  } = props;

  return (
    <div className="exchange-container">
      <div className="exchange-coutry">
        <div className="selected-country">{exchangeText}</div>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="exchange-options">
        <input type="number" value={amount} onChange={onChangeAmount}></input>
      </div>
    </div>
  );
}
