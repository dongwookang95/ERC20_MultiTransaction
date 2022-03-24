//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract CPToken is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    uint256 public supply;

    mapping(address=>uint) public balances;
    mapping(address=>mapping(address=>uint)) public allowed;

    function initialize(string memory name, string memory symbol) public virtual initializer {
        __Ownable_init_unchained();
        __ERC20_init(name, symbol);
    }
    

    // It returns the total number of tokens
    function totalSupply() public override view returns(uint256){
        return supply;
    } 

    // It returns how many tokens does this person have
    function balanceOf(address tokenOwner) public override view returns(uint){
        return balances[tokenOwner];
    } 

    //It helps in transferring from your account to another person
    function transfer(address receiver, uint numTokens) public override returns(bool){
        require(balances[msg.sender]>=numTokens,"Not enough token");
        balances[msg.sender]-=numTokens;
        balances[receiver]+=numTokens;
        emit Transfer(msg.sender,receiver,numTokens);
        return true;
    } 

    function mint(address account,uint256 _amount) public onlyOwner {
        _mint(account, _amount);
    }

    //Used to delegate authority to send tokens without token owner
    function approve(address delegate,uint numTokens) public override onlyOwner returns(bool){
        allowed[msg.sender][delegate]=numTokens;
        emit Approval(msg.sender,delegate,numTokens);
        return true;
    }
    
    //How much has the owner delegated/approved to the delegate 
    function allowance(address owner, address delegate) public override view onlyOwner returns(uint){
        return allowed[owner][delegate];
    } 
}
