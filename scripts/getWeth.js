const { getNamedAccounts, ethers } = require("hardhat")
const { formatWeiToEth } = require("./helpers")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    // Weth Gorli 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6
    // Weth Mainnet 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        deployer
    )
    const tx = await iWeth.deposit({ value: AMOUNT })
    tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${formatWeiToEth(wethBalance)} WETH`)
}

module.exports = { getWeth, amount: AMOUNT }
