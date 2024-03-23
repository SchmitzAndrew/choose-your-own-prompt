import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300;

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.json();

    const {prompt} = data;
