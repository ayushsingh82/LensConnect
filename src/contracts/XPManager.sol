// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract XPManager {
    // XP rewards for different actions
    uint256 private constant CONNECT_WALLET_XP = 10;
    uint256 private constant REQUEST_CONNECTION_XP = 5;
    
    // User XP tracking
    mapping(address => uint256) public userXP;
    
    // Connection requests tracking
    mapping(address => mapping(address => bool)) public connectionRequests;
    mapping(address => mapping(address => bool)) public connections;
    
    // Events
    event XPEarned(address indexed user, uint256 amount, string action);
    event ConnectionRequested(address indexed from, address indexed to);
    event ConnectionAccepted(address indexed user1, address indexed user2);
    
    // Function to award XP for wallet connection
    function awardConnectWalletXP() public {
        userXP[msg.sender] += CONNECT_WALLET_XP;
        emit XPEarned(msg.sender, CONNECT_WALLET_XP, "Wallet Connection");
    }
    
    // Function to request connection with another user
    function requestConnection(address _otherUser) public {
        require(_otherUser != msg.sender, "Cannot connect with yourself");
        require(!connections[msg.sender][_otherUser], "Already connected");
        require(!connectionRequests[msg.sender][_otherUser], "Request already sent");
        
        connectionRequests[msg.sender][_otherUser] = true;
        
        // Award XP for requesting connection
        userXP[msg.sender] += REQUEST_CONNECTION_XP;
        emit XPEarned(msg.sender, REQUEST_CONNECTION_XP, "Connection Request");
        
        emit ConnectionRequested(msg.sender, _otherUser);
    }
    
    // Function to accept connection request
    function acceptConnection(address _requester) public {
        require(connectionRequests[_requester][msg.sender], "No request from this user");
        require(!connections[msg.sender][_requester], "Already connected");
        
        // Create bidirectional connection
        connections[msg.sender][_requester] = true;
        connections[_requester][msg.sender] = true;
        
        // Remove the request
        connectionRequests[_requester][msg.sender] = false;
        
        // Award XP to both users
        userXP[msg.sender] += CONNECT_WALLET_XP;
        userXP[_requester] += CONNECT_WALLET_XP;
        
        emit XPEarned(msg.sender, CONNECT_WALLET_XP, "Connection Accepted");
        emit XPEarned(_requester, CONNECT_WALLET_XP, "Connection Accepted");
        emit ConnectionAccepted(msg.sender, _requester);
    }
    
    // Function to get user's XP
    function getUserXP(address _user) public view returns (uint256) {
        return userXP[_user];
    }
    
    // Function to check if two users are connected
    function areUsersConnected(address _user1, address _user2) public view returns (bool) {
        return connections[_user1][_user2];
    }
    
    // Function to check if there's a pending connection request
    function hasPendingRequest(address _from, address _to) public view returns (bool) {
        return connectionRequests[_from][_to];
    }
} 