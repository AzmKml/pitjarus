const initialState = {
  products: [],
  productsFilter: [],
  brands: [],
  brandsFilter: [],
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case "get percentage":
      return {
        ...state,
        products: action.payload,
      };
    case "get percentage filter":
      return {
        ...state,
        productsFilter: action.payload,
      };
    case "get percentage brand":
      return {
        ...state,
        brands: action.payload,
      };
    case "get percentage brand filter":
      return {
        ...state,
        brandsFilter: action.payload,
      };
    default:
      return state;
  }
}

export default productReducer;
