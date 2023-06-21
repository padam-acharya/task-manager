import { FaTrash, FaEdit } from "react-icons/fa";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank
} from "react-icons/md";
import "./List.css";
export default function List({ list, done, deleteItem, editItem }) {
  function handleDeletion(e) {
    e.stopPropagation();
    deleteItem(list.id);
  }

  function handleEdit(e) {
    e.stopPropagation();

    editItem(list.id, list.content);
  }
  function handleDone(e) {
    done(list.id);
  }
  return (
    <li
      // style={list.done ? style : "null"}
      className={list.done ? "done" : ""}
    >
      <div className="left-group">
        <button onClick={handleDone} className="checkbox">
          {list.done ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
        {list.content}
      </div>
      <div className="right-group">
        <button onClick={handleDeletion} className="delete-btn">
          <FaTrash />
        </button>
        <button
          onClick={handleEdit}
          disabled={list.done}
          title={list.done ? "Cannot edit" : ""}
          className="edit-btn"
        >
          <FaEdit />
        </button>
      </div>
    </li>
  );
}
