import { connectToDB } from '@/lib/mongoDB'
import Customer from '@/lib/models/Customer'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/customers/CustomerColumn'

const Customers = async () => {
    await connectToDB()

    const customers = await Customer.find().sort({ createdAt: 'desc' })

    return (
        <div className="px-10 py-5">
            <div className="text-heading2-bold">Customers</div>
            <Separator className="bg-grey-1 my-5" />
            <DataTable columns={columns} data={customers} searchKey="name" />
        </div>
    )
}

export default Customers

export const dynamic = 'force-dynamic'
