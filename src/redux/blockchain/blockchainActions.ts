/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore
import contratoNegocio from "../../abis/NegocioFidelizado.json";
import { fetchData } from "../data/dataActions";
import { ethers } from "ethers";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload: { account: any }) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload,
  };
};

const connectFailed = (payload: string) => {
  return {
    type: "CONNECTION_FAILED",
    payload,
  };
};
export const addUser = (payload: string) => {
  return {
    type: "SAVE_USER",
    payload,
  };
};
//conexion con metamask y la blockchain
export const connect = () => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    // return async (dispatch) => {
    try {
      if (window?.ethereum) {
        // running on client and window + ethereum is avail
        dispatch(connectRequest());

        const { ethereum } = window;

        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
          try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const accountCajero = await provider.send(
              "eth_requestAccounts",
              []
            );
            const networkId = await ethereum.request({
              method: "net_version",
            });
            const networkData = contratoNegocio.networks[networkId];
            if (networkData) {
              const abi = contratoNegocio.abi;
              const address = networkData.address;
              const greeterContractWithSigner = new ethers.Contract(
                address,
                abi,
                provider
              );
              const signer = provider.getSigner();
              const smartContract = greeterContractWithSigner.connect(signer);
              dispatch(
                connectSuccess({
                  accountCajero,
                  smartContract,
                })
              );

              // Add listeners start
              // ethereum.on("accountsChanged", (accounts) => {
              //   dispatch(updateAccount(accounts[0]));
              // });

              //get Valor
              dispatch(fetchData());

              // ethereum.on("chainChanged", () => {
              //   window.location.reload();
              // });
              // Add listeners end
            } else {
              dispatch(connectFailed("Change network to BSC."));
              // console.log("Change network to");
            }
          } catch (err) {
            dispatch(connectFailed("Something went wrong."));
            // console.log("Something went wrong");
          }
        } else {
          dispatch(connectFailed("Install Metamask."));
        }
      } else {
        // you are on the server.
        // OR user does not have a broswer wallet - i.e. metamask
      }
    } catch (error) {}

    // console.log( store.getState().blockchain.smartContract.methods)
  };
};
export const saveUser = (accountUser: string) => (dispatch) => {
  dispatch(addUser(accountUser));
};
