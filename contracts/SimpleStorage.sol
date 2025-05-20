// SPDX-License-Identifier: MIT - Specifies the license type for the contract
pragma solidity ^0.8.0; // Specifies the Solidity compiler version to use

contract SimpleStorage {
    // State variable to store the number on the blockchain
    uint256 number;

    // Function to set the stored number
    // Takes a uint256 parameter and makes it publicly accessible
    function setNumber(uint256 _number) public {
        number = _number; // Updates the state variable with the new number
    }

    // Function to retrieve the stored number
    // 'view' indicates it doesn't modify state
    // Returns the stored number as uint256
    function getNumber() public view returns (uint256) {
        return number; // Returns the current value of the number variable
    }
} 