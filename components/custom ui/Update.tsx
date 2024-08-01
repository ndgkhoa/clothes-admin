import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface UpdateProps {
    id: string
}

const Update: React.FC<UpdateProps> = ({ id }) => {
    const router = useRouter()
    return (
        <Button className="bg-green-700 text-white mr-2" onClick={() => router.push(`/collections/${id}`)}>
            <Pencil className="h-4 w-4" />
        </Button>
    )
}

export default Update
