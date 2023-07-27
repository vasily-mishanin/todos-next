'use client';

import Spinner from '@/components/Spinner/Spinner';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { ITodo } from '@/store/types';
import axios from 'axios';
import { useGetTodosQuery } from '@/store/services/todosApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Todos() {
  // const [todos, setTodos] = useState<ITodo[]>([]);
  // const [loading, setLoading] = useState(false);
  const { isLoading, isFetching, data, error } = useGetTodosQuery(null);

  const todos = data?.data;

  if (error) {
    toast.error(`'Todos fetch failed: ' ${error}`);
  }

  // if (data?.message) {
  //   toast.success(data?.message);
  // }

  const fetchTodos = async () => {
    // try {
    //   setLoading(true);
    //   const res = await axios.get('/api/todos');
    //   setLoading(false);
    //   setTodos(res.data.data);
    // } catch (error: any) {
    //   setLoading(false);
    //   toast.error(`'Todos fetch failed: ' ${error.message}`);
    // }
  };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  return (
    <section className='flex flex-col gap-4 py-4 px-10'>
      {/* {loading && (
        <h1 className='flex gap-4 items-center self-center'>
          <Spinner /> Loading todos ...
        </h1>
      )} */}

      {isLoading || (isFetching && <Spinner text='Loading todos ...' />)}
      <div className='flex flex-wrap gap-4 max-[600px]:justify-center'>
        {todos &&
          todos.map((todo: ITodo) => (
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
