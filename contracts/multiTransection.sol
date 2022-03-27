//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import  "./cptoken.sol";


contract MultiTransection is Initializable, CPToken{ 
    event LogTokenBulkSent(address token, uint256 total);
    // solhint-disable-next-line
    // In order to upgrade in the future. 
    function initialize() public initializer {}
    
    function multiTransfer(address _token, 
                            address[] calldata _addresses,
                            uint256[] calldata _amount) 
                            public { 
    require(_addresses.length == _amount.length, "# of address != # of amounts");
    require(_addresses.length <= 255, "preventing overflow");
    uint sendAmount = _amount[0];
    CPToken token = CPToken(_token);

    for(uint i=0; i < _addresses.length; i++){
        token.transferFrom(msg.sender, 
                            _addresses[i], 
                            _amount[i]);
    }
    emit LogTokenBulkSent(_token, sendAmount);
    }
}