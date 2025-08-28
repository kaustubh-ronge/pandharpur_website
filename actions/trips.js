// // app/actions/trips.js
// "use server";

// import { db } from "@/lib/prisma";
// import { checkUser } from "@/lib/checkUser";

// export async function getTrips() {
//   try {
//     const user = await checkUser();
//     if (!user) throw new Error("Unauthorized");
    
//     const trips = await db.trip.findMany({
//       where: { userId: user.id },
//       orderBy: { createdAt: "desc" }
//     });
//     return trips;
//   } catch (error) {
//     console.error("Error fetching trips:", error);
//     throw new Error("Failed to fetch trips");
//   }
// }

// export async function createTrip(tripData) {
//   try {
//     const user = await checkUser();
//     if (!user) throw new Error("Unauthorized");

//     const trip = await db.trip.create({
//       data: {
//         userId: user.id,
//         destination: tripData.destination,
//         itinerary: tripData.itinerary || [],
//         coverImage: tripData.coverImage,
//       }
//     });
//     return trip;
//   } catch (error) {
//     console.error("Error creating trip:", error);
//     throw new Error("Failed to create trip");
//   }
// }

// export async function updateTripItinerary(tripId, itinerary) {
//   try {
//     const user = await checkUser();
//     if (!user) throw new Error("Unauthorized");

//     const trip = await db.trip.update({
//       where: { id: tripId, userId: user.id },
//       data: { itinerary, updatedAt: new Date() }
//     });
//     return trip;
//   } catch (error) {
//     console.error("Error updating trip:", error);
//     throw new Error("Failed to update trip");
//   }
// }

// export async function deleteTrip(tripId) {
//   try {
//     const user = await checkUser();
//     if (!user) throw new Error("Unauthorized");

//     await db.trip.delete({
//       where: { id: tripId, userId: user.id }
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Error deleting trip:", error);
//     throw new Error("Failed to delete trip");
//   }
// }



"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

export async function getTrips() {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");
    
    const trips = await db.trip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    });
    return trips;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw new Error("Failed to fetch trips");
  }
}

export async function createTrip(tripData) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const trip = await db.trip.create({
      data: {
        userId: user.id,
        destination: tripData.destination,
        itinerary: tripData.itinerary || [],
        coverImage: tripData.coverImage,
      }
    });
    return trip;
  } catch (error)    {
    console.error("Error creating trip:", error);
    throw new Error("Failed to create trip");
  }
}

export async function updateTripItinerary(tripId, itinerary) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("Unauthorized");

    const trip = await db.trip.update({
      where: { id: tripId, userId: user.id },
      data: { itinerary, updatedAt: new Date() }
    });
    return trip;
  } catch (error) {
    console.error("Error updating trip:", error);
    throw new Error("Failed to update trip");
  }
}