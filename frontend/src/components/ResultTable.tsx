interface ResultTableProps {
  headers: string[]
  rows: unknown[][]
}

export function ResultTable({ headers, rows }: ResultTableProps) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted dark:text-muted-dark">Nenhum resultado encontrado.</p>
  }

  return (
    <div className="panel">
      <table className="table-base">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <td key={j}>{String(value ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
