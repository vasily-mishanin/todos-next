import { connect } from '@/db/db-config';

import User from '@/models/user-model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    const isEnteredPasswordValid = await bcryptjs.compare(
      password,
      user.password
    );

    if (!isEnteredPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token itself
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '23h',
    });

    const response = NextResponse.json({
      message: 'Login successfull',
      success: true,
      user,
    });

    response.headers.set('Cache-Control', 'no-store, max-age=0'); // for Vercel to logout correctly
    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error) {}
}
