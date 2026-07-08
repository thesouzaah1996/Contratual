import { useEffect, useState } from 'react'
import { relatoriosApi } from '../api/relatorios'
import type { Dashboard } from '../api/types'
import { ApiError } from '../api/client'

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel">
      <div className="border-b border-line bg-line/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted dark:border-line-dark dark:bg-line-dark/10 dark:text-muted-dark">
        {title}
      </div>
      <ul className="divide-y divide-line/60 dark:divide-line-dark/60">{children}</ul>
    </div>
  )
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-center justify-between px-3 py-1.5 text-sm">
      <span>{label}</span>
      <span className="font-mono tabular-nums text-ink dark:text-ink-dark">{value}</span>
    </li>
  )
}

export function Home() {
  const [dados, setDados] = useState<Dashboard | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    relatoriosApi.dashboard().then(setDados).catch((e: ApiError) => setErro(e.message))
  }, [])

  if (erro) return <p className="alert-error m-6">{erro}</p>
  if (!dados) return <p className="page text-sm text-muted dark:text-muted-dark">Carregando...</p>

  return (
    <div className="page max-w-6xl">
      <h1 className="page-title mb-6">Contratual — painel de contratos</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Panel title="Vencendo em">
          <Row label="30 dias" value={dados.vencimento30x60x90[0]} />
          <Row label="60 dias" value={dados.vencimento30x60x90[1]} />
          <Row label="90 dias" value={dados.vencimento30x60x90[2]} />
        </Panel>
        <Panel title="Registros">
          {dados.quantidadeDeRegistros.map(([label, qtde]) => (
            <Row key={label} label={label} value={qtde} />
          ))}
        </Panel>
        <Panel title="Centro de custo">
          {dados.quantidadePorCentroCusto.map(([label, qtde]) => (
            <Row key={label} label={label} value={qtde} />
          ))}
        </Panel>
        <Panel title="Tipo de contrato">
          {dados.quantidadePorTipo.map(([label, qtde]) => (
            <Row key={label} label={label} value={qtde} />
          ))}
        </Panel>
        <Panel title="Unidade">
          {dados.quantidadePorUnidade.map(([label, qtde]) => (
            <Row key={label} label={label} value={qtde} />
          ))}
        </Panel>
      </div>
    </div>
  )
}
