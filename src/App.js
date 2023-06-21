import { useReducer, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import "./styles.css";
import { useEffect } from "react";

function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now().toString(),
          content: payload,
          done: false,
          isEditable: false
        }
      ];
    case "DONE":
      const index = state.findIndex((list) => list.id === payload);

      const updatedList = {
        ...state[index],
        done: !state[index].done
      };
      const newArr = [...state];
      newArr.splice(index, 1, updatedList);

      return newArr;

    case "DELETE":
      const newList = state.filter((list) => list.id !== payload);
      return newList;

    case "EDIT":
      const indexFound = state.findIndex((list) => list.id === payload.id);
      console.log(payload.id);
      console.log(indexFound);
      if (indexFound !== -1) {
        const editedList = {
          ...state[indexFound],
          content: payload.text
        };
        const newEditedList = [...state];
        newEditedList.splice(indexFound, 1, editedList);
        return newEditedList;
      }
      return state;
    case "CLEAR":
      return [];
    default:
      return state;
  }
}
export default function App() {
  const [editItem, setEditItem] = useState(null);
  const [listItems, dispatch] = useReducer(
    reducer,

    JSON.parse(localStorage.getItem("items")) || []
  );

  function addToList(text) {
    dispatch({ type: "ADD", payload: text });
  }

  function taskCompleted(id) {
    dispatch({ type: "DONE", payload: id });
  }

  function deleteList(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function editList(id, text) {
    setEditItem({ id, content: text, isEditable: true });
  }
  function editedList(id, text) {
    dispatch({ type: "EDIT", payload: { id, text } });
    setEditItem(null);
  }

  function clearAll() {
    dispatch({ type: "CLEAR" });
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(listItems));
  }, [listItems]);
  return (
    <div className="App">
      <Header />
      <main className="todo-main">
        <Input add={addToList} edit={editItem} editedList={editedList} />
        <div className="list-container">
          <ul>
            {listItems.length > 0 &&
              listItems.map((list) => {
                return (
                  <List
                    key={list.id}
                    list={list}
                    done={taskCompleted}
                    deleteItem={deleteList}
                    editItem={editList}
                  />
                );
              })}
          </ul>
          {listItems.length > 0 && (
            <button onClick={clearAll} className="clear-btn">
              Clear All
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
