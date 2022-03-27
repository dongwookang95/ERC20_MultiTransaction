//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// error OverFlow (uint _val1, uint _val2);
// error UnderFlow (uint _val1, uint _val2, uint _val3);

// contract ERC20Basic {
//     uint public totalSupply;
//     // function balanceOf(address who) public constant returns(uint);
//     function transfer(address to, uint value) public;
//     event Transfer(address indexed from, address indexed to, uint value);

// }

contract CPToken is ERC20, Ownable{
    // mapping(address =>uint) balances;
    // mapping(address => mapping(address =>uint)) allowed;
    // function transferFrom(address from, address to, uint value) public;

    // event Transfer(address indexed from, address indexed to, uint value);

    constructor() ERC20("CPToken", "CPT") {
        _mint(msg.sender, 10000 ether);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        return _mint(account, amount);
    }
    // function transferFrom(address _from, address _to, uint _value) public {
    //     balances[_to] = balances[_to].add(_value);
    //     balances[_from] = balances[_from].sub(_value);
    //     allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    //     Transfer(_from, _to, _value);
    // }
    // // function balanceOf(address _owner) public constant returns(uint balance) {
    //     return balances[_owner];
    // }
}