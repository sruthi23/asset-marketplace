import React from "react";
import ReactDOM from "react-dom";
import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import { schema88 } from "@0xcert/conventions";
import { Cert } from "@0xcert/cert";
// Assets Ledgers are groups of tokens that are managed by certain users just like mods in a chat to do what's required
// The Capabilities determine what those mods can do with the assets they are managing
// The Ethereum address that deploys this ledger has full powers to do whatever he wants as the administrator
import {
  AssetLedger,
  AssetLedgerCapability
} from "@0xcert/ethereum-asset-ledger";
import "./index.css";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      provider: {},
      ledger: {},
      assets: []
    };
  }

  // Run your desired functions here
  async componentDidMount() {
    await this.setProvider();
    // await this.setExistingLedger()
    // await this.setAssetArray()
    // await this.getUserBalance()
    // await this.deployArtAsset()
    await this.deployNewLedger();
  }

  // To set a metamask provider
  async setProvider() {
    const provider = new MetamaskProvider();
    if (!(await provider.isEnabled())) await provider.enable();
    await this.setState({ provider });
  }

  // To create a new asset ledger containing several assets and managed by several individuals
  // The asset ledger is mandatory to create new assets since they need a place to be stored, they can't exist without a ledger
  async deployNewLedger() {
    let deployedLedger = {};

    // The required keys are name, symbol, uriBase and schemaId
    const recipe = {
      name: "Art Piece",
      symbol: "ART",
      uriBase: "www.example.com/tokenMetadata/", // This is a demonstration, you have to setup a server for generating tokens to this URI
      schemaId:
        "0xa4cf0407b223849773430feaf0949827373c40feb3258d82dd605ed41c5e9a2c", // This is the ID from schema88 available at the top of the github https://github.com/0xcert/framework/blob/master/conventions/88-crypto-collectible-schema.md
      capabilities: [
        AssetLedgerCapability.DESTROY_ASSET,
        AssetLedgerCapability.UPDATE_ASSET,
        AssetLedgerCapability.TOGGLE_TRANSFERS,
        AssetLedgerCapability.REVOKE_ASSET
      ]
    };

    try {
      deployedLedger = await AssetLedger.deploy(
        this.state.provider,
        recipe
      ).then(mutation => {
        console.log("Deploying new asset ledger, it may take a few minutes.");
        return mutation.complete();
      });
      console.log("Ledger", deployedLedger);
    } catch (e) {
      console.log("Error", e);
    }

    if (deployedLedger.isCompleted()) {
      console.log("Ledger address", deployedLedger.receiverId);
    }
  }

  render() {
    return (
      <div>
        <h1>ERC721 Art Marketplace</h1>
        <p>
          In this marketplace you can deploy unique ERC721 art pieces to the
          blockchain with 0xcert.
        </p>
        <div className="assets-container">{this.state.assets}</div>
        <button
          className="margin-right"
          onClick={() => {
            this.deployArtAsset();
          }}
        >
          Deploy Art Piece
        </button>
        <button
          onClick={() => {
            this.getArtAssets();
          }}
        >
          Get Art Pieces
        </button>
      </div>
    );
  }
}
