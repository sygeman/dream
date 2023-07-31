import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, data } = await request.json();

  if (name === 'skipYoutubeTrack') {
    console.log(data);
  }

  NextResponse.json({ done: true });
}
