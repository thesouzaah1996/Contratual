import { departamentosApi } from '../../api/departamentos'
import type { Departamento } from '../../api/types'
import { SimpleCrudPage } from '../../components/SimpleCrudPage'

const defaultValues: Departamento = { nome: '' }

export function DepartamentoPage() {
  return (
    <SimpleCrudPage<Departamento>
      title="Departamentos"
      api={departamentosApi}
      defaultValues={defaultValues}
      columns={[{ header: 'Nome', render: (d) => d.nome }]}
      renderFields={({ register }) => (
        <label className="field">
          Nome
          <input className="input" {...register('nome', { required: true })} />
        </label>
      )}
    />
  )
}
