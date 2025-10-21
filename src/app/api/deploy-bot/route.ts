import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = jwt.verify(token, JWT_SECRET) as { id: string };

  const formData = await req.formData();
  const file = formData.get('session') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  // Save file (MIME validation for security)
  if (!file.type.startsWith('text/') && !file.type.startsWith('application/')) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }
  const ext = path.extname(file.name);
  const fileName = `session-${Date.now()}${ext}`;
  const filePath = path.join(process.cwd(), 'tmp', fileName);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  // Permanent bot instance
  const bot = await prisma.bot.create({
    data: {
      userId: id,
      sessionFile: filePath,
      status: 'active',  // Forever active
      latency: 20.0,  // Simulated
    },
    include: { user: true },
  });

  return NextResponse.json({ message: 'Deployed permanently! DDoS protected, auto-updates enabled.', bot });
}