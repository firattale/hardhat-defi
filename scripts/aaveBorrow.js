const { getNamedAccounts } = require("hardhat")
const { getWeth } = require("./getWeth")

async function main() {
    // the protocol treats everything as an ERC@) token
    await getWeth()
    const { deployer } = await getNamedAccounts()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
