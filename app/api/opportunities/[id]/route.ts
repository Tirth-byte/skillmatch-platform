import { NextRequest, NextResponse } from "next/server";
import { opportunities } from "@/lib/data/opportunities";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const opportunity = opportunities.find(op => op.id === id);

    if (!opportunity) {
        return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    return NextResponse.json(opportunity);
}
