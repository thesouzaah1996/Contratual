import { api } from './client'
import type { Unidade, UnidadeRequest } from './types'

export const unidadesApi = {
  listar: () => api.get<Unidade[]>('/unidades'),
  buscar: (id: number) => api.get<Unidade>(`/unidades/${id}`),
  salvar: (unidade: UnidadeRequest) => api.post<Unidade>('/unidades', unidade),
  editar: (id: number, unidade: UnidadeRequest) => api.put<Unidade>(`/unidades/${id}`, unidade),
  excluir: (id: number) => api.delete(`/unidades/${id}`),
}
