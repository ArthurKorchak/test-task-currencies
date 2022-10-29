import { useState, useEffect } from 'react';
import s from './ExchangeForm.module.css';

export const ExchangeForm = ({ actualCurrencies, baseCurrency, data }) => {
  const [firstSelect, setFirstSelect] = useState(baseCurrency);
  const [secondSelect, setSecondSelect] = useState(actualCurrencies[0]);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [isJump, setIsJump] = useState(false);

  const calculateCurrencies = (value, target) => {
    const firstCurrency = data.find(elem => elem.ccy === firstSelect);
    const secondCurrency = data.find(elem => elem.ccy === secondSelect);

    if (target === 'first') {
      const crossRange =
        (secondCurrency?.sale ? secondCurrency.sale : 1) /
        (firstCurrency?.buy ? firstCurrency.buy : 1);
      setFirstValue(Math.round(value * crossRange * 100) / 100);
    } else if (target === 'second') {
      const crossRange =
        (firstCurrency?.buy ? firstCurrency.buy : 1) /
        (secondCurrency?.sale ? secondCurrency.sale : 1);
      setSecondValue(Math.round(value * crossRange * 100) / 100);
    }
  };

  useEffect(() => {
    if (trigger) {
      setTrigger(false);
      calculateCurrencies(firstValue, 'second');
      setIsJump(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstValue, secondSelect]);

  useEffect(() => {
    if (trigger && !isJump) {
      setTrigger(false);
      calculateCurrencies(secondValue, 'first');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondValue, firstSelect]);

  const handleSelect = ({ target }) => {
    setTrigger(true);
    if (target.name === 'select1') {
      if (secondSelect === target.value) {
        const a = firstSelect;
        setIsJump(true);
        setFirstSelect(secondSelect);
        setSecondSelect(a);
      } else {
        setFirstSelect(target.value);
      }
    } else if (target.name === 'select2') {
      if (firstSelect === target.value) {
        const a = firstSelect;
        setIsJump(true);
        setFirstSelect(secondSelect);
        setSecondSelect(a);
      } else {
        setSecondSelect(target.value);
      }
    }
  };

  const handleInput = ({ target }) => {
    setTrigger(true);
    if (target.id === 'input1') {
      setFirstValue(target.value);
    } else if (target.id === 'input2') {
      setSecondValue(target.value);
    }
  };

  return (
    <div>
      <form>
        <div className={s.halfOfForm}>
          <p className={s.title}>From</p>
          <div className={s.inputWrapper}>
            <select name="select1" onChange={handleSelect} value={firstSelect}>
              <option value={baseCurrency}>{baseCurrency}</option>
              {actualCurrencies.map(currency => {
                return (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              id="input1"
              placeholder="0"
              value={firstValue}
              onChange={handleInput}
            />
          </div>
        </div>
        <p className={s.arrowBox}>
          <span className={s.arrow}>➤</span>
        </p>
        <div className={s.halfOfForm}>
          <p className={s.title}>To</p>
          <div>
            <select name="select2" onChange={handleSelect} value={secondSelect}>
              <option value={baseCurrency}>{baseCurrency}</option>
              {actualCurrencies.map(currency => {
                return (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              id="input2"
              placeholder="0"
              value={secondValue}
              onChange={handleInput}
            />
          </div>
        </div>
        <a href="https://privatbank.ua/map" target="_blank" rel="noreferrer">
          Where to buy
        </a>
      </form>
    </div>
  );
};
