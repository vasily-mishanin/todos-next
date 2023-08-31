import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/models/todo-model';
import { connect } from '@/db/db-config';
import { ITodo } from '@/store/types';

connect();

export async function GET(request: NextRequest) {
  try {
    const todos = await Todo.find({});
    return NextResponse.json({
      message: 'Todos fetched',
      success: true,
      data: todos,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, details, userId, done, by, boardId, order } = reqBody;

    const newTodo = await new Todo({
      title,
      details,
      userId,
      done,
      by,
      boardId,
      order,
    });
    // save new todo
    const savedTodo = await newTodo.save();
    return NextResponse.json({
      message: `Todo created successfully`,
      success: true,
      todo: savedTodo,
    });
  } catch (error: any) {
    console.log('Eror with new Todo');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, details, done, userId, _id, order } = reqBody;

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id },
      { title, details, done, order }
    );

    return NextResponse.json({
      message: `Todo updated successfully`,
      success: true,
      todo: updatedTodo,
    });
  } catch (error: any) {
    console.log('Eror while updating Todo');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id } = reqBody;

    const deletedTodo = await Todo.deleteOne({ _id });

    return NextResponse.json({
      message: `Todo deleted successfully`,
      success: true,
      todo: deletedTodo,
    });
  } catch (error: any) {
    console.log('Eror while deleting Todo');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
