import React, { useState, useEffect, useContext } from "react";

import {API_KEY} from "../AppConfig";
import StoreContext from "../Context/Store";

const CONV_URL = `https://api.currencyapi.com/v3/latest?apikey=`;

const millisecInADay = 86400000;

const currencies = [
  { label: "USD", value: 0 },
  { label: "EUR", value: 1 },
  { label: "GBP", value: 2 },
  { label: "RON", value: 3 },
];

const getCurrencyURL = (value, baseCurrency, targetCurrency) => {
  const URL = `${
    CONV_URL + API_KEY
  }&value=${value}&base_currency=${baseCurrency}&currencies=${targetCurrency}`;
  return URL;
};

const getShortSymbol = (currencyLabel) => {
  switch (currencyLabel) {
    case "EUR": {
      return "€";
    }
    case "USD": {
      return "$";
    }
    case "GBP": {
      return "₤";
    }
    case "RON": {
      return "L";
    }
    default:
      return "";
  }
};

const MoneyConverse = () => {
  const { store, dispatch } = useContext(StoreContext);
  const { currencyValue, availableCurrencies } = store;

  const checkCurrencyDate = (millis) => {
    if (millis == null) return false;
    const now = new Date().getTime();
    return (now - millisecInADay) / millis < 24;
  };

  const updateCurrenciesFromAPI = () => {
    fetch(
      getCurrencyURL(
        1,
        "USD",
        `${currencies[0].label},${currencies[1].label},${currencies[2].label},${currencies[3].label}`
      )
    )
      .then((res) => res.json())
      .then((result) => {
        const tempCurrencies = Object.keys(result.data).map((key) => {
          return {
            ratio: result.data[key].value,
            label: result.data[key].code,
            shortSymbol: getShortSymbol(result.data[key].code),
            createdAt: new Date().getTime(),
          };
        });
        updateAvailableCurrencies(tempCurrencies);
        saveCurrenciesToStorage(tempCurrencies);
        const newCurrency = tempCurrencies.find(
          (curr) => currencies[currencyValue].label === curr.label
        );
        if (newCurrency != null) {
          updateCurrencyData(newCurrency);
        }
      });
  };

  const saveCurrenciesToStorage = (curr) => {
    localStorage.setItem("availableCurrencies", JSON.stringify(curr));
  };

  const loadCurrenciesFromStorage = () => {
    return JSON.parse(localStorage.getItem("availableCurrencies"));
  };

  const findInCurrencyArray = (label, arr) => {
    return arr.find((currency) => currency.label === label);
  };

  const updateAvailableCurrencies = (arr) => {
    dispatch({ type: "SET_AVAILABLE_CURRENCIES", data: arr });
  };

  const updateCurrencyData = (data) => {
    dispatch({ type: "UPDATE_CURRENCY_DATA", data });
  };

  useEffect(() => {
    const currenciesFromStorage = loadCurrenciesFromStorage() || [];
    if (currencies[currencyValue].label === "USD") {
      dispatch({ type: "UPDATE_CURRENCY_DATA", data: availableCurrencies.find( ac => ac.label === currencies[currencyValue].label)});
    } else {
      let result;
      let isValid = false;
      if (availableCurrencies.length > 0) {
        result = findInCurrencyArray(
          currencies[currencyValue].label, availableCurrencies
        );  
        isValid = (result != null) && checkCurrencyDate(result.createdAt);
      }
      if (!isValid) {
        result = findInCurrencyArray(
          currencies[currencyValue].label, currenciesFromStorage
        ); 
        isValid = (result != null) && checkCurrencyDate(result.createdAt);
      }
      if (!isValid) {
        updateCurrenciesFromAPI();
      } else {
        updateCurrencyData(result);
        updateAvailableCurrencies(availableCurrencies);
      }
    }
  }, [currencyValue]);

  const currencyChangeHandler = (e) => {
    dispatch({ type: "CHANGE_CURRENCY_VALUE", value: +e.target.value });
  };

  return (
    <div>
      <label>Choose currency: {currencies[currencyValue].label}</label>

      <select
        value={currencyValue}
        onChange={currencyChangeHandler}
        name="currencies"
        id="currencies"
      >
        {currencies.map((currency, i) => (
          <option key={i} value={i}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoneyConverse;
