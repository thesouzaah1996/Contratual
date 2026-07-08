import { useState } from 'react'
import { ApiError } from '../../api/client'
import { relatoriosApi } from '../../api/relatorios'
import { useLookups } from '../../hooks/useLookups'
import { ResultTable } from '../../components/ResultTable'

export function PorUnidade() {
  const lookups = useLookups()
  const [tipoContratoId, setTipoContratoId] = useState('')
  const [centroDeCustoId, setCentroDeCustoId] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [linhas, setLinhas] = useState<unknown[][] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const gerar = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      const resultado = await relatoriosApi.porUnidade({
        tipoContratoId: tipoContratoId ? Number(tipoContratoId) : undefined,
        centroDeCustoId: centroDeCustoId ? Number(centroDeCustoId) : undefined,
        cnpj: cnpj || undefined,
        dataInicio: dataInicio || undefined,
        dataFim: dataFim || undefined,
      })
      setLinhas(resultado)
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao gerar relatório')
    }
  }

  if (lookups.carregando) return <p className="page text-sm text-muted dark:text-muted-dark">Carregando...</p>

  return (
    <div className="page max-w-4xl">
      <h1 className="page-title mb-4">Relatório por Unidade</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={gerar} className="panel mb-6 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
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
          CNPJ
          <input className="input" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
        </label>
        <label className="field">
          Data Início
          <input type="date" className="input" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </label>
        <label className="field">
          Data Fim
          <input type="date" className="input" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </label>
        <div className="col-span-full">
          <button type="submit" className="btn-primary">Gerar</button>
        </div>
      </form>

      {linhas && <ResultTable headers={['Unidade', 'Qtde', 'Valor total']} rows={linhas} />}
    </div>
  )
}
