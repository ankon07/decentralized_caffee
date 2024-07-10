require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require('@nomiclabs/hardhat-waffle');

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork:"sepolia",
  networks: {
    hardhat:{},
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
