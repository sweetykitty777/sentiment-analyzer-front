import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { UploadEntry, UploadFull } from "@/models/api";
import { Badge } from "../ui/badge";

const columns: ColumnDef<UploadEntry>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: (cell) => cell.row.index + 1,
  },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: (cell) => {
      return <SentimentBadge sentiment={cell.row.original.sentiment} />;
    },
  },
];

export default function UploadEntries({ upload }: { upload: UploadFull }) {
  return (
    <>
      <section>
        <Card className="mx-auto w-full max-w-screen-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={upload.entries} columns={columns} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export function SentimentBadge({
  sentiment,
}: {
  sentiment: UploadEntry["sentiment"];
}) {
  const { text, tw_class } = mapSentiment(sentiment);
  return (
    <Badge variant="secondary" className={"ring-0 " + tw_class}>
      {text}
    </Badge>
  );
}

function DataTable({
  data,
  columns,
}: {
  data: UploadEntry[];
  columns: ColumnDef<UploadEntry>[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    </div>
  );
}

export function mapSentiment(sentiment: string): {
  text: string;
  tw_class: string;
} {
  switch (sentiment) {
    case "very_negative":
      return { text: "Very Negative", tw_class: "bg-red-400" };
    case "negative":
      return { text: "Negative", tw_class: "bg-red-200" };
    case "neutral":
      return { text: "Neutral", tw_class: "bg-gray-200" };
    case "positive":
      return { text: "Positive", tw_class: "bg-green-200" };
    case "very_positive":
      return { text: "Very Positive", tw_class: "bg-green-400" };
  }
  return { text: "Unknown", tw_class: "bg-gray-200" };
}
