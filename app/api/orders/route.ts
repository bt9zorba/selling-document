import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  // TODO: Lưu đơn hàng vào database hoặc file
  // Tạm thời trả về mã đơn hàng giả lập
  const orderId = 'ORD' + Date.now();
  return NextResponse.json({ success: true, orderId });
} 