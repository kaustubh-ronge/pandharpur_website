import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

async function getDashboardData() {
  const subscriptions = await db.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      plan: true,
      user: true,
    },
  });

  const activeCount = subscriptions.filter(
    (s) => s.status === "ACTIVE"
  ).length;
  const pendingCount = subscriptions.filter(
    (s) => s.status === "PENDING_PAYMENT"
  ).length;
  const failedCount = subscriptions.filter(
    (s) => s.status === "PAYMENT_FAILED"
  ).length;

  return {
    subscriptions,
    stats: {
      total: subscriptions.length,
      active: activeCount,
      pending: pendingCount,
      failed: failedCount,
    },
  };
}

export default async function SuperAdminPage() {
  const user = await checkUser();

  if (!user || !user.isSuperAdmin) {
    return (
      <main className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full rounded-xl border bg-white/70 shadow-sm p-8 text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            You are not authorized
          </h1>
          <p className="text-sm text-slate-600">
            This area is only for super admins. If you think this is a mistake,
            please contact the site owner.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-2 border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <a href="/">Go back to home</a>
          </Button>
        </div>
      </main>
    );
  }

  const { subscriptions, stats } = await getDashboardData();

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
            Super Admin Area
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Business Subscriptions
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Review new hotel, bhaktaniwas, restaurant, and travel subscriptions
            here. After verifying payment, you can create or update the
            corresponding entries in Sanity.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total subscriptions
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
              Active
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-700">
              {stats.active}
            </p>
          </div>
          <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">
              Pending payment
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-700">
              {stats.pending}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border bg-white/90 shadow-sm overflow-hidden">
          <div className="border-b px-6 py-4 flex items-center justify-between bg-slate-50/70">
            <h2 className="text-sm font-semibold text-slate-800">
              Latest subscriptions
            </h2>
            <span className="text-xs text-slate-500">
              Showing {subscriptions.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Business</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Review</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No subscriptions yet. Once businesses start buying
                      subscriptions, they will appear here automatically.
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-t border-slate-100 hover:bg-slate-50/60"
                    >
                      <td className="px-6 py-3">
                        <div className="font-medium text-slate-900">
                          {sub.businessName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {sub.city || "City not set"}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-xs font-medium text-slate-700">
                        {sub.businessType}
                      </td>
                      <td className="px-6 py-3">
                        <div className="text-sm text-slate-800">
                          {sub.plan?.name || "Unnamed plan"}
                        </div>
                        <div className="text-xs text-slate-500">
                          ₹{(sub.plan?.priceInPaise || 0) / 100} /{" "}
                          {sub.plan?.durationMonths || 3} months
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            sub.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                              : sub.status === "PENDING_PAYMENT"
                              ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                              : sub.status === "PAYMENT_FAILED"
                              ? "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
                              : "bg-slate-50 text-slate-700 ring-1 ring-slate-100"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            sub.reviewStatus === "REVIEWED"
                              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                              : "bg-slate-50 text-slate-700 ring-1 ring-slate-100"
                          }`}
                        >
                          {sub.reviewStatus === "REVIEWED"
                            ? "Reviewed in Sanity"
                            : "Pending review"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-xs text-slate-700">
                        <div>{sub.contactPersonName}</div>
                        <div>{sub.contactPhone}</div>
                        {sub.contactEmail && (
                          <div className="text-slate-500">
                            {sub.contactEmail}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3 text-xs text-slate-500">
                        {new Date(sub.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}


