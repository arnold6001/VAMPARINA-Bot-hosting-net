import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const groups = await prisma.group.findMany({ include: { user: true } });
  for (const group of groups) {
    // Simulate Baileys send: In production, use persistent Baileys to message group
    console.log(`Bumping group ${group.invite} for user ${group.user.id}: "Boost your WhatsApp group! 🧛‍♀️"`);
    await prisma.group.update({
      where: { id: group.id },
      data: { bumpCount: group.bumpCount + 1 },
    });
  }
  return NextResponse.json({ message: 'Hourly bumps completed for all permanent groups' });
}