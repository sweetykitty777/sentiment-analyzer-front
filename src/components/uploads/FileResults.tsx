import { Table } from "flowbite-react";

export default function FileResults({
  resultList,
}: {
  resultList: { text: string; sentiment: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Text</Table.HeadCell>
          <Table.HeadCell>Sentiment</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {resultList.map((result, index) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{index}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {result.text}
              </Table.Cell>
              <Table.Cell>{result.sentiment}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
