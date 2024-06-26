import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddTodo from "./AddTodo";

const ListAllTodos = () => {
  const firebase = useFirebase();
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await firebase.listUsersTodos();
      setTodos(result);
    };
    fetchTodos();
  }, [firebase]);

  const handleDeleteTodo = async (todoId) => {
    try {
      await firebase.deleteUserTodo(todoId);
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditClick = (todo) => {
    setCurrentTodo(todo);
  };

  const checkboxHandle = async (todoId, isChecked) => {
    try {
      await firebase.todoCheckbox(todoId, isChecked); // Update the todo in Firebase

      // Update the local state to reflect the change
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: isChecked } : todo
        )
      );

      console.log("Checkbox clicked");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8">
      <AddTodo currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />  {/*Add todo components*/} 
      <h2 className="text-2xl text-gray-600 mb-4 mt-4">Your Todos</h2>
      {todos.length > 0 ? (
        <ul className="space-y-2 ">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className="rounded-full border-2 border-gray-500 w-6 h-6 flex items-center justify-center mr-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => checkboxHandle(todo.id, e.target.checked)}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  {todo.completed == false ? (
                    <div className="w-4 h-4"></div> // Empty space for unchecked checkbox
                  ) : (
                    <svg
                      className="fill-current  w-4 h-4 text-blue-500 pointer-events-none"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-gray-800 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>

              <div className="flex">
                <button
                  className="text-red-600 hover:text-red-800 transition-all mr-2"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-blue-600 hover:text-blue-800 transition-all"
                  onClick={() => handleEditClick(todo)}
                >
                  <FaEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          No todos found. Add some tasks to get started!
        </p>
      )}
    </div>
  );
};

export default ListAllTodos;
