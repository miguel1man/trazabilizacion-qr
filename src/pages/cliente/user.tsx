/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import QRCode from "react-qr-code";
import { Layout } from "../../layouts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import Link from "next/link";

const User: NextPage = () => {
  const [tabActive, setTabActive] = useState("grant");
  const [cantidad] = useState(120);
  const [tabActiveClient, settabActiveClient] = useState("exchange");
  const { blockchain, data } = useSelector((state) => state);
  const [isLoading, setisLoading] = useState(false);
  const [successTransaction, setSuccessTransaction] = useState(false);
  const onClickViewQr = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <div className="flex justify-center pt-10">
          <QRCode value={blockchain.accountCajero} width={40} height={40} />
        </div>
      ),
      confirmButtonColor: "#43CBC3",
    });
  };
  //-----------------------------------Boton Tx----------------------------------------

  //Boton TRANSFERENCIA
  const handleButtonTx = async () => {
    try {
      setSuccessTransaction(false);
      setisLoading(true);
      const accountUser = blockchain.accountUser;

      const TxTokes = await blockchain.smartContract.transferTokens(
        accountUser,
        cantidad
      );
      if (TxTokes) {
        setisLoading(false);
        setSuccessTransaction(true);
      }
    } catch (error) {
      setisLoading(false);
      console.log(
        "🚀 ~ file: user.tsx ~ line 51 ~ handleButtonTx ~ error",
        error
      );
    }
    // await TxTokes;

    // dispatch(fetchData());
  };

  return (
    <Layout title="Home Page">
      <div className="flex flex-col items-center ">
        <div className="flex w-full justify-center my-7">
          <div>
            <p className="text-left font-bold text-xl text-neutral-800">
              CAJERO: ADOLFO LLANOS
            </p>
            <p className="text-xs text-center text-neutral-800">
              ID: {blockchain.accountCajero}
            </p>
          </div>
        </div>
        <Link
          href={"/qr"}
          className="flex items-center border-2 border-primary text-primary font-semibold p-2 rounded-md hover:text-neutral-800 hover:border-neutral-800"
        >
          <figure className="pr-2">
            <Image
              src="/images/ion_qr-code-sharp.svg"
              width={18}
              height={18}
              alt="qr icon"
            />
          </figure>
          Escanear Cliente
        </Link>
        <div className="w-96 flex justify-center pt-5 mt-5">
          <div
            className={`mx-2 px-2 py-3 text-md text-center border-b-2 border-neutral-800 text-neutral-800 font-medium ${
              tabActive === "grant" ? "text-primary border-[#43CBC3]" : ""
            }`}
            onClick={() => setTabActive("grant")}
          >
            OTORGAR PUNTOS
          </div>
          <div
            className={`mx-2 px-2 py-3 text-md text-center border-b-2 border-neutral-800 text-neutral-800 font-medium ${
              tabActive === "reward" ? "text-primary border-[#43CBC3]" : ""
            }`}
            onClick={() => setTabActive("reward")}
          >
            RECOMPENSAS CLIENTE
          </div>
        </div>
        {tabActive === "grant" && (
          <div className="w-11/12">
            <div className="flex flex-col items-center pt-11 pb-6 rounded-3xl mt-10 mb-12 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <figure className="pl-4">
                <Image
                  src="/images/Bronze-CertCard.png"
                  width={80}
                  height={80}
                  alt="medalla"
                />
              </figure>
              <h2 className="text-2xl font-bold">Gustavo Medrano</h2>
              <p className="text-sm font-normal">
                ID: {blockchain.accountUser}
              </p>
              <p className="text-gold rounded-xl bg-gold/10 px-4 py-2 mt-3 font-semibold ">
                Cliente Oro
              </p>
              <p className="font-bold text-base mt-4">Fecha de alta</p>
              <p className="font-normal text-sm">10 Mayo 2022</p>
              <div className="h-px w-72 bg-black/10 mt-10 mb-10" />
              <p className="font-bold text-xl mb-4">
                Puntos disponibles a distribuir
              </p>
              <div className="flex items-center ">
                <figure>
                  <Image
                    src="/images/Medals-gold.svg"
                    width={70}
                    height={70}
                    alt="point"
                  />
                </figure>
                <p className="font-semibold text-lg pb-5">
                  {parseInt(Number(data.tokensCajero)) / 100} Pts
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center pt-11 pb-5 rounded-3xl mt-10 mb-20 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <div>
                <p className="text-center text-xl font-bold">
                  Compra de hoy 29/10/22
                </p>
                <div className="flex mt-5 w-96 justify-around">
                  <div className="flex">
                    <figure>
                      <Image
                        src="/images/Medals-gold.svg"
                        width={70}
                        height={70}
                        alt="point"
                      />
                    </figure>
                    <div>
                      <p className="font-semibold text-lg">120 Soles</p>
                      <p className="font-normal text-sm text-black/50">
                        120 Puntos
                      </p>
                    </div>
                  </div>
                  <button
                    className={`flex items-center hover:bg-gold ${
                      !isLoading
                        ? " bg-primary text-white"
                        : "bg-gray-400 text-black"
                    } font-semibold px-3 rounded-md h-10 mt-1`}
                    disabled={isLoading}
                    onClick={handleButtonTx}
                  >
                    Otorgar Puntos
                  </button>
                </div>
                {isLoading && (
                  <div className="m-5 flex flex-col items-center">
                    <RotatingLines
                      strokeColor="Teal"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="96"
                      visible={true}
                    />
                  </div>
                )}
                {successTransaction && (
                  <div className="flex flex-col items-center">
                    <figure>
                      <Image
                        src="/images/sending-message.svg"
                        width={150}
                        height={126}
                        alt="icon loading"
                      />
                    </figure>
                    <p className="text-base font-semibold text-center">
                      !Enhorabuena!
                    </p>
                    <p className="px-10 pt-3 pb-10 text-center">
                      Fueron otorgados <b>120 puntos</b> a la billetera de
                      Gustavo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {tabActive === "reward" && (
          <>
            <div className="w-11/12">
              <div className="flex flex-col items-center pt-11 pb-10 rounded-3xl mt-10 mb-12 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <figure className="pl-4">
                  <Image
                    src="/images/Bronze-CertCard.png"
                    width={80}
                    height={80}
                    alt="medalla"
                  />
                </figure>
                <h2 className="text-2xl font-bold">Gustavo Medrano</h2>
                <p className="text-sm font-normal text-center">
                  ID: {blockchain.accountUser}
                </p>
                <p className="text-gold rounded-xl bg-gold/10 px-4 py-2 mt-3 font-semibold ">
                  Cliente Oro
                </p>
                <p className="font-bold text-base mt-4">Fecha de alta</p>
                <p className="font-normal text-sm">10 Mayo 2022</p>
              </div>
              <div className="flex flex-col items-center pt-11 pb-10 rounded-3xl mt-10 mb-12 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <div className="w-full flex justify-center pt-5">
                  <div
                    className={`mx-2 px-2 py-3 text-md border-b-2 border-neutral-800 text-neutral-800 font-medium ${
                      tabActiveClient === "exchange"
                        ? "text-primary border-[#43CBC3]"
                        : ""
                    }`}
                    onClick={() => settabActiveClient("exchange")}
                  >
                    CANJEAR PUNTOS
                  </div>
                  <div
                    className={`mx-2 px-2 py-3 text-md border-b-2 border-neutral-800 text-neutral-800 font-medium ${
                      tabActiveClient === "promotion"
                        ? "text-primary border-[#43CBC3]"
                        : ""
                    }`}
                    onClick={() => settabActiveClient("promotion")}
                  >
                    PROMOCIONES
                  </div>
                </div>
                {tabActiveClient === "exchange" && (
                  <div className="flex flex-col items-center font-bold text-lg mt-10">
                    <p className="px-14 text-center">
                      Canjeo de la compra del cliente en puntos
                    </p>
                    <div className="h-px w-72 bg-black/10 mt-10" />
                    <ul className="w-80">
                      <li className="flex  justify-between">
                        <div className="flex">
                          <figure>
                            <Image
                              src={"/images/Medals-gold.svg"}
                              width={60}
                              height={60}
                              alt="icon point"
                            />
                          </figure>
                          <div>
                            <p className="font-semibold">Aceite primor</p>
                            <p className="font-normal text-xs">S/12.00</p>
                          </div>
                        </div>
                        <p>12 ptos</p>
                      </li>
                      <li className="flex justify-between">
                        <div className="flex">
                          <figure>
                            <Image
                              src={"/images/Medals-gold.svg"}
                              width={60}
                              height={60}
                              alt="icon point"
                            />
                          </figure>
                          <div>
                            <p className="font-semibold">Paneton Donofrio</p>
                            <p className="font-normal text-xs">S/36.00</p>
                          </div>
                        </div>
                        <p>36 ptos</p>
                      </li>
                      <li className="flex justify-between">
                        <div className="flex">
                          <figure>
                            <Image
                              src={"/images/Medals-gold.svg"}
                              width={60}
                              height={60}
                              alt="icon point"
                            />
                          </figure>
                          <div>
                            <p className="font-semibold">Mancuerna</p>
                            <p className="font-normal text-xs">S/56.00</p>
                          </div>
                        </div>
                        <p>56 ptos</p>
                      </li>
                    </ul>

                    <div className="flex justify-between w-10/12 bg-black/10 px-4 py-4  rounded-3xl">
                      <div>
                        <p className="font-semibold text-normal">
                          Canjealo por
                        </p>
                        <p className="font-normal text-sm text-black/60">
                          Corresponde a s/104.00
                        </p>
                      </div>
                      <p className="font-semibold text-normal">104 Ptos</p>
                    </div>
                    <button
                      className="flex items-center bg-primary text-white font-semibold px-7 py-3 rounded-md my-10 hover:bg-gold"
                      onClick={onClickViewQr}
                    >
                      Canjear puntos
                    </button>
                  </div>
                )}
                {tabActiveClient === "promotion" && (
                  <div className="flex flex-col items-center font-bold text-lg mt-10">
                    <p className="px-14 text-center text-2xl">
                      Promociones vigentes
                    </p>
                    <p className="font-normal text-center text-sm px-16 mt-5 mb-10">
                      <b>Gustavo</b> por ser cliente Oro, llévate este pack
                      canjeandolo con <b>500 Ptos</b>
                    </p>
                    <div>
                      <Image
                        src={"/images/promocion-1.jpg"}
                        width={226}
                        height={240}
                        alt="icon point"
                        className="border-2 border-neutral-400 rounded-xl p-2"
                      />
                    </div>
                    <p className="font-normal text-center text-sm px-16 mt-5 mb-10">
                      Válido hasta el 12/12/22 <br></br> o hasta agotar stock
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default User;
