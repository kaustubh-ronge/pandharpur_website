import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "₹1,000",
    duration: "3 months",
    idealFor: "New listings and seasonal stays",
    features: [
      "Listing in your chosen category",
      "Basic placement in search",
      "Email support",
    ],
  },
  {
    name: "Standard",
    price: "₹1,500",
    duration: "3 months",
    idealFor: "Hotels, bhaktaniwas & restaurants",
    features: [
      "Priority placement",
      "Highlight badge on cards",
      "WhatsApp & email support",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹2,000",
    duration: "3 months",
    idealFor: "High-traffic or multi-property owners",
    features: [
      "Top placement across pages",
      "Custom spotlight section",
      "Dedicated success manager",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-orange-50/60 to-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-orange-500">
            Pricing
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Simple plans for 3-month subscriptions
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Pick a plan that matches your property. You can always upgrade by
            contacting the admin team. Payments are processed securely via
            Razorpay.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-white/90 shadow-sm p-6 flex flex-col h-full ${
                plan.highlight
                  ? "border-orange-200 ring-2 ring-orange-100"
                  : "border-slate-100"
              }`}
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-orange-500">
                  {plan.duration}
                </p>
                <h2 className="text-xl font-semibold text-slate-900">
                  {plan.name}
                </h2>
                <p className="text-sm text-slate-500">{plan.idealFor}</p>
                <p className="text-3xl font-bold text-slate-900">
                  {plan.price}
                </p>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Choose plan
                </Button>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white/90 shadow-sm p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-orange-500">
                Need something custom?
              </p>
              <h3 className="text-xl font-semibold text-slate-900">
                Enterprise & seasonal promotions
              </h3>
              <p className="text-sm text-slate-600">
                If you have multiple properties or need a bespoke promotion
                period, reach out. The admin team can tailor a plan and publish
                your listing accordingly.
              </p>
            </div>
            <div className="md:text-right">
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                Contact admin team
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


