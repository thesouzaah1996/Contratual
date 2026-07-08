import { api } from './client'
import type { Empresa } from './types'

export const empresasApi = {
  listar: () => api.get<Empresa[]>('/empresas'),
  buscar: (id: number) => api.get<Empresa>(`/empresas/${id}`),
  salvar: (empresa: Empresa) => api.post<Empresa>('/empresas', empresa),
  editar: (id: number, empresa: Empresa) => api.put<Empresa>(`/empresas/${id}`, empresa),
  excluir: (id: number) => api.delete(`/empresas/${id}`),
}
