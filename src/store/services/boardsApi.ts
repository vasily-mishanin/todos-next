import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostTodoResult, IBoard, Methods } from '../types';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Boards'],

  endpoints: (builder) => ({
    getBoards: builder.query<{ data: IBoard[]; message: string }, null>({
      query: () => 'boards',
      providesTags: ['Boards'],
    }),

    addBoard: builder.mutation<IPostTodoResult, IBoard>({
      query: (body) => ({
        url: 'boards',
        method: Methods.POST,
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const { useGetBoardsQuery, useAddBoardMutation } = boardsApi;
