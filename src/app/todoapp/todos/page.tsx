'use client';

import Spinner from '@/components/Spinner/Spinner';
import NewTodo, { ITodo } from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { AuthContext } from '@/store/AuthProvider';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { IAuthState, authSlice } from '@/store/authSlice';
import { RootState } from '@/store/store';

export default function Todos() {
  const auth = useContext(AuthContext);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);

  const authSlice = useSelector((state: RootState) => state.auth.authState);
  const dispatch = useDispatch();

  console.log('authSlice', authSlice);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/todos');
      setLoading(false);
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
        <h1 className='flex gap-4 items-center self-center'>
          <Spinner /> Loading todos ...
        </h1>
      )}
      <div className='flex flex-wrap gap-4 max-[600px]:justify-center'>
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
