import React from 'react'
import Search from '../../Components/Search'
import Users from './Users'

const Left = () => {
  return (
    <>
        <div className='w-[40%]  text-white bg-black'>
          <h1 className='text-4xl font-bold p-2 px-11'>Chats</h1>
            <Search/>
            <hr />
            <Users/>
        </div>
    </>
  )
}

export default Left