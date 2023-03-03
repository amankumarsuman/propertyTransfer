import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { useAddress } from "@thirdweb-dev/react";
import { BookDetails } from "./component/BookDetails";
export default function Home() {
  const address = useAddress();

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to{" "}
          <a style={{ textDecoration: "none" }} href="https://thirdweb.com/">
            Library Management
          </a>
          !
        </h1>

        <p className="description">
          {/* {address ? <div>No wallet connected</div> : { address }}; */}
          {address ? "You are Connected" : "Connect"}
          {/* <code className="code">src/index.js</code>, then modify the{" "}
          <code className="code">src/App.js</code> file! */}
        </p>

        <div className="connect">
          <ConnectWallet />
        </div>

        {/* <div className="grid">
          <a href="https://portal.thirdweb.com/" className="card">
            <h2>Book 1 Details &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className="card">
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a href="https://portal.thirdweb.com/templates" className="card">
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div> */}
        <BookDetails />
      </main>
    </div>
  );
}
