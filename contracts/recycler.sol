//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/**
 * @dev this proxy is just a wrapper to make ERC1967Proxy compatible with hardhat-deploy
 */
contract RecyclerProxy is ERC1967Proxy{
    constructor(address _logic, bytes memory _data) ERC1967Proxy(_logic, _data) {} // solhint-disable-line no-empty-blocks
    
    function _implementation() internal view virtual override returns (address impl) {
        return ERC1967Upgrade._getImplementation();
    }
}