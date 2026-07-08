import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { contratosApi } from '../../api/contratos'
import type { DistratoRequest } from '../../api/types'

const defaultValues: DistratoRequest = {
  codigoDistrato: '',
  dataDistrato: '',
  responsavel: '',
  observacoes: '',
}

export function ContratoDistratoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [erro, setErro] = useState<string | null>(null)
  const form = useForm<DistratoRequest>({ defaultValues })

  const onSubmit = form.handleSubmit(async (dados) => {
    setErro(null)
    try {
      await contratosApi.lancarDistrato(Number(id), {
        ...dados,
        dataDistrato: dados.dataDistrato || null,
      })
      navigate('/contratos')
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao lançar distrato')
    }
  })

  return (
    <div className="page max-w-2xl">
      <h1 className="page-title mb-4">Lançar Distrato</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="field">
          Código Distrato
          <input className="input" {...form.register('codigoDistrato', { required: true })} />
        </label>
        <label className="field">
          Responsável
          <input className="input" {...form.register('responsavel', { required: true })} />
        </label>
        <label className="field">
          Data distrato
          <input type="date" className="input" {...form.register('dataDistrato')} />
        </label>
        <label className="col-span-full flex flex-col text-sm">
          Observações
          <textarea rows={4} className="input" {...form.register('observacoes')} />
        </label>
        <div className="col-span-full flex gap-2">
          <button type="submit" className="btn-primary">Salvar</button>
          <button type="button" onClick={() => navigate('/contratos')} className="btn-ghost">Cancelar</button>
        </div>
      </form>
    </div>
  )
}
