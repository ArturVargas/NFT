// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Cypher is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address public admin;

  constructor() ERC721("Cypherpunk Nightmares", "EVND") public {
    admin = msg.sender;
  }

  function mint(address _toPunk, string memory _tokenURI) external returns(uint256) {
    require(msg.sender == admin, 'Solo el Admin puede enviar tokens..!!');
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(_toPunk, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    return newItemId;
  }
}
