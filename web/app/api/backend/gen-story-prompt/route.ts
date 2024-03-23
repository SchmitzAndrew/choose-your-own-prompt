import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest, res: NextResponse) {
    const data = await req.json();
    // story: a list of srings representing the story so far
    const { story } = data;

    //pass story into fastapi backend
    const backendURl = 'process.env.BACKEND_URL
    try{
        const storyPrompt = await fetch(backendURl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({story})
            });
        return NextResponse.json({storyPrompt: storyPrompt}, {status: 200});
    } catch (error) {
        console.error('Error from fastapi backend ', error )
        return NextResponse.json({error: error}, {status: 500});
    }
}
