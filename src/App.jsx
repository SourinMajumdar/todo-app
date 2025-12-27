import { useState, useEffect } from "react";
import "./App.css";

const backgrounds = [
    "/bg/img1.jpg", "/bg/img2.jpg",
    "/bg/img3.jpg", "/bg/img4.jpg",
    "/bg/img5.jpg", "/bg/img6.jpg",
];

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBgImage(backgrounds[randomIndex]);
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;

    setTodos([
      ...todos,
      { text: text, completed: false }
    ]);

    setText("");
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="container" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
          url(${bgImage})
        `,
      }}>
      
      <div className="card">
        <p className="prompt">What’s on your mind today?</p>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={addTodo}>+ Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <label className="todo-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    const updatedTodos = [...todos];
                    updatedTodos[index].completed = !updatedTodos[index].completed;
                    setTodos(updatedTodos);
                  }}
                />

                <span className="checkmark"></span>
              </label>

              <span className="todo-text">{todo.text}</span>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(index)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        © 2025{" "}
        <a
          className="my-name"
          href="https://github.com/SourinMajumdar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sourin Majumdar
        </a>
        . Built with ❤️ and React.
      </footer>

    </div>
  );
}

export default App;