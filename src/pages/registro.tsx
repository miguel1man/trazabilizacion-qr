import { Layout } from "../layouts";
import Link from "next/link";

export default function Cajero() {
  return (
    <div>
      <Layout title="Home Page">
        <p>
          <span>Formulario de registro</span>
        </p>

        <Link href={"/cajero"} className="text-title">
          Conectar Wallet
        </Link>
      </Layout>
      <footer></footer>
    </div>
  );
}
