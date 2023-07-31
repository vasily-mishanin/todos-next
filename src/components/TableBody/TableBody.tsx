import { v4 as uuidv4 } from 'uuid';
import TableHead from '../TableHead/TableHead';

type TableBodyProps = {
  rowsData: Record<any, any>[];
};

export default function TableBody({ rowsData }: TableBodyProps) {
  return (
    <tbody>
      {rowsData.map((row) => (
        <tr
          className='bg-blue-100 odd:bg-green-50 border-b border-blue-400'
          key={uuidv4()}
        >
          {Object.keys(row).map((key) => (
            <td key={key} className='px-4 py-2 text-left text-sm'>
              {row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
