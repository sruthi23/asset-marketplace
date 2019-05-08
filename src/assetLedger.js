// To create a new asset ledger containing several assets and managed by several individuals
// The asset ledger is mandatory to create new assets since they need a place to be stored, they can't exist without a ledger

async deployNewLedger() {
    let deployedLedger = {}

    // The required keys are name, symbol, uriBase and schemaId
    const recipe = {
        name: 'Art Piece',
        symbol: 'ART',
        uriBase: 'www.example.com/tokenMetadata/', // This is a demonstration, you have to setup a server for generating tokens to this URI
        schemaId: '0xa4cf0407b223849773430feaf0949827373c40feb3258d82dd605ed41c5e9a2c', // This is the ID from schema88 available at the top of the github https://github.com/0xcert/framework/blob/master/conventions/88-crypto-collectible-schema.md
        capabilities: [
            AssetLedgerCapability.DESTROY_ASSET,
            AssetLedgerCapability.UPDATE_ASSET,
            AssetLedgerCapability.TOGGLE_TRANSFERS,
            AssetLedgerCapability.REVOKE_ASSET
        ]
    }

    try {
        deployedLedger = await AssetLedger.deploy(this.state.provider, recipe).then(mutation => {
            console.log('Deploying new asset ledger, it may take a few minutes.')
            return mutation.complete()
        })
        console.log('Ledger', deployedLedger)
    } catch (e) {
        console.log('Error', e)
    }

    if (deployedLedger.isCompleted()) {
        console.log('Ledger address', deployedLedger.receiverId)
    }
}
