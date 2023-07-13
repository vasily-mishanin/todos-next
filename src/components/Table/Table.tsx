import { v4 as uuidv4 } from 'uuid';

type TableProps = {
  columns: string[];
  rows: Record<any, any>[];
};

export default function Table({ columns, rows }: TableProps) {
  return (
    <table>
      <thead className='bg-blue-400'>
        <tr>
          {columns.map((col) => (
            <th key={col} className='px-4 py-2 text-left'>
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className='bg-blue-200'>
        {rows.map((row) => (
          <tr key={uuidv4()}>
            {Object.keys(row).map((key) => (
              <td key={key} className='px-4 py-2 text-left text-sm'>
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}