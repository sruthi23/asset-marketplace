// To configure new ERC721 assets
async displayBlueprint() {
    const cert = new Cert({
        schema: schema88
    })
    const asset = {
        description: 'A lighthouse watercolor picture',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Taran_Lighthouse_Kalinigrad_Oblast_Tatiana_Yagunova_Watercolor_painting.jpg',
        name: 'Lighthouse Watercolor'
    }
    // The imprint is the hashed proof for our asset
    console.log('Imprint', await cert.imprint(asset))
    console.log('Expose', await cert.expose(asset, [['name'], ['image']]))
}
