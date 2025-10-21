import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { botId: string } }) {
  const bot = await prisma.bot.findUnique({ where: { id: params.botId } });
  if (!bot) return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
  // Simulate logs
  return NextResponse.json({ logs: bot.logs || ['Bot active: No issues detected. DDoS safe.'] });
}