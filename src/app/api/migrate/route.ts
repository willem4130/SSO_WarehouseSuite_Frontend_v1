import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// One-time migration route to sync database schema
// DELETE THIS FILE after running once in production
export async function GET() {
  try {
    // Run prisma db push to sync schema
    const { stdout, stderr } = await execAsync(
      "npx prisma db push --accept-data-loss"
    );

    return NextResponse.json({
      success: true,
      message: "Database schema synced successfully",
      stdout,
      stderr,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stdout: error.stdout,
        stderr: error.stderr,
      },
      { status: 500 }
    );
  }
}
