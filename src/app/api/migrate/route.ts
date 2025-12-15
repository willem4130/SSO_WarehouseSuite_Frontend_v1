import { NextResponse } from "next/server";
import { db } from "@/server/db";

// One-time migration route to add screenshots column
// DELETE THIS FILE after running once in production
export async function GET() {
  try {
    // Add screenshots column if it doesn't exist
    await db.$executeRaw`
      ALTER TABLE "Feedback"
      ADD COLUMN IF NOT EXISTS "screenshots" TEXT[] DEFAULT ARRAY[]::TEXT[]
    `;

    return NextResponse.json({
      success: true,
      message: "Database schema synced successfully - screenshots column added",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
