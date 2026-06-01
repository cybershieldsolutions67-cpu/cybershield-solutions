import { NextResponse } from 'next/server';

export function proxy(request) {
  // 1. Generate a secure, unique random cryptographic nonce for each request
  // Using web-compatible crypto APIs since Node's crypto module is not fully exposed in Edge runtimes
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  
  // Convert binary to base64
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  const nonce = btoa(binary);

  // 2. Define the Content Security Policy incorporating the dynamic nonce
  // For production, we require 'nonce-<value>' for script-src and style-src,
  // while fallbacking gracefully. We allow self, maps iframe, google fonts, and the dynamic nonce.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com data:;
    frame-src 'self' https://www.google.com;
    img-src 'self' data: blob:;
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  // 3. Set the CSP in Request headers so Next.js pages/layouts can access it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // 4. Set the CSP in Response headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// Configure middleware matcher to run on all page routes except assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
