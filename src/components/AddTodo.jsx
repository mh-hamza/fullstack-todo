import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";

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
        toast.success("Todo updated successfully!");
        setCurrentTodo(null); // Clear the currentTodo
        setTitle("");
      } catch (error) {
        console.error("Error updating todo:", error);
        toast.error("Failed to update todo: " + error.message);
      }
    } else {
      // Add new todo
      try {
        await firebase.addTodoList(title);
        toast.success("Todo added successfully!");
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
      className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {currentTodo ? "Edit Todo" : "Add Todo"}
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
        className="border rounded p-2 w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {currentTodo ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default AddTodo;
