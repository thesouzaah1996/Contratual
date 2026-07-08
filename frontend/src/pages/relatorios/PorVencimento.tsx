import { useState } from 'react'
import { ApiError } from '../../api/client'
import { relatoriosApi } from '../../api/relatorios'
import { useLookups } from '../../hooks/useLookups'
import { ResultTable } from '../../components/ResultTable'

export function PorVencimento() {
  const lookups = useLookups()
  const [tipoContratoId, setTipoContratoId] = useState('')
  const [centroDeCustoId, setCentroDeCustoId] = useState('')
  const [unidadeId, setUnidadeId] = useState('')
  const [linhas, setLinhas] = useState<unknown[][] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const gerar = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      const resultado = await relatoriosApi.porVencimento({
        tipoContratoId: tipoContratoId ? Number(tipoContratoId) : undefined,
        centroDeCustoId: centroDeCustoId ? Number(centroDeCustoId) : undefined,
        unidadeId: unidadeId ? Number(unidadeId) : undefined,
      })
      setLinhas(resultado)
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao gerar relatório')
    }
  }

  if (lookups.carregando) return <p className="page text-sm text-muted dark:text-muted-dark">Carregando...</p>

  return (
    <div className="page max-w-4xl">
      <h1 className="page-title mb-4">Relatório por Vencimento (próximos 90 dias)</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={gerar} className="panel mb-6 grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
        <label className="field">
          Tipo de Contrato
          <select className="input" value={tipoContratoId} onChange={(e) => setTipoContratoId(e.target.value)}>
            <option value="">Todos</option>
            {lookups.tiposContrato.map((t) => (
              <option key={t.id} value={t.id}>{t.tipo}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Centro de Custo
          <select className="input" value={centroDeCustoId} onChange={(e) => setCentroDeCustoId(e.target.value)}>
            <option value="">Todos</option>
            {lookups.centrosDeCusto.map((c) => (
              <option key={c.id} value={c.id}>{c.codigo} - {c.descricao}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Unidade
          <select className="input" value={unidadeId} onChange={(e) => setUnidadeId(e.target.value)}>
            <option value="">Todas</option>
            {lookups.unidades.map((u) => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </label>
        <div className="col-span-full">
          <button type="submit" className="btn-primary">Gerar</button>
        </div>
      </form>

      {linhas && (
        <ResultTable
          headers={['Processo', 'Contrato', 'Entidade', 'Tipo', 'Unidade', 'Vencimento']}
          rows={linhas}
        />
      )}
    </div>
  )
}
