import s from './Header.module.css';

export const Header = ({ actualCurrencies, baseCurrency, data }) => {
  return (
    <header>
      <p className={s.logo}>
        Turbo<span className={s.logoPartTwo}>Exchange</span> <span>🤑</span>
      </p>
      <div className={s.currenciesBox}>
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
      </div>
    </header>
  );
};
