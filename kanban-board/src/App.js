// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Your main CSS file
import KanbanBoard from './components/KanbanBoard';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('priority');
  const [mappedData,setMappedData] = useState()
  const [sortOption, setSortOption] = useState('priority');
  const [apiData,setApiData ]= useState({
    tickets : [],
    users : []
  })

  useEffect(() => {
    fetchData();
  
   
  }, []); // Fetch data on initial render

 
  useEffect(()=>{
    generateMappedData()
  },[groupingOption])



  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');

      setApiData({tickets:response?.data?.tickets,users : response?.data?.users});

      generateMappedData()

      // console.log(response)
      setTickets(response.data.tickets); // Assuming 'tickets' is an array in the API response
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // console.log(apiData)

  const generateMappedData = ()=>{
   
  //  console.log(apiData.tickets) 
  //  console.log(apiData.users) 
   
   const userMap = new Map(apiData.users.map(user => [user.id, user]));

// Loop through feature requests and merge with user data
const mergedData = apiData.tickets.map(featureRequest => {
    const user = userMap.get(featureRequest.userId);

    if (user) {
        // Merge data into a single object
        return {
            ...featureRequest,
            ...user
        };
    } else {
        console.log(`User not found for feature request with ID ${featureRequest.id}`);
        return featureRequest;
    }
});

// console.log(mergedData)
setMappedData(mergedData)

  }

  

  // Functions for grouping and sorting tickets
  const groupTickets = () => {
    // Logic to group tickets based on 'groupingOption' (status, user, priority)
    // Update 'tickets' state with the grouped data
  };

  const sortTickets = () => {
    // Logic to sort 'tickets' based on 'sortOption' (priority, title)
    // Update 'tickets' state with the sorted data
  };

  return (
    <div className="App">
      <KanbanBoard
        tickets={tickets}
        groupingOption={groupingOption}
        mappedData = {mappedData}
        setGroupingOption = {setGroupingOption}
        sortOption={sortOption}
        onGroupChange={setGroupingOption}
        onSortChange={setSortOption}
        groupTickets={groupTickets}
        sortTickets={sortTickets}
      />
    </div>
  );
};

export default App;
