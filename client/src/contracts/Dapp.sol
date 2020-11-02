pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract Dapp {
  string designHash;

  function set(string memory _designHash) public {
    designHash = _designHash;
  }

  function get() public view returns (string memory) {
    return designHash;
  }
}
