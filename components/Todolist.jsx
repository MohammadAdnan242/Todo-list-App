import React, { useEffect, useState } from 'react';
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import '../components/Todolist.css';

const Todolist = () => {
  const [isCompleteScreen, setisCompleteScreen] = useState(false);
  const [Newtodos, setNewtodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [completedTodos, setcompletedTodos] = useState([]);
  const [currentEdit, setcurrentEdit] = useState("");
  const [currentEditedItem, setcurrentEditedItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTodos = Newtodos.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTodos = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoarr = [...Newtodos];
    updatedTodoarr.push(newTodoItem);
    setNewtodos(updatedTodoarr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoarr));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setNewtodos(savedTodo);
    }
  }, []);

  const handleComplete = (index) => {
    let now = new Date();
    let CompleteOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let filtereditem = {
      ...Newtodos[index],
      completedOn: CompleteOn,
    };

    let updatedCompleted = [...completedTodos];
    updatedCompleted.push(filtereditem);
    setcompletedTodos(updatedCompleted);

    let updatedTodos = Newtodos.filter((_, i) => i !== index);
    setNewtodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

  const handleEdit = (ind, item) => {
    setcurrentEdit(ind);
    setcurrentEditedItem(item);
  };

  const handleUpdatedTitle = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdatedDescription = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateTodo = () => {
    let AllTodos = [...Newtodos];
    AllTodos[currentEdit] = currentEditedItem;
    setNewtodos(AllTodos);
    setcurrentEdit("");
  };

  const handleDelete = (index, isCompleted = false) => {
    if (isCompleted) {
      let updatedCompleted = completedTodos.filter((_, i) => i !== index);
      setcompletedTodos(updatedCompleted);
    } else {
      let updatedTodos = Newtodos.filter((_, i) => i !== index);
      setNewtodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    }
  };

  return (
    <>
      <div className="to-do">
        <h1>Todo List App</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setnewTitle(e.target.value)}
                placeholder="Enter the task to be done"
              />
            </div>

            <div className="todo-input-item">
              <label>Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setnewDescription(e.target.value)}
                placeholder="Enter the task description"
              />
            </div>

            <div className="todo-input-item">
              <button type="button" onClick={handleTodos} className="primarybtn">
                Add
              </button>
            </div>

            <div className="todo-input-item">
              <label>Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title"
              />
            </div>
          </div>

          <div className="btn-area">
            <button
              className={`secondarybtn ${isCompleteScreen === false && 'active'}`}
              onClick={() => setisCompleteScreen(false)}
            >
              Task List
            </button>
            <button
              className={`secondarybtn ${isCompleteScreen === true && 'active'}`}
              onClick={() => setisCompleteScreen(true)}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            {isCompleteScreen === false &&
              filteredTodos.map((item, index) => {
                if (currentEdit === index) {
                  return (
                    <div className="Edit-wrapper" key={index}>
                      <input
                        placeholder="Updated Title"
                        onChange={(e) => handleUpdatedTitle(e.target.value)}
                        value={currentEditedItem.title}
                      />
                      <textarea
                        placeholder="Updated Description"
                        onChange={(e) => handleUpdatedDescription(e.target.value)}
                        value={currentEditedItem.description}
                        cols={6}
                      />
                      <button
                        type="button"
                        onClick={handleUpdateTodo}
                        className="primarybtn"
                      >
                        Update
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="todo-list-item" key={index}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      <div className="icons">
                        <div
                          className="check-icon"
                          onClick={() => handleEdit(index, item)}
                          title="Edit?"
                        >
                          <FaEdit />
                        </div>

                        <div
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                          title="Mark Complete"
                        >
                          <FaCheck />
                        </div>

                        <div
                          className="check-icon"
                          onClick={() => handleDelete(index)}
                          title="Delete"
                        >
                          <FaTrash />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

            {isCompleteScreen === true &&
              completedTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed On: {item.completedOn}</small>
                    </p>

                    <div className="icons">
                      <div
                        className="check-icon"
                        onClick={() => handleDelete(index, true)}
                        title="Delete"
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
