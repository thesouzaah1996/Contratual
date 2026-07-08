import { api } from './client'
import type { CentroDeCusto } from './types'

export const centrosDeCustoApi = {
  listar: () => api.get<CentroDeCusto[]>('/centros-de-custo'),
  buscar: (id: number) => api.get<CentroDeCusto>(`/centros-de-custo/${id}`),
  salvar: (centro: CentroDeCusto) => api.post<CentroDeCusto>('/centros-de-custo', centro),
  editar: (id: number, centro: CentroDeCusto) =>
    api.put<CentroDeCusto>(`/centros-de-custo/${id}`, centro),
  excluir: (id: number) => api.delete(`/centros-de-custo/${id}`),
}
