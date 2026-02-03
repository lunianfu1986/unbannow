import { NextResponse } from 'next/server';

   export async function GET() {
     return NextResponse.json({
       hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
       hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
       hasSecret: !!process.env.KEYSTATIC_SECRET,
       clientIdLength: process.env.KEYSTATIC_GITHUB_CLIENT_ID?.length || 0,
       clientSecretLength: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.length || 0,
       secretLength: process.env.KEYSTATIC_SECRET?.length || 0,
     });
   }
