geth \
--port 30303 \
--rinkeby
--maxpeers "0" \
--ws --wsport 8546 --wsaddr 0.0.0.0 \
--rpc --rpcport 8545 --rpcaddr 0.0.0.0 \
--wsorigins "*" \
--wsapi eth,net,web3,personal,admin \
--etherbase $AMP_RINKEBY_ETHERBASE \
--rpccorsdomain "*" \
--datadir /root/.ethereum