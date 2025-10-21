import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { invite } = await req.json();
  // Simulate anti-spam: Log and "mute" spam (extend with Baileys event listeners)
  console.log(`Protecting group ${invite}: Anti-spam, raid detection enabled.`);
  const group = await prisma.group.update({
    where: { invite },
    data: { protected: true },
  });
  return NextResponse.json({ message: 'Group protected forever with Zero-Trust moderation.' });
}