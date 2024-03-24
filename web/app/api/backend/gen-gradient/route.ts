import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest, res: NextResponse) {
    const data = await req.json();
    // story: a list of srings representing the story so far
    const { story } = data;
    console.log('story: ', story)

    //pass story into fastapi backend
    const backendURL = (await process.env.BACKEND_URL) + "/gen-decisions" || "";
    try{
        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({story})
            });
            const decisions = await  response.json(); // This line extracts the JSON body content of the response
        return new NextResponse(JSON.stringify({decisions}), {status: 200});
    } catch (error) {
        console.error('Error from fastapi backend ', error )
        return NextResponse.json({error: error}, {status: 500});
    }
}