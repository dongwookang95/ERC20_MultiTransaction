//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CPToken is ERC20, Ownable {
    constructor() ERC20("CPToken", "CPT") {}

    function mint(uint256 _amount) public onlyOwner {
        _mint(owner(), _amount);
    }
}