import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  fetchPercentageArea,
  getFilter,
  getFilterBrand,
} from "../store/action/product";

export const FilterData = () => {
  const dispatch = useDispatch();
  const { products, productsFilter } = useSelector((state) => state.products);

  let options = products.map((el) => {
    return { value: el.area_name, label: el.area_name };
  });
  const [filterData, setFilterData] = useState({
    dateTo: "",
    dateFrom: "",
    area: [],
  });
  const changeFilter = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };
  const changeArea = (e) => {
    setFilterData({
      ...filterData,
      area: e.map((el) => el.value),
    });
  };

  const filterSubmit = (e) => {
    e.preventDefault();
    options = products.map((el) => {
      return { value: el.area_name, label: el.area_name };
    });
    dispatch(getFilter(filterData));
    dispatch(getFilterBrand(filterData));
  };

  useEffect(() => {
    dispatch(fetchPercentageArea()).finally(() => {
      options = products.map((el) => {
        return { value: el.area_name, label: el.area_name };
      });
    });
  }, [productsFilter]);

  return (
    <>
      <form style={{ alignSelf: "center" }} onSubmit={filterSubmit}>
        <div
          style={{
            gap: "10px",
            display: "flex",
            alignItems: "center",
            width: "900px",
            justifyContent: "center",
          }}
        >
          <label htmlFor="dateFrom">Area:</label>
          <Select
            options={options}
            isMulti
            name="area"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(choice) => changeArea(choice)}
          />

          <label htmlFor="dateFrom">Date From:</label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={filterData.dateFrom}
            onChange={changeFilter}
          ></input>
          <label htmlFor="dateTo">Date To:</label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={filterData.dateTo}
            onChange={changeFilter}
          ></input>
          <button id="filter" type="submit">
            View
          </button>
        </div>
      </form>
    </>
  );
};
