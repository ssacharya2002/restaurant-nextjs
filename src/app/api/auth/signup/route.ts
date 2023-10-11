import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface formData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  city: string;
  password: string;
}

export async function GET() {
  return NextResponse.json({
    id: "shankra dhunda",
  });
}

export async function POST(request: Request) {
  const res: formData = await request.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(res.firstName, {
        min: 1,
      }),
      errormessage: "First Name is invalid",
    },
    {
      valid: validator.isLength(res.lastName, {
        min: 1,
      }),
      errormessage: "Last Name is invalid",
    },
    {
      valid: validator.isEmail(res.email),
      errormessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(String(res.phoneNumber)),
      errormessage: "Phone Number is invalid",
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

  const userWithEmail = await prisma.user.findMany({
    where: {
      email: res.email,
    },
  });

  if (userWithEmail.length) {
    return NextResponse.json({ errormessage: "Email already exists" });
  }

  const hasedPassword = await bcrypt.hash(res.password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: res.firstName,
      last_name: res.lastName,
      email: res.email,
      phone: String(res.phoneNumber),
      city: res.city,
      password: hasedPassword,
    },
  });

  const token = jwt.sign(
    {
      email: res.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return NextResponse.json({ res: user, token });
}
