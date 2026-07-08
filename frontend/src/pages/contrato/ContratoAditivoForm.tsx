import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { contratosApi } from '../../api/contratos'
import type { AditivoRequest } from '../../api/types'

const defaultValues: AditivoRequest = {
  codigoAditivo: '',
  dataInicioAditivo: '',
  dataFimAditivo: '',
  fidelidade: null,
  renovacaoAutomatica: false,
  valor: 0,
  responsavel: '',
  observacoes: '',
}

export function ContratoAditivoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [erro, setErro] = useState<string | null>(null)
  const form = useForm<AditivoRequest>({ defaultValues })

  const onSubmit = form.handleSubmit(async (dados) => {
    setErro(null)
    try {
      await contratosApi.lancarAditivo(Number(id), {
        ...dados,
        valor: Number(dados.valor),
        fidelidade: dados.fidelidade != null && String(dados.fidelidade) !== '' ? Number(dados.fidelidade) : null,
        dataInicioAditivo: dados.dataInicioAditivo || null,
        dataFimAditivo: dados.dataFimAditivo || null,
      })
      navigate('/contratos')
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao lançar aditivo')
    }
  })

  return (
    <div className="page max-w-2xl">
      <h1 className="page-title mb-4">Lançar Aditivo</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="field">
          Código Aditivo
          <input className="input" {...form.register('codigoAditivo', { required: true })} />
        </label>
        <label className="field">
          Responsável
          <input className="input" {...form.register('responsavel', { required: true })} />
        </label>
        <label className="field">
          Data início aditivo
          <input type="date" className="input" {...form.register('dataInicioAditivo')} />
        </label>
        <label className="field">
          Data fim aditivo
          <input type="date" className="input" {...form.register('dataFimAditivo')} />
        </label>
        <label className="field">
          Meses de fidelidade
          <input type="number" className="input" {...form.register('fidelidade')} />
        </label>
        <label className="field">
          Valor total
          <input type="number" step="0.01" className="input" {...form.register('valor', { required: true })} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...form.register('renovacaoAutomatica')} />
          Renovação automática
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
