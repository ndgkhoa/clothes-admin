import { connectToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import Collection from '@/lib/models/Collection'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        // const { userId } = auth()

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 403 })
        // }

        await connectToDB()

        const { title, description, image } = await req.json()

        const existingCollection = await Collection.findOne({ title })

        if (existingCollection) {
            return new NextResponse('Collection already exists', {
                status: 400,
            })
        }

        if (!title || !image) {
            return new NextResponse('Title and image are required', {
                status: 400,
            })
        }

        const newCollection = await Collection.create({
            title,
            description,
            image,
        })

        await newCollection.save()

        return NextResponse.json(newCollection, { status: 200 })
    } catch (error) {
        console.log('[collections_POST]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()

        const collections = await Collection.find().sort({ createAt: 'desc' })

        return new NextResponse(JSON.stringify(collections), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': `${process.env.ECOMMERCE_STORE_URL}`,
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        })
    } catch (error) {
        console.log('[collections_GET]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export const dynamic = 'force-dynamic'
