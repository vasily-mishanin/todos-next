import { v4 as uuidv4 } from 'uuid';

type TableHeadProps = {
  columns: string[];
};

export default function TableHead({ columns }: TableHeadProps) {
  return (
    <thead className='bg-blue-400'>
      <tr>
        {columns.map((col) => (
          <th key={col} className='px-4 py-2 text-left'>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
