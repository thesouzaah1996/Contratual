import { centrosDeCustoApi } from '../../api/centrosDeCusto'
import type { CentroDeCusto } from '../../api/types'
import { SimpleCrudPage } from '../../components/SimpleCrudPage'
import { StatusDot } from '../../components/StatusDot'

const defaultValues: CentroDeCusto = { codigo: '', descricao: '', inativo: false }

export function CentroDeCustoPage() {
  return (
    <SimpleCrudPage<CentroDeCusto>
      title="Centros de Custo"
      api={centrosDeCustoApi}
      defaultValues={defaultValues}
      columns={[
        { header: 'Código', render: (c) => c.codigo },
        { header: 'Descrição', render: (c) => c.descricao },
        { header: 'Status', render: (c) => <StatusDot tone={c.inativo ? 'neutral' : 'success'}>{c.inativo ? 'Inativo' : 'Ativo'}</StatusDot> },
      ]}
      renderFields={({ register }) => (
        <>
          <label className="field">
            Código
            <input className="input" {...register('codigo', { required: true })} />
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
