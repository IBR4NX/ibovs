import { NextResponse } from 'next/server';
import {checkSlug  }  from '@/controllers/store.controller'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const existingStore = await checkSlug(slug)

  return NextResponse.json({ available: !existingStore });
}
