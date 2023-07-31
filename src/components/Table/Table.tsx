import { v4 as uuidv4 } from 'uuid';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';

type TableProps = {
  columns: string[];
  rows: Record<any, any>[];
};

export default function Table({ columns, rows }: TableProps) {
  return (
    <table>
      <TableHead columns={columns}></TableHead>
      <TableBody rowsData={rows} />
    </table>
  );
}
