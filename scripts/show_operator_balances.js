const fs = require('fs')
const path = require('path');
const argv = require('yargs').argv
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('../utils/abis')
const { operatorAddresses } = require('../config')
const { getNetworkID, getPrivateKeyFromEnvironment } = require('../utils/helpers')

const network = argv.network
if (!network) throw new Error('Usage: node show_operator_balances.js {network}')

const pk = getPrivateKeyFromEnvironment(network)
const networkID = getNetworkID(network)
const provider = new providers.InfuraProvider(network)
const operators = operatorAddresses[networkID]

const show = async () => {
  for (let operator of operators) {
    let balance = await provider.getBalance(operator)
    console.log(`${operator}: ${utils.formatEther(balance)} ETH`)
  }
}

console.log('\n')

show()