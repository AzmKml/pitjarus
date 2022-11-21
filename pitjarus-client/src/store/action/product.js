import axios from "axios";

export const getPercentage = function (payload) {
  console.log(payload, "payloadd");
  return {
    type: "get percentage",
    payload,
  };
};

export const getPercentageBrand = function (payload) {
  console.log(payload, "payloadd");
  return {
    type: "get percentage brand",
    payload,
  };
};

export const getPercentageFilter = function (payload) {
  return {
    type: "get percentage filter",
    payload,
  };
};

export const getPercentageBrandFilter = function (payload) {
  return {
    type: "get percentage brand filter",
    payload,
  };
};

export const fetchPercentageArea = () => {
  return async (dispatch) => {
    return axios.get("http://localhost:3000/products").then(({ data }) => {
      dispatch(getPercentage(data));
      console.log(data, "actionnnn");
    });
  };
};

export const getFilter = (dataFilter) => {
  return async (dispatch) => {
    return axios
      .get("http://localhost:3000/products", {
        params: dataFilter,
      })
      .then(({ data }) => {
        dispatch(getPercentageFilter(data));
      });
  };
};

export const fetchPercentageAreaBrand = () => {
  return async (dispatch) => {
    return axios
      .get("http://localhost:3000/products/brands")
      .then(({ data }) => {
        dispatch(getPercentageBrand(data));
        console.log(data, "actionnnn");
      });
  };
};

export const getFilterBrand = (dataFilter) => {
  return async (dispatch) => {
    return axios
      .get("http://localhost:3000/products/brands", {
        params: dataFilter,
      })
      .then(({ data }) => {
        dispatch(getPercentageBrand(data));
      });
  };
};
