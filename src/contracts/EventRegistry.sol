// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventRegistry {
    struct Event {
        string name;
        string description;
        string[] features;
        address creator;
        uint256 createdAt;
    }
    
    // Array to store events
    uint256 private eventCount;
    mapping(uint256 => Event) public events;
    
    // Events for tracking
    event EventCreated(uint256 indexed eventId, string name, address creator);
    
    // Function to create a new event
    function createEvent(
        string memory _name,
        string memory _description,
        string[] memory _features
    ) public returns (uint256) {
        uint256 eventId = eventCount;
        Event storage newEvent = events[eventId];
        
        newEvent.name = _name;
        newEvent.description = _description;
        newEvent.features = _features;
        newEvent.creator = msg.sender;
        newEvent.createdAt = block.timestamp;
        
        emit EventCreated(eventId, _name, msg.sender);
        
        eventCount++;
        return eventId;
    }
    
    // Function to get event details
    function getEventDetails(uint256 _eventId) public view returns (
        string memory name,
        string memory description,
        string[] memory features,
        address creator,
        uint256 createdAt
    ) {
        require(_eventId < eventCount, "Event does not exist");
        Event storage event_ = events[_eventId];
        return (
            event_.name,
            event_.description,
            event_.features,
            event_.creator,
            event_.createdAt
        );
    }
    
    // Function to get the total number of events
    function getEventCount() public view returns (uint256) {
        return eventCount;
    }
} 