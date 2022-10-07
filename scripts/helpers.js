function formatWeiToEth(wei) {
    return ethers.utils.formatEther(wei)
}

module.exports = { formatWeiToEth }
