const { getNamedAccounts, ethers } = require("hardhat")
const { getWeth, amount } = require("./getWeth")

async function main() {
    // the protocol treats everything as an ERC@) token
    await getWeth()
    const { deployer } = await getNamedAccounts()
    const lendingPool = await getLendingPool(deployer)
    console.log(`LendingPoll address ${lendingPool.address}`)

    // deposit
    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    // approve
    await approveErc20(wethTokenAddress, lendingPool.address, amount, deployer)
    console.log("Depositing...")
    await lendingPool.deposit(wethTokenAddress, amount, deployer, 0)
    console.log("Deposited!")

    // Borrow
}

async function getLendingPool(account) {
    const lendingPoolAddressProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account
    )
    // Aave Lending Pool Address Provider = 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)
    return lendingPool
}

async function approveErc20(erc20Address, spenderAddress, amountToSpend, account) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("Approved!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
