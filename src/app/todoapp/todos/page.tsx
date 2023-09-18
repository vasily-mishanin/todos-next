'use client';

import Spinner from '@/components/Spinner/Spinner';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { ITodo } from '@/store/types';
import { useGetTodosQuery } from '@/store/services/todosApi';
import { toast } from 'react-hot-toast';
import { CommonList } from '@/components/common/CommonList';

export default function Todos() {
  const { isLoading, isFetching, data, error } = useGetTodosQuery(null);
  const todos = data?.data;

  if (error) {
    toast.error(`'Todos fetch failed: ' ${error}`);
  }

  return (
    <section className='flex flex-col gap-4 py-4 lg:p-8'>
      {isLoading || (isFetching && <Spinner text='Loading todos ...' />)}
      <div>
        {todos && (
          <CommonList
            items={todos}
            itemComponent={Todo}
            resourceName='todo'
            listStyleClasses='flex flex-wrap gap-4 justify-center'
          >
            <NewTodo index={todos?.length || 0} />
          </CommonList>
        )}
      </div>
    </section>
  );
}
