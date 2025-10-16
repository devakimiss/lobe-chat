import { NextRequest, NextResponse } from 'next/server';

// Simple handler that doesn't import OIDC provider during build
const handler = async (req: NextRequest) => {
  // Skip OIDC processing during build time
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    return new NextResponse('OIDC not available during build', { status: 503 });
  }

  // Dynamic import to avoid loading OIDC provider during build
  const { default: oidcHandler } = await import('./oidc-handler');
  return oidcHandler(req);
};

// Simple handlers that don't initialize OIDC during build
const buildTimeHandler = async () =>
  new NextResponse('Service unavailable during build', { status: 503 });

export const GET =
  process.env.NODE_ENV === 'production' && !process.env.VERCEL ? buildTimeHandler : handler;
export const POST =
  process.env.NODE_ENV === 'production' && !process.env.VERCEL ? buildTimeHandler : handler;
export const PUT =
  process.env.NODE_ENV === 'production' && !process.env.VERCEL ? buildTimeHandler : handler;
export const DELETE =
  process.env.NODE_ENV === 'production' && !process.env.VERCEL ? buildTimeHandler : handler;
export const PATCH =
  process.env.NODE_ENV === 'production' && !process.env.VERCEL ? buildTimeHandler : handler;
