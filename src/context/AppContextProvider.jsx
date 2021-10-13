import { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export const useTodoContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [todo, setTodo] = useState({
    t_comp: false,
  });
  const [todoList, setTodoList] = useState([]);
  const nextId = useRef(0);
  const inputId = useRef();

  const onChange = (e) => {
    const t_text = e.target.value;
    setTodo({ ...todo, t_text });
  };
  const onClick = () => {
    todoInsert();
  };

  const todoClear = () =>
    setTodo({ t_id: nextId.current, t_text: "", t_comp: false });

  const todoInsert = () => {
    if (todo.t_text == null || todo.t_text === "") {
      alert("할 일을 입력하세요");
      inputId.current.focus();
      return;
    }
    setTodoList([...todoList, { ...todo, t_id: nextId.current }]);
    nextId.current++;
    todoClear();
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      todoInsert();
    } else if (e.key === "Escape") {
      todoClear();
    }
  };

  const completeToggle = (e) => {
    const id = Number(e.target.dataset.code);

    const index = todoList.findIndex((item) => item.t_id === id);

    const selectTodo = todoList[index];
    const _todoList = [...todoList];
    _todoList[index] = {
      ...selectTodo,
      t_comp: !selectTodo.t_comp,
    };
    setTodoList(_todoList);

    alert("complete");
  };

  const onDeleteClick = (e) => {
    const id = e.target.dataset.code;
    if (window.confirm("삭제할까요?")) {
      todoDelete(id);
    }
  };
  const todoDelete = (id) => {
    const _todoList = todoList.filter((item) => item.t_id != id);
    console.table(_todoList);
    setTodoList(_todoList);
    console.table(todoList);
  };

  const providerData = {
    todo,
    todoList,
    inputId,
    onChange,
    onClick,
    onKeyPress,

    completeToggle,
    onDeleteClick,
  };

  return (
    <AppContext.Provider value={providerData}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
