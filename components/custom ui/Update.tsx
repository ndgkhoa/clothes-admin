import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface UpdateProps {
    item: string
    id: string
}

const Update: React.FC<UpdateProps> = ({ item, id }) => {
    const router = useRouter()
    const itemType = item === 'product' ? 'products' : 'collections'
    return (
        <Button className="bg-blue-500 text-white mr-2" onClick={() => router.push(`/${itemType}/${id}`)}>
            <Pencil className="h-4 w-4" />
        </Button>
    )
}

export default Update
