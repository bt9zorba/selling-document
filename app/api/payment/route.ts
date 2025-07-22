import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { orderId, amount, method } = await req.json();
  // TODO: Tích hợp cổng thanh toán thực tế
  // Tạm thời trả về link thanh toán giả lập
  const paymentUrl = `https://sandbox-payment.com/pay?orderId=${orderId}&amount=${amount}&method=${method}`;
  return NextResponse.json({ success: true, paymentUrl });
} 