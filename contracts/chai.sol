// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract chai {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address form;
    }
    Memo[] memos;
    address payable  owner;
    constructor(){
        owner= payable(msg.sender);
    }
    function buyChai(string calldata name, string calldata message) external  payable {
        // require(msg.value>0,"Please pay atleat some ammount"); 
        
        // the value of getting ether can be changed by changing msg.value = something

        require(msg.value>0, "Please send some little ethers");
        owner.transfer(msg.value);
        memos.push(Memo(name,message,block.timestamp,msg.sender));
    }
    function getMemos() public view  returns(Memo[] memory){
        return memos;
    }
}
