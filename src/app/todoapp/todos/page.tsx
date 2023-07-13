'use client';

import Spinner from '@/components/Spinner/Spinner';
import NewTodo, { ITodo } from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { AuthContext } from '@/store/AuthProvider';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

// const mockTodo: ITodo = {
//   title: 'Create App',
//   details:
//     'Create App using Create App using Create App using Create App using',
//   userId: '332f3rf4',
// };

export default function Todos() {
  const auth = useContext(AuthContext);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/todos');
      setLoading(false);
      console.log('todos:', res.data.data);
      setTodos(res.data.data);
    } catch (error: any) {
      setLoading(false);
      console.log('Todos fetch failed: ', error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className='flex flex-col gap-4 py-4 px-10'>
      {loading && (
        <h1 className='flex gap-4 self-center'>
          <Spinner /> Loading todos ...
        </h1>
      )}
      <div className='flex flex-wrap gap-4'>
        {todos &&
          todos.map((todo, ind) => (
            <Todo
              key={todo._id}
              todo={todo}
              onUpdate={fetchTodos}
              onDelete={fetchTodos}
            />
          ))}
        <NewTodo onAddNeWTodo={fetchTodos} />
      </div>
    </section>
  );
}
