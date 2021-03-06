const argv = require('yargs').argv
const MongoClient = require('mongodb').MongoClient
const { keys } = require('../config')
const { utils, Wallet } = require('ethers')
const { getNetworkID, getMongoURI } = require('../utils/helpers')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password
const environment = argv.amp_environment
const network = argv.network

let mongoURI

console.log(mongoUrl)

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword, environment)
} else {
  mongoURI = mongoUrl
}

const networkID = getNetworkID(network)
const walletKeys = keys[networkID]
let client, db, documents, response

const seed = async () => {
  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    db = client.db('proofdex')
    documents = []

    walletKeys.forEach(key => {
      let walletRecord = {}
      wallet = new Wallet(key)

      walletRecord.privateKey = wallet.privateKey.slice(2)
      walletRecord.address = utils.getAddress(wallet.address)
      walletRecord.admin = true
      walletRecord.operator = true
      documents.push(walletRecord)
    })

    response = await db.collection('wallets').insertMany(documents)
  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

seed()