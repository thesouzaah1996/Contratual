import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { ApiError } from '../api/client'

export interface CrudApi<T> {
  listar: () => Promise<T[]>
  salvar: (item: T) => Promise<T>
  editar: (id: number, item: T) => Promise<T>
  excluir: (id: number) => Promise<void>
}

export interface Column<T> {
  header: string
  render: (item: T) => ReactNode
}

interface SimpleCrudPageProps<T extends { id?: number }> {
  title: string
  api: CrudApi<T>
  defaultValues: T
  columns: Column<T>[]
  renderFields: (form: UseFormReturn<T>) => ReactNode
}

export function SimpleCrudPage<T extends { id?: number }>({
  title,
  api,
  defaultValues,
  columns,
  renderFields,
}: SimpleCrudPageProps<T>) {
  const [itens, setItens] = useState<T[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const form = useForm<T>({ defaultValues: defaultValues as never })

  const carregar = () => {
    api.listar().then(setItens).catch((e: ApiError) => setErro(e.message))
  }

  useEffect(carregar, [])

  const onSubmit = form.handleSubmit(async (dados) => {
    setErro(null)
    try {
      if (editandoId != null) {
        await api.editar(editandoId, dados)
      } else {
        await api.salvar(dados)
      }
      cancelarEdicao()
      carregar()
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao salvar')
    }
  })

  const editar = (item: T) => {
    form.reset(item)
    setEditandoId(item.id ?? null)
  }

  const cancelarEdicao = () => {
    form.reset(defaultValues as never)
    setEditandoId(null)
  }

  const excluir = async (id: number) => {
    if (!confirm('Confirma a exclusão deste registro?')) return
    try {
      await api.excluir(id)
      carregar()
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao excluir')
    }
  }

  return (
    <div className="page max-w-4xl">
      <h1 className="page-title mb-4">{title}</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={onSubmit} className="panel mb-8 flex flex-wrap items-end gap-4 p-4">
        {renderFields(form)}
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
              {columns.map((c) => (
                <th key={c.header}>{c.header}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id}>
                {columns.map((c) => (
                  <td key={c.header}>{c.render(item)}</td>
                ))}
                <td className="flex gap-3">
                  <button onClick={() => editar(item)} className="link-action">Editar</button>
                  <button onClick={() => item.id != null && excluir(item.id)} className="text-danger hover:underline dark:text-danger-dark">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
