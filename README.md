# Buckyou Backend
The backend of Buckyou Campaign

## Spam
1. install package `yarn` or `npm install`
2. `cd spam/` and create `.env` and add config
```.env
# your recovery passphrase or privateKey (hex form)
PASSPHRASE="test test test test test test test test test test test junk"
PASSPHRASE=112233445566778899aabbccddeeff112233445566778899aabbccddeeff1122

# your referrer's address
REFERRER=0xc88ef07b9b8b2fc3b7daad9478f4e1337f01792e2eab9c3794494e610636026e

# custom RPC URL
RPC_URL="https://fullnode.mainnet.sui.io:443"

# your crew addresses
CREW="0xc88ef07b9b8b2fc3b7daad9478f4e1337f01792e2eab9c3794494e610636026e,0xc88ef07b9b8b2fc3b7daad9478f4e1337f01792e2eab9c3794494e610636026e"

# stop spamming when crew owned seats larger then threshold
THERSHOLD=20

# loop period (ex: 17 sec)
LOOP_PERIOD=17000

# show console log (1: true, 0: false)
LOG=0

```
3. run the script
```
ts-node spam.ts
```

