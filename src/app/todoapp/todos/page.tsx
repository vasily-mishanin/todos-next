'use client';

import Spinner from '@/components/Spinner/Spinner';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { ITodo } from '@/store/types';
import { useGetTodosQuery } from '@/store/services/todosApi';
import { toast } from 'react-hot-toast';

export default function Todos() {
  const { isLoading, isFetching, data, error } = useGetTodosQuery(null);
  const todos = data?.data;

  if (error) {
    toast.error(`'Todos fetch failed: ' ${error}`);
  }

  return (
    <section className='flex flex-col gap-4 py-4 lg:p-8'>
      {isLoading || (isFetching && <Spinner text='Loading todos ...' />)}
      <div className='flex flex-wrap gap-4 justify-center'>
        {todos &&
          todos.map((todo: ITodo) => <Todo key={todo._id} todo={todo} />)}
        <NewTodo index={todos?.length || 0} />
      </div>

      <p>- Minimize Todo+NewTodo ✅</p>
      <p>- Add Todos to Boards ✅ </p>
      <p>- Update Board ✅</p>
      <p>- Filter Todo By Order Board ✅</p>
      <p>- Delete Board if it has no todos ✅</p>
      <p>- Only Admin can sort todos</p>
      <p>- Add Giff to README</p>
    </section>
  );
}
