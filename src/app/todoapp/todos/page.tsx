'use client';

import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo, { ITodo } from '@/containers/Todo/Todo';
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

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos');
      console.log('todos:', res.data.data);
      setTodos(res.data.data);
    } catch (error: any) {
      console.log('Todos fetch failed: ', error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className='flex flex-col gap-4 py-4 px-10'>
      <h1 className='mb-8'>Todos Page</h1>
      <div className='flex flex-wrap gap-4'>
        {todos &&
          todos.map((todo, ind) => (
            <Todo key={todo._id} todo={todo} onUpdate={fetchTodos} />
          ))}
        <NewTodo onAddNeWTodo={fetchTodos} />
      </div>
    </section>
  );
}
