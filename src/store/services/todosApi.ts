import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostTodoResult, ITodo, Methods } from '../types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Todos'],

  endpoints: (builder) => ({
    getTodos: builder.query<{ data: ITodo[]; message: string }, null>({
      query: () => 'todos',
      providesTags: ['Todos'],
    }),

    addTodo: builder.mutation<IPostTodoResult, Partial<ITodo>>({
      query: (body) => ({
        url: `todos`,
        method: Methods.POST,
        body,
      }),
      invalidatesTags: ['Todos'],
    }),

    updateTodo: builder.mutation<IPostTodoResult, Partial<ITodo>>({
      query: (body) => ({
        url: 'todos',
        method: Methods.PUT,
        body,
      }),
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation<IPostTodoResult, Pick<ITodo, '_id'>>({
      query: (body) => ({
        url: 'todos',
        method: Methods.DELETE,
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
