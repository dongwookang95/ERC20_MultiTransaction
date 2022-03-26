pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CPToken is ERC20, Ownable {
    constructor() ERC20("CPToken", "CPT") {
        _mint(msg.sender, 10000 ether);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        return _mint(account, amount);
    }


    
}