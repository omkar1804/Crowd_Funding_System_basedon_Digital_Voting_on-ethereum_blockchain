import web3 from "./web3";

const address = "0xFb534a3Cb12E0B9ad6A94F7fB721E135d0ae7fc4";

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
