import React from 'react'
import User from '../../Components/User'
import GetAllUsers from '../../context/GetAllUsers'

const Users = () => {
  const [allUsers, loading] = GetAllUsers();
  console.log(allUsers)
  
  // if (loading) return <div>Loading...</div>;
  return (
    <>
      {/* <div className='py-2 element overflow-y-auto' style={{maxHeight:"calc(83vh - 1vh)"}}>
        {(Array.isArray(allUsers.filteredUsers) ? allUsers.filteredUsers : []).map((user, index) => (
           <User key={index} user={user}/>
        ))}
      </div> */}
      <div className='py-2 element overflow-y-auto' style={{maxHeight:"calc(83vh - 1vh)"}}>
        {allUsers?.filteredUsers?.map((user, index) => (
           <User key={index} user={user}/>
        ))}
        </div>
    </>
  )
}

export default Users