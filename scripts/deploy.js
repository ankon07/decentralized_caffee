const hre = require("hardhat");

async function main() {
    // Fetching the byte code and ABI
    const Chai = await hre.ethers.getContractFactory("chai");

    // Deploying an instance of our smart contract
    const chai = await Chai.deploy();

    // Waiting for the contract to be deployed
    // await chai.deployed();
    // Waiting for the contract to be deployed
    await chai.waitForDeployment();

    console.log("Deployed contract address:", await chai.getAddress());

    // console.log("Deployed contract address:", chai.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



    // contract address 0x6f1DC1612027A08b162a51273Da686a9B9e76eD9