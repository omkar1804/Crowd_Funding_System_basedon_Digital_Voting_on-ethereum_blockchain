import web3 from "./web3";

const address = "0x74493cF9173aE51ceA0a463E2072a3e3EA4c4224";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minimum",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedContracts",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const factory = new web3.eth.Contract(abi, address);
export default factory;
