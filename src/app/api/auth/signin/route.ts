import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface formData {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const res: formData = await request.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(res.email),
      errormessage: "Email is invalid",
    },
    {
      valid: validator.isLength(res.password, {
        min: 5,
      }),
      errormessage: "Password is invalid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errormessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ errormessage: errors[0] });
  }

  const user = await prisma.user.findMany({
    where: {
      email: res.email,
    },
  });

  if (user.length === 0) {
    return NextResponse.json({ errormessage: "user not found" });
  }

  const hasedPassword = await bcrypt.compare(res.password, user[0].password);
  if (!hasedPassword) {
    return NextResponse.json({ errormessage: "incorrect password" });
  }

  const token = Jwt.sign(
    {
      email: user[0].email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return NextResponse.json({ id: user[0],token });
}
