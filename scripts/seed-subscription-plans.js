const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedSubscriptionPlans() {
  console.log('Seeding subscription plans...');

  const plans = [
    {
      name: 'Basic',
      description: 'Basic plan for 3 months',
      priceInPaise: 100000, // ₹1000
      durationMonths: 3,
      isActive: true,
    },
    {
      name: 'Standard',
      description: 'Standard plan for 3 months',
      priceInPaise: 150000, // ₹1500
      durationMonths: 3,
      isActive: true,
    },
    {
      name: 'Premium',
      description: 'Premium plan for 3 months',
      priceInPaise: 200000, // ₹2000
      durationMonths: 3,
      isActive: true,
    },
  ];

  for (const plan of plans) {
    const existing = await prisma.subscriptionPlan.findFirst({
      where: { name: plan.name },
    });

    if (existing) {
      await prisma.subscriptionPlan.update({
        where: { id: existing.id },
        data: plan,
      });
      console.log(`Updated plan: ${plan.name} - ₹${plan.priceInPaise / 100} for ${plan.durationMonths} months`);
    } else {
      await prisma.subscriptionPlan.create({
        data: plan,
      });
      console.log(`Created plan: ${plan.name} - ₹${plan.priceInPaise / 100} for ${plan.durationMonths} months`);
    }
  }

  console.log('Subscription plans seeded successfully!');
}

seedSubscriptionPlans()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
