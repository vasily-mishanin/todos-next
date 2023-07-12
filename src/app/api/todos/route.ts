import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/models/todo-model';
import { connect } from '@/db/db-config';

connect();

export async function POST(request: NextRequest) {
  console.log('Create TODO');
  try {
    const reqBody = await request.json();
    const { title, details, userId } = reqBody;
    console.log('newTodo', reqBody);

    const newTodo = await new Todo({
      title,
      details,
      userId,
    });
    // save new todo
    const savedTodo = await newTodo.save();
    console.log({ savedTodo });
    return NextResponse.json({
      message: `Todo created successfully`,
      success: true,
      savedTodo,
    });
  } catch (error: any) {
    console.log('Eror with new Todo');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

export async function PUT(request: NextRequest) {
  console.log('Update TODO');
  try {
    const reqBody = await request.json();
    const { title, details, userId, _id } = reqBody;
    console.log('newTodo', reqBody);

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id },
      { title, details }
    );

    console.log({ updatedTodo });
    return NextResponse.json({
      message: `Todo updated successfully`,
      success: true,
      updatedTodo,
    });
  } catch (error: any) {
    console.log('Eror while updating Todo');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  console.log('Delete TODO');
  try {
    const reqBody = await request.json();
    const { _id } = reqBody;
    console.log('deletedTodo', reqBody);

    const deletedTodo = await Todo.deleteOne({ _id });

    console.log({ deletedTodo });
    return NextResponse.json({
      message: `Todo deleted successfully`,
      success: true,
      deletedTodo,
    });
  } catch (error: any) {
    console.log('Eror while deleting Todo');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
