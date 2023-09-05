import { NextRequest, NextResponse } from 'next/server';
import Board from '@/models/board-model';
import { connect } from '@/db/db-config';
import { IBoard } from '@/store/types';

connect();

export async function GET(request: NextRequest) {
  try {
    const boards = await Board.find({});
    return NextResponse.json({
      message: 'Boards fetched',
      success: true,
      data: boards,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const board = await request.json();
    const { title, order } = board;

    const existingBoard = await Board.findOne({ title });
    console.log({ existingBoard });
    if (existingBoard) {
      return NextResponse.json({
        message: 'Board already exists',
        success: false,
        data: existingBoard,
      });
    }

    const newBoard = await new Board({ title, order });
    const savedBoard = await newBoard.save();

    return NextResponse.json({
      message: 'Board created successfully',
      success: true,
      data: savedBoard,
    });
  } catch (error: any) {
    console.log('Eror with new Board');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, _id, order } = reqBody as IBoard;

    const updatedBoard = await Board.findByIdAndUpdate(
      { _id },
      { title, order }
    );

    if (!updatedBoard) {
      return NextResponse.json({
        message: 'Error while updating board',
        success: false,
        data: updatedBoard,
      });
    }

    return NextResponse.json({
      message: `Board updated successfully`,
      success: true,
      board: updatedBoard,
    });
  } catch (error: any) {
    console.log('Eror with updating Board');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id } = reqBody;

    const deletedBoard = await Board.deleteOne({ _id });

    return NextResponse.json({
      message: `Board deleted successfully`,
      success: true,
      board: deletedBoard,
    });
  } catch (error: any) {
    console.log('Eror while deleting Board');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
