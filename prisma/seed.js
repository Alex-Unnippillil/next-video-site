const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.auditEvent.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.playlistVideo.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.video.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice'
    }
  });

  await prisma.session.create({
    data: {
      userId: user.id,
      token: 'sessiontoken',
      expiresAt: new Date(Date.now() + 3600 * 1000)
    }
  });

  const video1 = await prisma.video.create({
    data: {
      userId: user.id,
      title: 'Hello World',
      description: 'First video',
      assets: {
        create: { url: 'http://example.com/video.mp4', type: 'video' }
      }
    }
  });

  const video2 = await prisma.video.create({
    data: {
      userId: user.id,
      title: 'Second Video',
      assets: {
        create: { url: 'http://example.com/video2.mp4', type: 'video' }
      }
    }
  });

  const playlist = await prisma.playlist.create({
    data: {
      userId: user.id,
      name: 'Favorites'
    }
  });

  await prisma.playlistVideo.createMany({
    data: [
      { playlistId: playlist.id, videoId: video1.id, order: 1 },
      { playlistId: playlist.id, videoId: video2.id, order: 2 }
    ]
  });

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      status: 'active',
      startDate: new Date()
    }
  });

  await prisma.payment.create({
    data: {
      userId: user.id,
      subscriptionId: subscription.id,
      amount: 9.99,
      currency: 'USD',
      status: 'paid'
    }
  });

  await prisma.auditEvent.create({
    data: {
      userId: user.id,
      action: 'user.create',
      entity: 'User',
      entityId: user.id
    }
  });

  console.log('Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
