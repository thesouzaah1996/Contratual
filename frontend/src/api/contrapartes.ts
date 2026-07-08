import { api } from './client'
import type { Contraparte } from './types'

export const contrapartesApi = {
  listar: () => api.get<Contraparte[]>('/contrapartes'),
  buscar: (id: number) => api.get<Contraparte>(`/contrapartes/${id}`),
  salvar: (contraparte: Contraparte) => api.post<Contraparte>('/contrapartes', contraparte),
  editar: (id: number, contraparte: Contraparte) =>
    api.put<Contraparte>(`/contrapartes/${id}`, contraparte),
  excluir: (id: number) => api.delete(`/contrapartes/${id}`),
}
