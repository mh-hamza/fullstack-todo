import React, { useState } from 'react';
import { useFirebase } from "../context/Firebase"
const AddTodo = () => {
  const [title, setTitle] = useState('')
  const firebase = useFirebase()
  const todoHandler = async(e)=>{
    e.preventDefault()
    try {
      await firebase.addTodoList(title)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <form onSubmit={todoHandler}>
      <div className="flex items-center justify-center bg-white p-4 rounded-full shadow-lg">
      <input 
        type="text" 
        placeholder="Enter your text here" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-64 px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <button className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all">
        Add
      </button>
    </div>
    </form>
  );
};

export default AddTodo;
