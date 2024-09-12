import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TrashIcon, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useLoaderData, useNavigate, useRouter } from "@tanstack/react-router";
import FileUploadDialog from "../FileUploadDialog";
import { Button } from "../ui/button";
import { useAuth } from "react-oidc-context";
import { deleteUpload } from "@/api";
import { Upload } from "@/models/api";
import { useState } from "react";
import UploadStatusBadge from "../UploadStatusBadge";

export function DataTable({
  data,
  columns,
}: {
  data: Upload[];
  columns: ColumnDef<Upload>[];
}) {
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
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
                  onClick={() =>
                    navigate({ to: `/uploads/${row.original.id}` })
                  }
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default function UploadsList() {
  const auth = useAuth();
  const router = useRouter();
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);

  async function handleUploadDelete(e: React.MouseEvent, id: number) {
    setDeleteInProgress(id);
    e.stopPropagation();
    await deleteUpload({ auth, uploadId: id });
    router.invalidate();
    setDeleteInProgress(null);
  }

  const uploads = useLoaderData({ from: "/_auth/uploads" });

  const columns: ColumnDef<Upload>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => {
        return <span className="text-gray-400">{row.original.id}</span>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <UploadStatusBadge status={row.original.status} />;
      },
    },
    {
      accessorKey: "created_at",
      header: "Created at",
    },
    {
      accessorKey: "created_by.email",
      header: "Owner",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleUploadDelete(e, row.original.id)}
            className="float-right text-gray-400"
          >
            {deleteInProgress === row.original.id ? (
              <Loader2 className="h-5 animate-spin" />
            ) : (
              <TrashIcon strokeWidth={2} className="h-4" />
            )}
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <section>
        <Card className="mx-auto w-full max-w-screen-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Uploads</CardTitle>
            <FileUploadDialog />
          </CardHeader>
          <CardContent>
            <DataTable
              data={uploads.sort((a, b) => b.id - a.id)}
              columns={columns}
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
