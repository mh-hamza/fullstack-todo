import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { FaTrash, FaEdit } from "react-icons/fa";

const ListAllTodos = () => {
  const firebase = useFirebase();
  const [todos, setTodos] = useState([]);

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
      // Filter out the deleted todo from the state
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Todos</h2>
      {todos.length > 0 ? (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              {/* Rounded checkbox */}
              <div className="flex items-center">
                <div className="rounded-full border-2 border-gray-500 w-6 h-6 flex items-center justify-center mr-4">
                  {/* Placeholder for checkbox (can be customized as per your design) */}
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-0 w-0"
                  />
                  <svg
                    className="fill-current hidden w-4 h-4 text-blue-500 pointer-events-none"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
                <span className="text-gray-800">{todo.title}</span>
              </div>

              {/* Delete and Edit buttons */}
              <div className="flex">
                <button
                  className="text-red-600 hover:text-red-800 transition-all mr-2"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-blue-600 hover:text-blue-800 transition-all"
                  onClick={() => console.log("Edit clicked for:", todo.id)}
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
