/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore
import { useState } from "react";
import { Layout } from "../layouts";
import { useZxing } from "react-zxing";

import { useDispatch } from "react-redux";
import { saveUser } from "../redux/blockchain/blockchainActions";
import { useRouter } from "next/router";

export default function Cajero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [result, setResult] = useState(
    "Escaneando el código QR del cliente..."
  );
  const [isViewScan, setisViewScan] = useState(true);
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      setisViewScan(false);
      const splitEtherium = result.getText().split(":");
      const accountUser = splitEtherium[1].split("@");
      dispatch(saveUser(accountUser[0]));
      router.push("/cliente/user");
    },
  });

  return (
    <div className="bg-primary min-h-screen">
      <Layout title="Home Page">
        <div className="flex flex-col items-center bg-primary">
          {isViewScan && <video ref={ref} className="p-10" />}
        </div>
      </Layout>
    </div>
  );
}
