import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const { refId } = await req.json();  // From ?ref=token
  if (!token || !refId) return NextResponse.json({ error: 'Invalid referral' });

  const referrer = await prisma.user.findUnique({ where: { id: refId } });
  if (referrer) {
    await prisma.user.update({
      where: { id: refId },
      data: { referrals: referrer.referrals + 1 },
    });
    // Auto-assign VIP role if >100
    if (referrer.referrals + 1 > 100) {
      await prisma.user.update({
        where: { id: refId },
        data: { role: 'vip' },
      });
    }
  }
  return NextResponse.json({ message: 'Referral counted! Check Discord for role update.' });
}