"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

/**
 * Seeds or updates subscription plans in the database
 * Only accessible by super admin
 */
export async function seedSubscriptionPlans() {
  try {
    const user = await checkUser();
    if (!user || !user.isSuperAdmin) {
      return { success: false, error: "Not authorized. Super admin access required." };
    }

    const plans = [
      {
        name: "Basic",
        description: "Basic plan for 3 months",
        priceInPaise: 100000, // ₹1000
        durationMonths: 3,
        isActive: true,
      },
      {
        name: "Standard",
        description: "Standard plan for 3 months",
        priceInPaise: 150000, // ₹1500
        durationMonths: 3,
        isActive: true,
      },
      {
        name: "Premium",
        description: "Premium plan for 3 months",
        priceInPaise: 200000, // ₹2000
        durationMonths: 3,
        isActive: true,
      },
    ];

    const results = [];

    for (const plan of plans) {
      const existing = await db.subscriptionPlan.findFirst({
        where: { name: plan.name },
      });

      if (existing) {
        const updated = await db.subscriptionPlan.update({
          where: { id: existing.id },
          data: plan,
        });
        results.push({ action: "updated", plan: updated.name, price: `₹${plan.priceInPaise / 100}` });
      } else {
        const created = await db.subscriptionPlan.create({
          data: plan,
        });
        results.push({ action: "created", plan: created.name, price: `₹${plan.priceInPaise / 100}` });
      }
    }

    return { success: true, results };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
