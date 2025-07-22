import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email, downloadLink } = await req.json();
  // TODO: Cấu hình transporter thực tế
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: 'Link tải tài liệu của bạn',
    text: `Cảm ơn bạn đã mua tài liệu. Link tải: ${downloadLink}`,
    html: `<p>Cảm ơn bạn đã mua tài liệu.</p><p>Link tải: <a href="${downloadLink}">${downloadLink}</a></p>`,
  });
  return NextResponse.json({ success: true });
} 