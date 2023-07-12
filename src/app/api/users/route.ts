import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user-model';
import { connect } from '@/db/db-config';

connect();

// get cookies -> token -> get id from token -> find user by _id -> if user exists -> loggedIn
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const users = await User.find({});
    return NextResponse.json({
      message: 'Users fetched',
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
