pragma solidity ^0.4.24;

import "../singleton-contracts/TwoKeyEventSource.sol";
import "../interfaces/ITwoKeySingletoneRegistryFetchAddress.sol";
import "../libraries/SafeMath.sol";
import "../acquisition-campaign-contracts/ArcERC20.sol";

contract TwoKeyCampaignARC is ArcERC20 {

	using SafeMath for uint256;

	address public contractor;
    address public moderator;
	address public ownerPlasma;

	mapping(address => address) public public_link_key;

	TwoKeyEventSource twoKeyEventSource;
	address public twoKeySingletonesRegistry;


	uint256 conversionQuota;  // maximal ARC tokens that can be passed in transferFrom

	// referral graph, who did you receive the referral from
	mapping(address => address) internal received_from;

    // @notice Modifier which allows only contractor to call methods
    modifier onlyContractor() {
        require(msg.sender == contractor);
        _;
    }


    constructor(uint256 _conversionQuota, address _twoKeySingletonesRegistry, address _moderator) ArcERC20() public {
		twoKeyEventSource = TwoKeyEventSource(ITwoKeySingletoneRegistryFetchAddress(_twoKeySingletonesRegistry).getContractProxyAddress("TwoKeyEventSource"));
		moderator = _moderator;
		contractor = msg.sender;
		ownerPlasma = twoKeyEventSource.plasmaOf(msg.sender);
		received_from[ownerPlasma] = ownerPlasma;
		conversionQuota = _conversionQuota;
		balances[ownerPlasma] = totalSupply_;
        twoKeySingletonesRegistry = _twoKeySingletonesRegistry;
	}

	/**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from ALREADY converted to plasma
     * @param _to address The address which you want to transfer to ALREADY converted to plasma
     * @param _value uint256 the amount of tokens to be transferred
     */
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
		//Add modifier who can call this!! onlyContractorOrModerator || msg.sender == from something like this
		return transferFromInternal(_from, _to, _value);
	}

	function transferFromInternal(address _from, address _to, uint256 _value) internal returns (bool) {
		// _from and _to are assumed to be already converted to plasma address (e.g. using plasmaOf)
		require(_value == 1, 'can only transfer 1 ARC');
		require(_from != address(0), '_from undefined');
		require(_to != address(0), '_to undefined');

		//Addresses are already plasma, don't see the point of next 2 lines!
		_from = twoKeyEventSource.plasmaOf(_from);
		_to = twoKeyEventSource.plasmaOf(_to);

		require(balances[_from] > 0,'_from does not have arcs');
		balances[_from] = balances[_from].sub(1);
		balances[_to] = balances[_to].add(conversionQuota);
		totalSupply_ = totalSupply_.add(conversionQuota.sub(1));

		emit Transfer(_from, _to, 1);
		if (received_from[_to] == 0) {
			// inform the 2key admin contract, once, that an influencer has joined
			twoKeyEventSource.joined(this, _from, _to);
		}
		received_from[_to] = _from;
		return true;
	}

	/**
	 * @notice Getter for the referral chain
	 * @param _receiver is address we want to check who he has received link from
	 */
	function getReceivedFrom(address _receiver) public view returns (address) {
		return received_from[_receiver];
	}

}
