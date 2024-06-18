import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";
import { IoIosAdd, IoIosSave } from 'react-icons/io';

const AddTodo = ({ currentTodo, setCurrentTodo }) => {
  const firebase = useFirebase();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
    } else {
      setTitle("");
    }
  }, [currentTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTodo) {
      // Update the todo
      try {
        await firebase.editUserTodo(currentTodo.id, title);
        // toast.success("Todo updated successfully!");
        setCurrentTodo(null); // Clear the currentTodo
        setTitle("");
      } catch (error) {
        console.error("Error updating todo:", error);
        toast.error("Failed to update todo: " + error.message);
      }
    } else {
      // Add new todo
      try {
        if(title == ""){
          toast.error("Please enter a task!");
          return;
        }
        await firebase.addTodoList(title);
        // toast.success("Todo added successfully!");
        setTitle("");
      } catch (error) {
        console.error("Error adding todo:", error);
        toast.error("Failed to add todo: " + error.message);
      }
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto"
  >
    <h2 className="text-2xl font-bold text-gray-700 mb-4">
      {currentTodo ? "Edit Todo" : "Add Todo"}
    </h2>
    <div className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
        className={`
          border rounded-l-lg p-2 w-full
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition duration-300 ease-in-out
          ${currentTodo ? 'bg-gray-100' : 'bg-white'}
          shadow-sm hover:shadow-md
        `}
      />
      <button
        type="submit"
        className={`
          bg-blue-500 text-white py-2 px-4 rounded-r-lg flex items-center
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          transition duration-300 ease-in-out
          ${currentTodo ? 'text-yellow-500' : ''}
        `}
      >
        {currentTodo ? (
          <IoIosSave className="mr-2 text-lg" />
        ) : (
          <h1 className="mr-2 text-2xl font-bold">+</h1>
        )}
      </button>
    </div>
  </form>
  );
};

export default AddTodo;