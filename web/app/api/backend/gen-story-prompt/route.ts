import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  // story: a list of srings representing the story so far
  const { story } = data;

  //pass story into fastapi backend
  const backendURL = process.env.BACKEND_URL + "/gen-story-prompt" || "";
  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story }),
    });

    const systemPrompt = await response.json();
    console.log("storyPrompt from fastapi backend", systemPrompt);

    // Correctly return a JSON response
    return NextResponse.json(systemPrompt, { status: 200 });
  } catch (error) {
    console.error("Error from fastapi backend ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
