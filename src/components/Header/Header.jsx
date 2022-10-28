import s from './Header.module.css';

export const Header = ({ actualCurrencies, baseCurrency, data }) => {
  return (
    <header>
      <p>
        Turbo<span>Exchange</span> <span>🤑</span>
      </p>
      {data.map(({ ccy, base_ccy, buy, sale }) => {
        if (actualCurrencies.includes(ccy) && baseCurrency === base_ccy) {
          return (
            <div className={s.currency} key={ccy}>
              <p>
                {ccy}/{baseCurrency}
              </p>
              <div>
                <p>Buy: {Number(buy).toFixed(2)}</p>
                <p>Sale: {Number(sale).toFixed(2)}</p>
              </div>
            </div>
          );
        } else return null;
      })}
    </header>
  );
};
