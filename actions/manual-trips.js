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
  console.log("\n--- [ACTION: getManualTrips] Received a new request ---");
  try {
    console.log(
      "[ACTION: getManualTrips] Step 1: Checking user authentication..."
    );
    const user = await checkUser();
    console.log("_____________manual trip user ", user)
    if (!user) throw new Error("Authentication failed.");
    console.log(
      `[ACTION: getManualTrips] Step 1 SUCCESS: User authenticated (ID: ${user.id})`
    );

    console.log(
      "[ACTION: getManualTrips] Step 2: Fetching records from database..."
    );
    const trips = await db.manualTrip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    console.log(
      `[ACTION: getManualTrips] Step 2 SUCCESS: Found ${trips.length} records.`
    );

    const processedTrips = trips.map((trip) => ({
      ...trip,
      locations: JSON.parse(trip.locations),
    }));
    console.log(
      "--- [ACTION: getManualTrips] Request completed successfully ---\n"
    );
    return { success: true, trips: processedTrips };
  } catch (error) {
    console.error("\n--- [ACTION: getManualTrips] CRITICAL FAILURE ---");
    console.error(
      `[ACTION: getManualTrips] The process failed. Error: ${error.message}`
    );
    console.error("----------------------------------------\n");
    return { success: false, error: error.message };
  }
}

export async function deleteManualTrip(id) {
  console.log(
    `\n--- [ACTION: deleteManualTrip] Received a new request for ID: ${id} ---`
  );
  try {
    console.log(
      "[ACTION: deleteManualTrip] Step 1: Checking user authentication..."
    );
    const user = await checkUser();
    if (!user) throw new Error("Authentication failed.");
    console.log(
      `[ACTION: deleteManualTrip] Step 1 SUCCESS: User authenticated (ID: ${user.id})`
    );

    console.log(
      `[ACTION: deleteManualTrip] Step 2: Attempting to delete record ${id} from database...`
    );
    await db.manualTrip.delete({ where: { id, userId: user.id } });
    console.log(
      `[ACTION: deleteManualTrip] Step 2 SUCCESS: Record ${id} deleted.`
    );

    console.log(
      "--- [ACTION: deleteManualTrip] Request completed successfully ---\n"
    );
    return { success: true };
  } catch (error) {
    console.error("\n--- [ACTION: deleteManualTrip] CRITICAL FAILURE ---");
    console.error(
      `[ACTION: deleteManualTrip] The process failed. Error: ${error.message}`
    );
    console.error("----------------------------------------\n");
    return { success: false, error: error.message };
  }
}
