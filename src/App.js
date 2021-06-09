import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";

import Loader from "src/utils/Loader";
import BackgroundHOC from "src/hoc/BackgroundHOC";
import CurrenciesList from "./pages/Currencies_list";
import { initCurrencies } from "./store/reducers/currenciesSlice";
import { getCurrenciesData } from "./API/getCurrenciesData";

function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrenciesData().then((d) => {
      dispatch(initCurrencies(d));
      setLoaded(true);
    });
  }, []);

  return (
    <BackgroundHOC>
      <Box width="100vw" minHeight="100vh">
        {!loaded ? <Loader height="100vh" /> : <CurrenciesList />}
      </Box>
    </BackgroundHOC>
  );
}

export default App;
