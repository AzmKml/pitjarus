import "./App.css";
import { BarChart } from "./components/BarChart";

import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import {
  fetchPercentageArea,
  fetchPercentageAreaBrand,
} from "./store/action/product";
import { useDispatch } from "react-redux";
import { FilterData } from "./components/FilterData";
import { TableData } from "./components/TableData";

Chart.register(...registerables);

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPercentageArea())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    dispatch(fetchPercentageAreaBrand()).finally(() => {
      setLoading(false);
    });
  });
  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "auto",
              width: "auto",
              minWidth: "500px",
              flexDirection: "column",
              marginTop: "15px",
            }}
          >
            <FilterData />
            <BarChart />
            <TableData />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
