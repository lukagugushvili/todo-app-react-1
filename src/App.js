import { useState } from "react";
import deleteIcon from "./assets/delete.SVG";

function App() {
  const [categories, setCategories] = useState([
    "All",
    "Groceries",
    "College",
    "Payments",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newTodo, setNewTodo] = useState("");
  const [todo, setTodo] = useState([]);
  const [filterTodo, setFilerTodo] = useState([]);
  const [count, setCount] = useState(1);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") return setFilerTodo(todo);
    setFilerTodo([...todo.filter((el) => el.category === category)]);
  };

  // take values from input
  const handleChangeValue = (e) => setNewTodo(e.target.value);

  // draw todo in dom
  const handleAddTodo = (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      const task = {
        title: newTodo,
        category: selectedCategory,
        id: count,
      };
      setCount(count + 1);
      setTodo([...todo, task]);
      setFilerTodo([...filterTodo, task]);
      setNewTodo("");
    }
  };

  // remove item
  const deleteTodo = (userId) => {
    const updateTodo = filterTodo.filter((el) => el.id !== userId);
    setFilerTodo(updateTodo);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="category-box">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleChangeCategory(category)}
              className={category === selectedCategory ? "category" : ""}
            >
              {category}
            </li>
          ))}
        </div>
        <div className="content-box">
          <h1>{selectedCategory}</h1>
          <input
            className="inp"
            type="text"
            placeholder="Add a new task insdie ‘All’ category"
            value={newTodo}
            onKeyDown={handleAddTodo}
            onChange={handleChangeValue}
          />
          <div className="tasks-list">
            {filterTodo.map((el) => (
              <li key={el.id} className="list">
                <div className="just-box">
                  <button className="mark"></button>
                  <p>
                    {el.title}
                    <span className="category-title">{el.category}</span>
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(el.id)}
                >
                  <img src={deleteIcon} alt="delete-icon" />
                </button>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
