// import { useTodoContext } from "../context/AppContextProvider";
// import "../css/TodoInput.css";
import { useTodoContext } from "../../context";
import "../../css/TodoInput.css";

const TodoInput = () => {
  const { todo, inputId, onChange, onClick, onKeyPress } = useTodoContext();

  return (
    <div className="todo_input">
      <input
        name="t_text"
        ref={inputId}
        value={todo.t_text}
        placeholder="TODAY TO-DO"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className="btn_insert" onClick={onClick}>
        ENTER
      </div>
    </div>
  );
};

export default TodoInput;
