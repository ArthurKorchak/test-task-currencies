import { useState, useEffect } from 'react';
import { ExchangeForm } from 'components/ExchangeForm/ExchangeForm';
import { Header } from 'components/Header/Header';
import { getExchangeRates } from 'utils/functionsAPI';
import config from './config.json';

const actualCurrencies = config.actualCurrencies;
const baseCurrency = config.baseCurrency;

export const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getExchangeRates().then(resp => setData(resp));
  }, []);

  return (
    <>
      <Header
        actualCurrencies={actualCurrencies}
        baseCurrency={baseCurrency}
        data={data}
      />
      <main>
        <ExchangeForm />
      </main>
    </>
  );
};
