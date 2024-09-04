import { UploadIcon } from "@radix-ui/react-icons"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Link, useNavigate } from '@tanstack/react-router'
import { buttonVariants } from './ui/button'


interface Upload {
  upload_id: number
  name: string
  entries: number
  uploaded_at: Date
  uploaded_by: string
}

export const columns: ColumnDef<Upload>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "entries",
    header: "Entries",
  },
  {
    accessorKey: "uploaded_at",
    header: "Created At",
    cell: ({ row }) => {
      return row.original.uploaded_at.toLocaleString()
    }
  },
  {
    accessorKey: "uploaded_by",
    header: "Owner"
  }
]

export function DataTable({ data, columns }: { data: Upload[]; columns: ColumnDef<Upload>[] }) {

  const navigate = useNavigate()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
 
  return (
    <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (                  
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => navigate({to: `/uploads/${row.original.upload_id}`})}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
  )
}

let data: Upload[] = []
for (let index = 0; index < 10; index++) {
  data.push({upload_id: index, name: "My Upload", entries: 10024, uploaded_at: new Date("2024-03-12 12:35"), uploaded_by: "Olga Schavochkina"})
  
}


export default function UploadsList() {
  return (
    <section>
    <Card className="w-full max-w-screen-lg mx-auto">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>
          My Uploads
        </CardTitle>
      <Link className={buttonVariants({ variant: "default" })}>
        <UploadIcon className="mr-2 h-4 w-4" />  Upload File
      </Link>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={columns} />
      </CardContent>
    </Card>
    </section>
  )
}
