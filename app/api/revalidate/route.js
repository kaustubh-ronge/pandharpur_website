import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { bruteForceLimiter } from '@/lib/arcjet'
import { headers } from 'next/headers'

export async function POST(req) {
    // Arcjet Protection
    const decision = await bruteForceLimiter.protect(req);

    if (decision.isDenied()) {
        return new NextResponse('Access Denied', { status: 403 });
    }
    try {
        const { searchParams } = new URL(req.url)
        const secret = searchParams.get('secret')

        // 1. Verify the secret to prevent unauthorized revalidation attempts
        if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
            return new NextResponse('Invalid secret', { status: 401 })
        }

        const body = await req.json()
        const { _type } = body

        if (!_type) {
            return new NextResponse('Bad Request: Missing type', { status: 400 })
        }

        // 2. Revalidate by tag
        revalidateTag(_type)

        return NextResponse.json({ revalidated: true, now: Date.now() })
    } catch (err) {
        return new NextResponse('Error revalidating', { status: 500 })
    }
}