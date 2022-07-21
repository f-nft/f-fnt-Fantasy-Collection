// SPDX-License-Identifier: MIT LICENSE

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "/contracts/FNFTDrop.sol";

contract Collection is ERC721Enumerable, Ownable {

    struct TokenInfo {
        IERC20 paytoken;
        uint256 costvalue;
    }
    event SupplyAmountSet(uint amount, address byOwner);
    
     TokenInfo[] public AllowedCrypto;

    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 30000000000000000 ether;
    uint256 public maxSupply = 4000;
    uint256 public maxMintAmount = 100;
    bool public paused = false;

    using MerkleProof for bytes32[];

    mapping(address => bool) public alreadyMinted;

    uint16 public reserveFNFTDropsId;
    uint16 public FNFTsId;

    bytes32 public merkleRoot;
    bool public merkleEnabled = true;

    bool public saleStarted = true;
    uint256 public constant maxMint = 4000;
    
    constructor() ERC721 ("Fantasy_Collections", "FNFT") {

    reserveFNFTDropsId = 2000;
    FNFTsId = 2001;
    }

    function addCurrency(
        IERC20 _paytoken,
        uint256 _costvalue
    ) public onlyOwner {
        AllowedCrypto.push(
            TokenInfo({
                paytoken: _paytoken,
                costvalue: _costvalue
            })
        );
    }

    function _baseURI() internal view virtual override returns (string memory) {
    return "https://bafybeibeffg7mopnn6p7vux6bhtizqnvkvfqvxbobblywelgmr7dg2d44a.ipfs.nftstorage.link/Fantasy%20%23";

    }
    
    function mint(address _to, uint256 _mintAmount) public payable {
            uint256 supply = reserveFNFTDropsId + totalSupply();
            require(!paused);
            require(FNFTsId <= maxMint, "Mint limit reached");
            require(reserveFNFTDropsId + _mintAmount <= 2001, "Out of stock");
            require(_mintAmount > 0);
            require(_mintAmount <= maxMintAmount);
            require(supply + _mintAmount <= maxSupply);
            
            if (msg.sender != owner()) {
            require(msg.value == cost * _mintAmount, "Not enough balance to complete transaction.");
            }

            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(_to, supply + i);
            }
    }

    function mintpid(address _to, uint256 _mintAmount, uint256 _pid) public payable {
        TokenInfo storage tokens = AllowedCrypto[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        uint256 costval;
        costval = tokens.costvalue;
        uint256 supply = reserveFNFTDropsId + totalSupply();
        require(!paused);
        require(FNFTsId <= maxMint, "Mint limit reached");
        require(reserveFNFTDropsId + _mintAmount <= 2001, "Out of stock");
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
            
            for (uint256 i = 1; i <= _mintAmount; i++) {
                require(paytoken.transferFrom(msg.sender, address(this), costval));
                _safeMint(_to, supply + i);
            }
        }

        function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
        {
            uint256 ownerTokenCount = balanceOf(_owner);
            uint256[] memory tokenIds = new uint256[](ownerTokenCount);
            for (uint256 i; i < ownerTokenCount; i++) {
                tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            }
            return tokenIds;
        }
    
        
        function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory) {
            require(
                _exists(tokenId),
                "ERC721Metadata: URI query for nonexistent token"
                );
                
                string memory currentBaseURI = _baseURI();
                return
                bytes(currentBaseURI).length > 0 
                ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
                : "";
        }
        // only owner
        
        function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner() {
            maxMintAmount = _newmaxMintAmount;
        }
        
        function setBaseURI(string memory _newBaseURI) public onlyOwner() {
            baseURI = _newBaseURI;
        }
        
        function setBaseExtension(string memory _newBaseExtension) public onlyOwner() {
            baseExtension = _newBaseExtension;
        }
        
        function pause(bool _state) public onlyOwner() {
            paused = _state;
        }

        function getNFTCost(uint256 _pid) public view virtual returns(uint256) {
            TokenInfo storage tokens = AllowedCrypto[_pid];
            uint256 costval;
            costval = tokens.costvalue;
            return costval;
        }

        function getCryptotoken(uint256 _pid) public view virtual returns(IERC20) {
            TokenInfo storage tokens = AllowedCrypto[_pid];
            IERC20 paytoken;
            paytoken = tokens.paytoken;
            return paytoken;
        }
        
        function withdrawcustom(uint256 _pid) public payable onlyOwner() {
            TokenInfo storage tokens = AllowedCrypto[_pid];
            IERC20 paytoken;
            paytoken = tokens.paytoken;
            paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
        }
        
        function withdraw() public payable onlyOwner() {
            require(payable(msg.sender).send(address(this).balance));
        }
}