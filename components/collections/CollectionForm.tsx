'use client'

import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import ImageUpload from '../custom ui/ImageUpload'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Delete from '../custom ui/Delete'

const formSchema = z.object({
    title: z.string().min(2).max(60),
    description: z.string().min(2).max(600).trim(),
    image: z.string(),
})

interface CollectionFormProps {
    initialData?: CollectionType | null
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                  title: '',
                  description: '',
                  image: '',
              },
    })

    const handleKeyProps = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/collections/${initialData._id}`
                : '/api/collections'
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            })
            if (res.ok) {
                setLoading(false)
                toast.success(
                    `Collection ${initialData ? 'updated' : 'created'}`,
                )
                window.location.href = '/collections'
                router.push('/collections')
            }
        } catch (error) {
            console.log('[collections_POST', error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading2-bold">Edit Collection</p>
                    <Delete item="collection" id={initialData._id} />
                </div>
            ) : (
                <p className="text-heading2-bold">Create Collection</p>
            )}
            <Separator className="bg-grey-1 mt-4 mb-7" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
                                        {...field}
                                        onKeyDown={handleKeyProps}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                        rows={5}
                                        onKeyDown={handleKeyProps}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Submit
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push('/collections')}
                            className="bg-blue-1 text-white"
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CollectionForm
