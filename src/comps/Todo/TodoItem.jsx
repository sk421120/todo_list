import React from "react";
import { useTodoContext } from "../../context";
import "../../css/TodoItem.css";

const TodoItem = ({ todo }) => {
  const { t_id, t_text, t_comp } = todo;
  const { onDeleteClick, completeToggle } = useTodoContext();
  return (
    <div className="todo_item">
      <div className="todo_delete" onClick={onDeleteClick} data-code={t_id}>
        &times;
      </div>
      <div
        className={`todo_text ${t_comp && "checked"}`}
        onClick={completeToggle}
        data-code={t_id}
      >
        {t_text}
      </div>
      {/* 현재 todo의 t_comp 값이 true 일대만 이 tag가 나타나도록 하라 */}
      {t_comp && <div className="check_mark">&#x2713;</div>}
    </div>
  );
};

export default TodoItem;
