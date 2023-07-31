import { connect } from '@/db/db-config';
import User from '@/models/user-model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { EmailType, sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 404 }
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

    // send verification email to user:
    // 1 - write verifyToken into the user in DB
    // 2 - send verifyLink with verifyToken to the user's email
    await sendEmail({
      email,
      emailType: EmailType.VERIFY,
      userId: savedUser._id,
    });

    // send response
    return NextResponse.json({
      message: `User ${email} created successfully`,
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
