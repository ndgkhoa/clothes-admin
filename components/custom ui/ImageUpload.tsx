import { CldUploadWidget } from 'next-cloudinary'
import { Plus, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import React from 'react'

interface ImageUploadProps {
    value: string[]
    onChange: (value: string[]) => void
    onRemove: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    onRemove,
}) => {
    const onUpload = (result: any) => {
        const imageUrl = result.info.secure_url

        if (!value.includes(imageUrl)) {
            onChange([...value, imageUrl])
        }
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px]">
                        <div className="absolute top-0 right-0 z-10">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                size="sm"
                                className="bg-red-1 text-white"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            src={url}
                            alt="uploaded image"
                            className="object-cover rounded-lg"
                            fill
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget
                uploadPreset="ff7tib63"
                options={{
                    folder: 'clothes',
                }}
                onUpload={onUpload}
            >
                {({ open }) => (
                    <Button
                        type="button"
                        onClick={() => open()}
                        className="bg-grey-1 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Image
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload
