import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { contratosApi } from '../../api/contratos'
import type { Contrato, ContratoFiltro } from '../../api/types'
import { useLookups } from '../../hooks/useLookups'
import { StatusDot } from '../../components/StatusDot'
import type { StatusTone } from '../../components/StatusDot'

const filtroInicial: ContratoFiltro = {}

function statusContrato(c: Contrato): { label: string; tone: StatusTone } {
  if (c.dataDistrato) return { label: 'Distratado', tone: 'neutral' }
  if (c.dataFim && new Date(c.dataFim) < new Date()) return { label: 'Vencido', tone: 'danger' }
  return { label: 'Ativo', tone: 'success' }
}

export function ContratoLista() {
  const lookups = useLookups()
  const [filtro, setFiltro] = useState<ContratoFiltro>(filtroInicial)
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [erro, setErro] = useState<string | null>(null)
  const [pesquisado, setPesquisado] = useState(false)

  const buscar = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setErro(null)
    try {
      const resultado = await contratosApi.pesquisar(filtro)
      setContratos(resultado)
      setPesquisado(true)
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao pesquisar')
    }
  }

  const campo = (patch: Partial<ContratoFiltro>) => setFiltro((f) => ({ ...f, ...patch }))

  if (lookups.carregando) return <p className="page text-sm text-muted dark:text-muted-dark">Carregando...</p>

  return (
    <div className="page max-w-6xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="page-title">Contratos</h1>
        <Link to="/contratos/novo" className="btn-primary">
          Novo Contrato
        </Link>
      </div>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={buscar} className="panel mb-6 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="field">
          Código Processo
          <input className="input" value={filtro.codigoProcesso ?? ''} onChange={(e) => campo({ codigoProcesso: e.target.value })} />
        </label>
        <label className="field">
          Código Contrato
          <input className="input" value={filtro.codigoContrato ?? ''} onChange={(e) => campo({ codigoContrato: e.target.value })} />
        </label>
        <label className="field">
          Tipo de Contrato
          <select className="input" value={filtro.tipoContratoId ?? ''} onChange={(e) => campo({ tipoContratoId: e.target.value ? Number(e.target.value) : undefined })}>
            <option value="">Todos</option>
            {lookups.tiposContrato.map((t) => (
              <option key={t.id} value={t.id}>{t.tipo}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Emissor
          <select className="input" value={filtro.emissor ?? ''} onChange={(e) => campo({ emissor: (e.target.value || undefined) as ContratoFiltro['emissor'] })}>
            <option value="">Todos</option>
            {lookups.enums.emissores.map((e) => (
              <option key={e.sigla} value={e.sigla}>{e.descricao}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Data Início
          <input type="date" className="input" value={filtro.dataInicio ?? ''} onChange={(e) => campo({ dataInicio: e.target.value || undefined })} />
        </label>
        <label className="field">
          Data Fim
          <input type="date" className="input" value={filtro.dataFim ?? ''} onChange={(e) => campo({ dataFim: e.target.value || undefined })} />
        </label>
        <label className="field">
          Centro de Custo
          <select className="input" value={filtro.centroDeCustoId ?? ''} onChange={(e) => campo({ centroDeCustoId: e.target.value ? Number(e.target.value) : undefined })}>
            <option value="">Todos</option>
            {lookups.centrosDeCusto.map((c) => (
              <option key={c.id} value={c.id}>{c.codigo} - {c.descricao}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Departamento
          <select className="input" value={filtro.departamentoId ?? ''} onChange={(e) => campo({ departamentoId: e.target.value ? Number(e.target.value) : undefined })}>
            <option value="">Todos</option>
            {lookups.departamentos.map((d) => (
              <option key={d.id} value={d.id}>{d.nome}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Unidade
          <select className="input" value={filtro.unidadeId ?? ''} onChange={(e) => campo({ unidadeId: e.target.value ? Number(e.target.value) : undefined })}>
            <option value="">Todos</option>
            {lookups.unidades.map((u) => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </label>
        <div className="col-span-full">
          <button type="submit" className="btn-primary">Buscar</button>
        </div>
      </form>

      {pesquisado && (
        <div className="panel">
          <table className="table-base">
            <thead>
              <tr>
                <th>Processo</th>
                <th>Unidade</th>
                <th>Tipo</th>
                <th>F/C</th>
                <th>Entidade</th>
                <th>Centro Custo</th>
                <th>Valor</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contratos.map((c) => {
                const status = statusContrato(c)
                return (
                  <tr key={c.id}>
                    <td>{c.codigoProcesso}</td>
                    <td>{c.unidade.nome}</td>
                    <td>{c.tipoContrato.tipo}</td>
                    <td>{c.contraparte.tipoEntidade}</td>
                    <td>{c.contraparte.razaoSocial}</td>
                    <td>{c.centroDeCusto.descricao}</td>
                    <td className="font-mono tabular-nums">{c.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td><StatusDot tone={status.tone}>{status.label}</StatusDot></td>
                    <td className="flex gap-3">
                      <Link to={`/contratos/${c.id}/editar`} className="link-action">Editar</Link>
                      <Link to={`/contratos/${c.id}/aditivo`} className="link-action">Aditivo</Link>
                      <Link to={`/contratos/${c.id}/distrato`} className="link-action">Distrato</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
