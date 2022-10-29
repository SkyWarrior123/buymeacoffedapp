// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

contract BuyMeACoffee {
    address payable owner;

    // event Memo
    event NewMemo (
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // struct Memo
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    } 

    //List of all memos recieved 
    Memo[] memo;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy coffee with 0 eth");

        memo.push(Memo (
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo (
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memo;
    }
}