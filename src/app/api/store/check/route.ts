import { NextResponse } from 'next/server';
import {checkSlug  }  from '@/controllers/store.controller'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }
  const existingStore = await checkSlug(slug);

  return NextResponse.json({ available: !existingStore });
}
