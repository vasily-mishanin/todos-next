import { NextRequest, NextResponse } from 'next/server';
import Board from '@/models/board-model';
import { connect } from '@/db/db-config';

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
    const { title } = board;

    const existingBoard = await Board.findOne({ title });
    console.log({ existingBoard });
    if (existingBoard) {
      return NextResponse.json({
        message: 'Board already exists',
        success: false,
        data: existingBoard,
      });
    }

    const newBoard = await new Board({ title });
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
