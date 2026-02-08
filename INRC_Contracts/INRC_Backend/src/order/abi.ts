export const ABI = [
    {
      "inputs": [],
      "name": "AmountExceedsBalance",
      "type": "error"
    },
    {
      "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "name": "Blacklisted",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ContractPaused",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "DeadlinePassed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "DecreasedAllowanceBelowZero",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EtherTransferFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidSender",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidSigner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MintingNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PayloadSizeMismatched",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "name": "BurnOnTransfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "address", "name": "", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "name": "BurnOnWithdrawal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "EIP712DomainChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "_recepient", "type": "address" },
        { "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "issued",
      "type": "event"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_from", "type": "address" },
        { "internalType": "address", "name": "_to", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "BURN_ON_TRANSFER",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "BURN_ON_WITHDRAWAL",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_recepient", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "INRC_ISSUE",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_recepient", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "INRC_TRANSFER",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_from", "type": "address" },
        { "internalType": "address", "name": "_to", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "INRC_TRANSFER_FROM",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "spender", "type": "address" }
      ],
      "name": "allowance",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "name": "balanceOf",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "balances",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "basisPointsRate",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "blacklist",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_blacklistAddress", "type": "address" }
      ],
      "name": "blacklistUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" }
      ],
      "name": "checkBlacklist",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" },
        { "internalType": "uint256", "name": "deadline", "type": "uint256" },
        { "internalType": "uint8", "name": "v", "type": "uint8" },
        { "internalType": "bytes32", "name": "r", "type": "bytes32" },
        { "internalType": "bytes32", "name": "s", "type": "bytes32" }
      ],
      "name": "checkSpendAuthorization",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_owner", "type": "address" },
        { "internalType": "address", "name": "_receiver", "type": "address" },
        { "internalType": "uint256", "name": "_value", "type": "uint256" },
        { "internalType": "uint256", "name": "_deadline", "type": "uint256" },
        { "internalType": "uint8", "name": "v", "type": "uint8" },
        { "internalType": "bytes32", "name": "r", "type": "bytes32" },
        { "internalType": "bytes32", "name": "s", "type": "bytes32" }
      ],
      "name": "checkTransferAuthorization",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "configureMinter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currency",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }
      ],
      "name": "decreaseAllowance",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "decreaseMintingAllowance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "eip712Domain",
      "outputs": [
        { "internalType": "bytes1", "name": "fields", "type": "bytes1" },
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "string", "name": "version", "type": "string" },
        { "internalType": "uint256", "name": "chainId", "type": "uint256" },
        { "internalType": "address", "name": "verifyingContract", "type": "address" },
        { "internalType": "bytes32", "name": "salt", "type": "bytes32" },
        { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" },
        { "internalType": "bool", "name": "_exclude", "type": "bool" }
      ],
      "name": "excludeFromFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeCollector",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
      ],
      "name": "increaseAllowance",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" }
      ],
      "name": "increaseMintingAllowance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_feeCollector", "type": "address" }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "isExcludedFromFee",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" }
      ],
      "name": "isMinter",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isPaused",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "masterMinter",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maximumFee",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "name": "minterAllowance",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "nonces",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_owner", "type": "address" },
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" },
        { "internalType": "uint256", "name": "deadline", "type": "uint256" },
        { "internalType": "uint8", "name": "v", "type": "uint8" },
        { "internalType": "bytes32", "name": "r", "type": "bytes32" },
        { "internalType": "bytes32", "name": "s", "type": "bytes32" }
      ],
      "name": "permit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_owner", "type": "address" },
        { "internalType": "address", "name": "_sender", "type": "address" },
        { "internalType": "address", "name": "_receiver", "type": "address" },
        { "internalType": "uint256", "name": "_value", "type": "uint256" },
        { "internalType": "uint256", "name": "_deadline", "type": "uint256" },
        { "internalType": "uint8", "name": "v", "type": "uint8" },
        { "internalType": "bytes32", "name": "r", "type": "bytes32" },
        { "internalType": "bytes32", "name": "s", "type": "bytes32" }
      ],
      "name": "transferWithAuthorization",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "_setBaseFee", "type": "uint256" },
        { "internalType": "uint256", "name": "_newMaxFee", "type": "uint256" }
      ],
      "name": "updateFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_address", "type": "address" }
      ],
      "name": "updateMasterMinter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "version",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  