import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      // const tokensContract = await store.getState().blockchain.smartContract.methods.TokensDisponibles().call();
      const tokensCajero = await store
        .getState()
        .blockchain.smartContract.SaldoGeneral(
          store.getState().blockchain.accountCajero
        ); //
      // const tokensUser = await store.getState().blockchain.smartContract.methods.balanceOf(store.getState().blockchain.accountUser).call();
      dispatch(
        fetchDataSuccess({
          tokensCajero,
          // tokensUser,
        })
      );
    } catch (err) {
      // console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
