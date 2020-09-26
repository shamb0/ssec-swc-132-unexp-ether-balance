// SPDX-License-Identifier: MIT
// pragma solidity ^0.5.1;
pragma solidity ^0.6.0;

import "@nomiclabs/buidler/console.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract EtherGameFixed {

    using SafeMath for uint;

    uint public payoutMileStone1 = 3 ether;
    uint public mileStone1Reward = 2 ether;
    uint public payoutMileStone2 = 5 ether;
    uint public mileStone2Reward = 3 ether;
    uint public finalMileStone = 10 ether;
    uint public finalReward = 5 ether;

    mapping(address => uint) private redeemableEther;
    uint private currentBalance;

    // users pay 0.5 ether. At specific milestones, credit their accounts
    function play() public payable {

        console.log("Info@EtherGame.sol::play sender(%s)", msg.sender );
        console.log("Info@EtherGame.sol::play value(%s)", msg.value );
        console.log("Info@EtherGame.sol::play Entry Curr Bal(%s)", currentBalance );

        require(msg.value == 0.5 ether); // each play is 0.5 ether
        currentBalance = currentBalance.add( msg.value );

        // ensure no players after the game as finished
        require(currentBalance <= finalMileStone);

        // if at a milestone credit the players account
        if (currentBalance == payoutMileStone1) {
            redeemableEther[msg.sender] += mileStone1Reward;
        }
        else if (currentBalance == payoutMileStone2) {
            redeemableEther[msg.sender] += mileStone2Reward;
        }
        else if (currentBalance == finalMileStone ) {
            redeemableEther[msg.sender] += finalReward;
        }

        console.log("Info@EtherGame.sol::play curr bal (%s)", currentBalance );
        console.log("Info@EtherGame.sol::play user redeem value(%s)", redeemableEther[msg.sender] );

        return;
    }

    function claimReward() public {

        // ensure the game is complete
        require(address(this).balance == finalMileStone);

        // ensure there is a reward to give
        require(redeemableEther[msg.sender] > 0);
        redeemableEther[msg.sender] = 0;
        msg.sender.transfer(redeemableEther[msg.sender]);

    }

    function withdrawEth() public {
        msg.sender.transfer( address(this).balance );
    }

 }
