import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchTodos, setTodoPage} from '../store/action-creators/todo';

const TodoList: React.FC = () => {

    const {page, error, loading, limit, todos} = useTypedSelector(state => state.todo)
    const dispatch = useDispatch()

    const pages = [1, 2, 3, 4, 5]

    useEffect(() => {
        dispatch(fetchTodos(page, limit))
    }, [page])

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            {todos.map(todo =>
                <div key={todo.id}>{todo.id} - {todo.title}</div>
            )}
            <div style={{display: "flex"}}>
                {pages.map(p =>
                    <div
                        onClick={() => dispatch(setTodoPage(p))}
                        style={{border: p === page ? '2px solid green' : '1px solid gray', padding: 10}}
                    >{p}</div>
                )}
            </div>
        </div>
    );
};

export default TodoList
