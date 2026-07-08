import { tiposContratoApi } from '../../api/tiposContrato'
import type { TipoContrato } from '../../api/types'
import { SimpleCrudPage } from '../../components/SimpleCrudPage'
import { StatusDot } from '../../components/StatusDot'

const defaultValues: TipoContrato = { tipo: '', descricao: '', inativo: false }

export function TipoContratoPage() {
  return (
    <SimpleCrudPage<TipoContrato>
      title="Tipos de Contrato"
      api={tiposContratoApi}
      defaultValues={defaultValues}
      columns={[
        { header: 'Tipo', render: (t) => t.tipo },
        { header: 'Descrição', render: (t) => t.descricao },
        { header: 'Status', render: (t) => <StatusDot tone={t.inativo ? 'neutral' : 'success'}>{t.inativo ? 'Inativo' : 'Ativo'}</StatusDot> },
      ]}
      renderFields={({ register }) => (
        <>
          <label className="field">
            Tipo
            <input className="input" {...register('tipo', { required: true })} />
          </label>
          <label className="field">
            Descrição
            <input className="input" {...register('descricao', { required: true })} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('inativo')} />
            Inativo
          </label>
        </>
      )}
    />
  )
}
