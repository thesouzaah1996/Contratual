import { contrapartesApi } from '../../api/contrapartes'
import type { Contraparte } from '../../api/types'
import { SimpleCrudPage } from '../../components/SimpleCrudPage'

const defaultValues: Contraparte = {
  tipoEntidade: 'F',
  codigoContraparte: '',
  razaoSocial: '',
  cnpjcpfnum: '',
}

export function ContrapartePage() {
  return (
    <SimpleCrudPage<Contraparte>
      title="Contrapartes"
      api={contrapartesApi}
      defaultValues={defaultValues}
      columns={[
        { header: 'Tipo', render: (c) => (c.tipoEntidade === 'F' ? 'Fornecedor' : 'Cliente') },
        { header: 'Código', render: (c) => c.codigoContraparte },
        { header: 'Razão Social', render: (c) => c.razaoSocial },
        { header: 'CNPJ/CPF', render: (c) => c.cnpjcpfnum },
      ]}
      renderFields={({ register }) => (
        <>
          <label className="field">
            Tipo
            <select className="input" {...register('tipoEntidade')}>
              <option value="F">Fornecedor</option>
              <option value="C">Cliente</option>
            </select>
          </label>
          <label className="field">
            Código
            <input
              className="input"
              {...register('codigoContraparte', { required: true })}
            />
          </label>
          <label className="field">
            Razão Social
            <input
              className="input"
              {...register('razaoSocial', { required: true })}
            />
          </label>
          <label className="field">
            CNPJ/CPF
            <input
              className="input"
              {...register('cnpjcpfnum', { required: true })}
            />
          </label>
        </>
      )}
    />
  )
}
