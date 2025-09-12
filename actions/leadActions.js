// // FILE: actions/leadActions.js
// "use server";

// import { db } from "@/lib/prisma";

// // Action for the Inquiry Form
// export async function logInquiryLead(leadData, userId) {
//   if (!userId) return { success: false, error: "User is not authenticated." };
//   try {
//     // Write to the master Lead table
//     await db.lead.create({
//       data: {
//         userName: leadData.name,
//         userPhone: leadData.phone,
//         actionType: "whatsapp_inquiry_form",
//         entityId: leadData.hotelSlug,
//         entityType: "hotel",
//         userId: userId,
//       },
//     });
//     // Write to the clean Inquiry table
//     await db.inquiry.create({
//       data: {
//         userName: leadData.name,
//         userPhone: leadData.phone,
//         hotelSlug: leadData.hotelSlug,
//         userId: userId,
//       },
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to log inquiry lead:", error);
//     return { success: false };
//   }
// }

// // Action for the "Details" button click
// export async function logDetailsView(hotelSlug, userId) {
//   if (!hotelSlug) return { success: false, error: "Hotel slug is required." };
//   try {
//     await db.lead.create({
//       data: {
//         userName: userId ? "Logged In User" : "Anonymous",
//         userPhone: "N/A", 
//         actionType: "details_view",
//         entityId: hotelSlug,
//         entityType: "hotel",
//         userId: userId || null,
//       },
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to log details view:", error);
//     return { success: false };
//   }
// }

"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

// Action for the Inquiry Form
export async function logInquiryLead(leadData) {
  try {
    // Ensure user exists in Prisma (linked to Clerk)
    const user = await checkUser();
    if (!user) {
      return { success: false, error: "User is not authenticated." };
    }

    // Write to the master Lead table
    await db.lead.create({
      data: {
        userName: leadData.name,
        userPhone: leadData.phone,
        actionType: "whatsapp_inquiry_form",
        entityId: leadData.hotelSlug,
        entityType: "hotel",
        userId: user.id, // ✅ guaranteed valid Prisma User ID
      },
    });

    // Write to the clean Inquiry table
    await db.inquiry.create({
      data: {
        userName: leadData.name,
        userPhone: leadData.phone,
        hotelSlug: leadData.hotelSlug,
        userId: user.id, // ✅ guaranteed valid Prisma User ID
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to log inquiry lead:", error);
    return { success: false, error: "Database error" };
  }
}

// Action for the "Details" button click
export async function logDetailsView(hotelSlug) {
  if (!hotelSlug) {
    return { success: false, error: "Hotel slug is required." };
  }

  try {
    // Ensure user exists in Prisma (optional for details)
    const user = await checkUser();

    await db.lead.create({
      data: {
        userName: user ? "Logged In User" : "Anonymous",
        userPhone: "N/A",
        actionType: "details_view",
        entityId: hotelSlug,
        entityType: "hotel",
        userId: user ? user.id : null, // ✅ nullable FK works for Lead
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to log details view:", error);
    return { success: false, error: "Database error" };
  }
}
