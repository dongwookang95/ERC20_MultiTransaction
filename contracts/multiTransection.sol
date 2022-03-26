//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

interface IERC20 { 
    function approve(address spender, uint256 amount) external returns (bool); 
    function transferFrom(address sender,address recipient,uint256 amount) external returns (bool); 
}

contract MultiTransection is Initializable{ 
    
    // solhint-disable-next-line
    function initialize() public initializer {}

    function multiTransfer(IERC20 _token, 
                            address[] calldata _addresses,
                            uint256[] calldata _amount) 
                            external 
                            { 
    for(uint i=0; i < _addresses.length; i++){
        _token.transferFrom(msg.sender, _addresses[i], _amount[i]);
    }
    }
}