import { getSummaryStats } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats = await getSummaryStats();
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json(
            { totalUdhaar: 0, totalCollected: 0, pending: 0 },
            { status: 200 }
        );
    }
}
