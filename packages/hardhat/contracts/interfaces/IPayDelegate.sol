// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

struct DidPayParam {
    address payer;
    uint256 projectId;
    uint256 amount;
    uint256 weight;
    uint256 count;
    address payable beneficiary;
    string memo;
    bytes delegateMetadata;
}

interface IPayDelegate {
    function didPay(DidPayParam calldata _param) external;
}
