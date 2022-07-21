// SPDX-License-Identifier: MIT LICENSE

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./Collection.sol";

contract FNFTToken is ERC20, ERC20Burnable, Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) private _balances;
    mapping(address => bool) controllers;

    uint256 public _totalSupply;
    uint256 public Supply;
    uint256 constant MAXIMUMSUPPLY = 10000000 * 18;

    constructor() ERC20("Fantasy Obviation Trend", "FOT") {
        // _mint(msg.sender, 1000000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) external {
        require(controllers[msg.sender], "Only controllers can mint");
        require(
            (Supply + amount) <= MAXIMUMSUPPLY,
            "Maximum supply has been reached"
        );
        _totalSupply = _totalSupply.add(amount);
        Supply = Supply.add(amount);
        _balances[to] = _balances[to].add(amount);
        _mint(to, amount);
    }

    function burnFrom(address account, uint256 amount) public override {
        if (controllers[msg.sender]) {
            _burn(account, amount);
        } else {
            super.burnFrom(account, amount);
        }
    }

    function addController(address controller) external onlyOwner {
        controllers[controller] = true;
    }

    function removeController(address controller) external onlyOwner {
        controllers[controller] = false;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function maxSupply() public pure returns (uint256) {
        return MAXIMUMSUPPLY;
    }
}
