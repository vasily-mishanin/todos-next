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
            <th key={col} className='p-2'>
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className='bg-blue-200'>
        {rows.map((row) => (
          <tr>
            {Object.keys(row).map((key) => (
              <td className='px-4 py-2'>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
