import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { empresasApi } from '../../api/empresas'
import { unidadesApi } from '../../api/unidades'
import { ApiError } from '../../api/client'
import { StatusDot } from '../../components/StatusDot'
import type { Empresa, Unidade, UnidadeRequest } from '../../api/types'

const defaultValues: UnidadeRequest = {
  nome: '',
  site: 0,
  dimensaoAx: '',
  cnpj: '',
  inativo: false,
  matriz: false,
  empresaId: 0,
}

export function UnidadePage() {
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const form = useForm<UnidadeRequest>({ defaultValues })

  const carregar = () => {
    unidadesApi.listar().then(setUnidades).catch((e: ApiError) => setErro(e.message))
  }

  useEffect(() => {
    carregar()
    empresasApi.listar().then(setEmpresas).catch((e: ApiError) => setErro(e.message))
  }, [])

  const onSubmit = form.handleSubmit(async (dados) => {
    setErro(null)
    const payload = { ...dados, site: Number(dados.site), empresaId: Number(dados.empresaId) }
    try {
      if (editandoId != null) {
        await unidadesApi.editar(editandoId, payload)
      } else {
        await unidadesApi.salvar(payload)
      }
      cancelarEdicao()
      carregar()
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao salvar')
    }
  })

  const editar = (u: Unidade) => {
    form.reset({
      nome: u.nome,
      site: u.site,
      dimensaoAx: u.dimensaoAx,
      cnpj: u.cnpj,
      inativo: u.inativo,
      matriz: u.matriz,
      empresaId: u.empresa.id ?? 0,
    })
    setEditandoId(u.id ?? null)
  }

  const cancelarEdicao = () => {
    form.reset(defaultValues)
    setEditandoId(null)
  }

  const excluir = async (id: number) => {
    if (!confirm('Confirma a exclusão desta unidade?')) return
    try {
      await unidadesApi.excluir(id)
      carregar()
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao excluir')
    }
  }

  return (
    <div className="page max-w-4xl">
      <h1 className="page-title mb-4">Unidades</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={onSubmit} className="panel mb-8 flex flex-wrap items-end gap-4 p-4">
        <label className="field">
          Nome
          <input className="input" {...form.register('nome', { required: true })} />
        </label>
        <label className="field">
          Site
          <input type="number" className="input" {...form.register('site', { required: true })} />
        </label>
        <label className="field">
          Dimensão AX
          <input className="input" {...form.register('dimensaoAx', { required: true })} />
        </label>
        <label className="field">
          CNPJ
          <input className="input" {...form.register('cnpj', { required: true })} />
        </label>
        <label className="field">
          Empresa
          <select className="input" {...form.register('empresaId', { required: true, valueAsNumber: true })}>
            <option value="">Selecione</option>
            {empresas.map((e) => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...form.register('matriz')} />
          Matriz
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...form.register('inativo')} />
          Inativo
        </label>
        <div className="flex gap-2">
          <button type="submit" className="btn-primary">
            {editandoId != null ? 'Salvar edição' : 'Cadastrar'}
          </button>
          {editandoId != null && (
            <button type="button" onClick={cancelarEdicao} className="btn-ghost">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="panel">
        <table className="table-base">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Empresa</th>
              <th>Dimensão AX</th>
              <th>Matriz</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {unidades.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.empresa?.nome}</td>
                <td>{u.dimensaoAx}</td>
                <td>{u.matriz ? 'Sim' : 'Não'}</td>
                <td><StatusDot tone={u.inativo ? 'neutral' : 'success'}>{u.inativo ? 'Inativo' : 'Ativo'}</StatusDot></td>
                <td className="flex gap-3">
                  <button onClick={() => editar(u)} className="link-action">Editar</button>
                  <button onClick={() => u.id != null && excluir(u.id)} className="text-danger hover:underline dark:text-danger-dark">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
