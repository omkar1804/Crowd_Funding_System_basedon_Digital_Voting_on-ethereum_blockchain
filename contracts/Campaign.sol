// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] deployedCampaigns;

    function createCampaign(uint minimum) public {
        Campaign newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedContracts() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    // Request[] public requestArray;
    address public manager;
    uint public minimumAmount;
    mapping(address => bool) public approvers;
    uint approversCount;
    uint public numRequests ;
    mapping (uint => Request) public requests;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor (uint256 amount, address sender) {
        manager = sender;
        minimumAmount = amount;
    }

    function contribute() public payable{
        require(msg.value > minimumAmount);

        approvers[msg.sender] = true;
        approversCount++;
    }                   

    function createRequest(string memory description, uint value, address recipient) public restricted{
        Request storage newRequest= requests[numRequests++];

        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public{
        Request storage request = requests[index];

        require(!request.complete);

        require(request.approvalCount > (approversCount / 2));

        payable(request.recipient).transfer(request.value);

        request.complete = true;
    }

}