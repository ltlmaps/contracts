pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';


contract TwoKeyEconomy is StandardToken, Ownable {
  string public name = 'TwoKeyEconomy';
  string public symbol = '2Key';
  uint8 public decimals = 18;

  constructor() Ownable() public {
    totalSupply_ = 1000000000000000000000000000;
    balances[msg.sender] = totalSupply_;
  }
}