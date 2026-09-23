import supabase from "@/server/database/client";
import { DEFAULT_OBJECT_ID, ReviewStatus } from "@/utilities/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("project_id", DEFAULT_OBJECT_ID);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { description } = await req.json();
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        description,
        project_id: DEFAULT_OBJECT_ID,
        status: ReviewStatus.PENDING,
      },
    ]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const { id, approved } = await req.json();
  const { data, error } = await supabase
    .from("comments")
    .update({
      status: approved ? ReviewStatus.APPROVED : ReviewStatus.REJECTED,
    })
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
