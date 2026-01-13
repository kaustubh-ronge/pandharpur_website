"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedSubscriptionPlans } from "@/actions/seedPlans";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SeedPlansButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    setIsLoading(true);
    try {
      const result = await seedSubscriptionPlans();
      if (result.success) {
        toast.success("Subscription plans seeded successfully!");
        if (result.results) {
          result.results.forEach((r) => {
            toast.info(`${r.action}: ${r.plan} - ${r.price}`);
          });
        }
      } else {
        toast.error(result.error || "Failed to seed plans");
      }
    } catch (error) {
      toast.error("An error occurred while seeding plans");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSeed}
      disabled={isLoading}
      variant="outline"
      className="border-orange-500 text-orange-600 hover:bg-orange-50"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Seeding...
        </>
      ) : (
        "Seed Subscription Plans (₹1000, ₹1500, ₹2000)"
      )}
    </Button>
  );
}
