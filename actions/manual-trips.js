"use server";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

export async function createManualTrip(data) {
  try {
    const user = await checkUser();
    if (!user)
      throw new Error(
        "Authentication failed: User not found or not logged in."
      );

    const { title, dateRange, locations, preferences } = data;
    const locationsJsonString = JSON.stringify(locations);

    const trip = await db.manualTrip.create({
      data: {
        userId: user.id,
        title,
        preferences,
        startDate: dateRange.from,
        endDate: dateRange.to,
        locations: locationsJsonString,
      },
    });
    
    return { success: true, trip };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getManualTrips() {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");

    const trips = await db.manualTrip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const processedTrips = trips.map((trip) => ({
      ...trip,
      locations: JSON.parse(trip.locations),
    }));

    return { success: true, trips: processedTrips };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteManualTrip(id) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");

    await db.manualTrip.delete({ where: { id, userId: user.id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
