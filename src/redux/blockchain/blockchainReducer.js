const initialState = {
  loading: false,
  // web3: null,
  accountCajero: "",
  accountUser: "",
  smartContract: null,
  // owner:'',
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        accountCajero: action.payload.accountCajero[0],
        smartContract: action.payload.smartContract,
        // web3: action.payload.web3,
        // owner: action.payload.owner,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "SAVE_USER":
      return {
        ...state,
        loading: false,
        accountUser: action.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
