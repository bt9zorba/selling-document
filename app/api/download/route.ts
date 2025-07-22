import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const user = searchParams.get('user'); // tên/email người mua
  // TODO: Kiểm tra token hợp lệ
  if (token !== 'valid') {
    return NextResponse.json({ success: false, message: 'Token không hợp lệ' }, { status: 401 });
  }
  // Đường dẫn file PDF gốc
  const filePath = path.join(process.cwd(), 'public', 'sample.pdf');
  const pdfBytes = await fs.readFile(filePath);
  if (!user) {
    // Không có user, trả về file gốc
    return new Response(pdfBytes, {
      headers: { 'Content-Type': 'application/pdf' }
    });
  }
  // Chèn watermark lên từng trang
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(`Bản quyền: ${user}`, {
      x: 40,
      y: 40,
      size: 16,
      font,
      color: rgb(0.7, 0.7, 0.7),
      opacity: 0.5,
      rotate: degrees(20),
    });
  });
  const watermarkedPdf = await pdfDoc.save();
  return new Response(watermarkedPdf, {
    headers: { 'Content-Type': 'application/pdf' }
  });
} 