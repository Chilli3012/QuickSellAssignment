// components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css'

const KanbanBoard = ({ tickets,mappedData,groupingOption,setGroupingOption }) => {

  const [userData,setUserData] = useState()
  const [showSelect,setShowSelect] = useState(false)

  console.log(mappedData,'hello ji')
  const [columns, setColumns] = useState([]);


  const toggleShowSelect= ()=>{
    setShowSelect(!showSelect)
  }
  // Function to categorize tickets based on selected grouping option
  const categorizeTickets = () => {
    if (groupingOption === 'status') {
      const groupedColumns = {
        backlog: [],
        todo: [],
        inProgress: [],
        done: [],
      };

      mappedData?.forEach((ticket) => {
        const status = ticket.status;
        if (status === 'Backlog') {
          groupedColumns.backlog.push(ticket);
        } else if (status === 'Todo') {
          groupedColumns.todo.push(ticket);
        } else if (status === 'In progress') {
          groupedColumns.inProgress.push(ticket);
        } else if (status === 'Done') {
          groupedColumns.done.push(ticket);
        }
      });

      setColumns(groupedColumns);
    } else if (groupingOption === 'user') {
      // Logic to group by user

      // extract unique users

      const extractUniqueName = new Set(mappedData.map((singleData)=>{
        return singleData.name
      }))

      const arr= []

      extractUniqueName.forEach((name)=>{
        arr.push(name)
      })

      // console.log(arr)

      // console.log(extractUniqueName,'unique name')

     
      const uniqueRecords = arr.map((uniqueName)=>{
        const matches = mappedData.map((user)=>{
          if(user.name===uniqueName){
            return user
          }else{
            return
          }
        })

        // console.log(matches)
        return matches.filter(value => value !== undefined)
      })

      // console.log(uniqueRecords.filter(value => value !== undefined))

      setUserData(uniqueRecords.filter(value => value !== undefined))
      // push unique users into userArray
      const userColumns = {
        // uniqueRecords
      }

      uniqueRecords.forEach((userArray)=>{
        userArray.forEach((user)=>{
          userColumns[user['name']] = userArray
        })
      })

      // console.log(userColumns,'test')

      // console.log(userColumns)
      setColumns(userColumns)
      // Implement similar to status logic but for users
    } else if (groupingOption === 'priority') {
      const priorityColumns = {
        0: [],
        4: [],
        3: [],
        2: [],
        1: [],
      };

      tickets.forEach((ticket) => {
        const priorityLevel = ticket.priority;
        priorityColumns[priorityLevel].push(ticket);
      });

      setColumns(priorityColumns);
    }
  };

  // Update columns based on tickets and grouping option
  useEffect(() => {
    categorizeTickets();
  }, [groupingOption, mappedData]);

  return (
    <div className="kanban-board">
      {/* Dropdown for selecting grouping option */}
      <div className='displayBox'>
          <button className='displayButton' onClick={()=>toggleShowSelect()}><p>Display</p></button>
          <div className='smallerbox'>
         {showSelect ? <>
         <div className='groupby'>
            <p style={{marginTop:'18px',marginLeft:'5px'}}>Group by</p>
            <select style={{margin:'10px'}} onChange={(e) =>{
              setGroupingOption(e.target.value)
              localStorage.setItem('groupingOption',e.target.value)
           
              }}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority" selected>Priority</option>
            </select>
          </div>
          <div className='orderby'>
            <p style={{marginTop:'18px',marginLeft:'5px'}}>Order by</p>
            <select style={{margin:'10px'}}> 
              <option>Title</option>
              <option>Priority</option>
            </select>
          </div>  
            </> : null}
          </div>

      </div>

      {/* Display columns based on grouping option */}
      <div className="columns columnsCustom">
        {Object.keys(columns).map((columnName) => (
          <div key={columnName} className="column">
            <h4>{columnName==0 && 'No Priority' || columnName==1 && "Low" || columnName==2 && "Medium" || columnName==3 && "High" || columnName==4 && "Urgent" || columnName}</h4>
            {columns[columnName].map((mappedData) => (
              <div key={mappedData.id}>
                <TicketCard ticket={mappedData} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;