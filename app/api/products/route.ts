import Collection from '@/lib/models/Collection'
import Product from '@/lib/models/Product'
import { connectToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        // const { userId } = auth()

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 })
        // }

        await connectToDB()

        const {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        } = await req.json()

        if (
            !title ||
            !description ||
            !media ||
            !category ||
            !price ||
            !expense
        ) {
            return new NextResponse('Not enough data to create a product', {
                status: 400,
            })
        }

        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        })

        if (collections) {
            for (const CollectionId of collections) {
                const collection = await Collection.findById(CollectionId)
                if (collection) {
                    collection.products.push(newProduct._id)
                    await collection.save()
                }
            }
        }

        await newProduct.save()

        return NextResponse.json(newProduct, { status: 200 })
    } catch (error) {
        console.log('[products_POST', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()

        const products = await Product.find()
            .sort({ createdAt: 'desc' })
            .populate({ path: 'collections', model: Collection })

        return new NextResponse(JSON.stringify(products), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': `${process.env.ECOMMERCE_STORE_URL}`,
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        })
    } catch (error) {
        console.log('[products_GET', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
