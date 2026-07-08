import { empresasApi } from '../../api/empresas'
import type { Empresa } from '../../api/types'
import { SimpleCrudPage } from '../../components/SimpleCrudPage'
import { StatusDot } from '../../components/StatusDot'

const defaultValues: Empresa = { nome: '', numero: '', inativo: false }

export function EmpresaPage() {
  return (
    <SimpleCrudPage<Empresa>
      title="Empresas"
      api={empresasApi}
      defaultValues={defaultValues}
      columns={[
        { header: 'Nome', render: (e) => e.nome },
        { header: 'Número', render: (e) => e.numero },
        { header: 'Status', render: (e) => <StatusDot tone={e.inativo ? 'neutral' : 'success'}>{e.inativo ? 'Inativo' : 'Ativo'}</StatusDot> },
      ]}
      renderFields={({ register }) => (
        <>
          <label className="field">
            Nome
            <input className="input" {...register('nome', { required: true })} />
          </label>
          <label className="field">
            Número
            <input className="input" {...register('numero', { required: true })} />
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
