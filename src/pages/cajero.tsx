/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import { Layout } from "../layouts";
import Image from "next/image";
import { useSelector } from "react-redux";

import Link from "next/link";

export default function Cajero() {
  const { blockchain } = useSelector((state) => state);

  return (
    <div>
      <Layout title="Home Page">
      <div className="flex justify-center">
        {/*
        <div className="flex flex-col items-center">
          <div className="flex w-full justify-center mt-20 mb-32">
            <figure className="flex items-center">
              <Image
                src="/images/fidelizame.svg"
                alt="logo"
                width={32}
                height={25}
              />
            </figure>
            <div className="pl-5">
              <p className="font-bold text-xl">CAJERO: ADOLFO LLANOS</p>
              <p className="text-base">ID: {blockchain.accountCajero}</p>
            </div>
          </div>
           
          <figure className="flex justify-center">
            <Image
              src="/images/Portrait.png"
              width={210}
              height={241}
              alt="user"
            />
          </figure>
        </div>
        */}
        <div className="flex flex-col justify-center items-center pb-20 w-96">
        
          <p className="font-bold text-4xl mt-7 mb-12 text-neutral-800">Busca un cliente</p>
          <p className="text-base px-12 text-center mb-16 text-neutral-800">
            Escanea el QR del cliente para otorgarle puntos e informarle de sus
            recomenpensas
          </p>

          <figure className="flex justify-center mb-12">
            <Image
              src="/images/hand-holding-phone.svg"
              width={145}
              height={200}
              alt="user"
            />
          </figure>

          <Link
            href={"/qr"}
            className="flex items-center border-2 border-primary text-primary font-semibold p-2 rounded-md hover:text-gold hover:border-gold"
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
        </div>

        {/* <video ref={ref} />
        <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p> */}
      </div>
      </Layout>
      <footer></footer>
    </div>
  );
}
