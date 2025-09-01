import React from 'react'
import { IoSearch } from "react-icons/io5";


const Search = () => {
  return (
    <>
      <div className='h-[10vh]'>
            <div className='px-6 py-4'>
        <form action="" >
            <div className='flex space-x-3'>
                <label className=" border-[1px] rounded-lg input input-borderd flex items-center gap-2 w-[80%] grow outline-none bg-gray-700">
                  <input type="search" className="grow outline-none" placeholder="Search" />
                </label>
                <button>
                    <IoSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full ' /> 
                </button>
            </div> 
        </form>
    </div>
      </div>
    </>
  )
}

export default Search