const { getNamedAccounts } = require("hardhat")
const { getWeth } = require("./getWeth")

async function main() {
    // the protocol treats everything as an ERC@) token
    await getWeth()
    const { deployer } = await getNamedAccounts()
    // Aave Lending Pool Address Provider = 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
