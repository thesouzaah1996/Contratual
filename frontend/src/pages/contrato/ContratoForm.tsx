import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { contratosApi } from '../../api/contratos'
import type { ContratoRequest } from '../../api/types'
import { useLookups } from '../../hooks/useLookups'

const defaultValues: ContratoRequest = {
  tipoContratoId: 0,
  tipoEspecifico: '',
  contraparteId: 0,
  departamentoId: 0,
  unidadeId: 0,
  centroDeCustoId: 0,
  emissor: 'F',
  possuiDocumento: false,
  dataInicio: '',
  dataFim: '',
  renovacaoAutomatica: false,
  observacoes: '',
  codigoProcesso: '',
  codigoContrato: '',
  responsavel: '',
  valor: 0,
  fidelidade: null,
}

export function ContratoForm() {
  const { id } = useParams()
  const editando = id != null
  const navigate = useNavigate()
  const lookups = useLookups()
  const [erro, setErro] = useState<string | null>(null)
  const form = useForm<ContratoRequest>({ defaultValues })

  useEffect(() => {
    if (!editando) return
    contratosApi.buscar(Number(id)).then((c) => {
      form.reset({
        tipoContratoId: c.tipoContrato.id ?? 0,
        tipoEspecifico: c.tipoEspecifico ?? '',
        contraparteId: c.contraparte.id ?? 0,
        departamentoId: c.departamento.id ?? 0,
        unidadeId: c.unidade.id ?? 0,
        centroDeCustoId: c.centroDeCusto.id ?? 0,
        emissor: c.emissor,
        possuiDocumento: c.possuiDocumento,
        dataInicio: c.dataInicio,
        dataFim: c.dataFim ?? '',
        renovacaoAutomatica: c.renovacaoAutomatica,
        observacoes: c.observacoes ?? '',
        codigoProcesso: c.codigoProcesso,
        codigoContrato: c.codigoContrato ?? '',
        responsavel: c.responsavel,
        valor: c.valor,
        fidelidade: c.fidelidade,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onSubmit = form.handleSubmit(async (dados) => {
    setErro(null)
    const payload: ContratoRequest = {
      ...dados,
      tipoContratoId: Number(dados.tipoContratoId),
      contraparteId: Number(dados.contraparteId),
      departamentoId: Number(dados.departamentoId),
      unidadeId: Number(dados.unidadeId),
      centroDeCustoId: Number(dados.centroDeCustoId),
      valor: Number(dados.valor),
      fidelidade: dados.fidelidade != null && String(dados.fidelidade) !== '' ? Number(dados.fidelidade) : null,
      dataFim: dados.dataFim || null,
    }
    try {
      if (editando) {
        await contratosApi.editar(Number(id), payload)
      } else {
        await contratosApi.salvar(payload)
      }
      navigate('/contratos')
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : 'Erro ao salvar')
    }
  })

  if (lookups.carregando) return <p className="page text-sm text-muted dark:text-muted-dark">Carregando...</p>

  return (
    <div className="page max-w-4xl">
      <h1 className="page-title mb-4">{editando ? 'Editar Contrato' : 'Cadastrar Contrato'}</h1>

      {erro && <p className="alert-error mb-4">{erro}</p>}

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="field">
          Tipo Contrato
          <select className="input" {...form.register('tipoContratoId', { required: true, valueAsNumber: true })}>
            <option value="">Selecione</option>
            {lookups.tiposContrato.map((t) => (
              <option key={t.id} value={t.id}>{t.tipo}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Tipo Específico
          <input className="input" {...form.register('tipoEspecifico')} />
        </label>

        <label className="field">
          Unidade
          <select className="input" {...form.register('unidadeId', { required: true, valueAsNumber: true })}>
            <option value="">Selecione</option>
            {lookups.unidades.map((u) => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Departamento
          <select className="input" {...form.register('departamentoId', { required: true, valueAsNumber: true })}>
            <option value="">Selecione</option>
            {lookups.departamentos.map((d) => (
              <option key={d.id} value={d.id}>{d.nome}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Centro de Custo
          <select className="input" {...form.register('centroDeCustoId', { required: true, valueAsNumber: true })}>
            <option value="">Selecione</option>
            {lookups.centrosDeCusto.map((c) => (
              <option key={c.id} value={c.id}>{c.codigo} - {c.descricao}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Emissor
          <select className="input" {...form.register('emissor', { required: true })}>
            <option value="">Selecione</option>
            {lookups.enums.emissores.map((e) => (
              <option key={e.sigla} value={e.sigla}>{e.descricao}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Entidade
          <select className="input" {...form.register('contraparteId', { required: true, valueAsNumber: true })}>
            <option value="">Selecione</option>
            {lookups.contrapartes.map((c) => (
              <option key={c.id} value={c.id}>{c.razaoSocial}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Código Processo
          <input className="input" {...form.register('codigoProcesso', { required: true })} />
        </label>

        <label className="field">
          Código Contrato
          <input className="input" {...form.register('codigoContrato')} />
        </label>

        <label className="field">
          Responsável
          <input className="input" {...form.register('responsavel', { required: true })} />
        </label>

        <label className="field">
          Data Início
          <input type="date" className="input" {...form.register('dataInicio', { required: true })} />
        </label>

        <label className="field">
          Data Fim
          <input type="date" className="input" {...form.register('dataFim')} />
        </label>

        <label className="field">
          Meses de Fidelidade
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

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...form.register('possuiDocumento')} />
          Possui documento
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
