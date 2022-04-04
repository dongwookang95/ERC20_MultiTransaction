//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import  { CPToken } from "./cptoken.sol";


contract MultiTransactionV2 is Initializable{ 
    event LogTokenBulkSent(address token, uint256 total);
    // In order to upgrade in the future. 
    // solhint-disable-next-line
    function initialize() public initializer {}
    
    function multiTransfer(address _token, 
                            address[] calldata _addresses,
                            uint256[] calldata _amount) 
                            public { 
    require(_addresses.length == _amount.length, "# of address != # of amounts");
    require(_addresses.length <= 255, "preventing overflow");
    uint sendAmount = _amount[0];
    CPToken token = CPToken(_token);

    //loop starts from 1, so that it will skip first line of csv file. 
    for(uint i=1; i < _addresses.length; i++){
        token.transferFrom(msg.sender, 
                            _addresses[i], 
                            _amount[i]);
    }
    emit LogTokenBulkSent(_token, sendAmount);
    }
}