import { connect } from '@/db/db-config';

import User from '@/models/user-model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  console.log('SIGNUP');
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log('reqBody', reqBody);

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    //hash
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // new user
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    // save it
    const savedUser = await newUser.save();
    console.log(savedUser);

    // send response

    return NextResponse.json({
      message: `User ${email} created successfully`,
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
