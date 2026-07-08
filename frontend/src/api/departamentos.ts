import { api } from './client'
import type { Departamento } from './types'

export const departamentosApi = {
  listar: () => api.get<Departamento[]>('/departamentos'),
  buscar: (id: number) => api.get<Departamento>(`/departamentos/${id}`),
  salvar: (departamento: Departamento) => api.post<Departamento>('/departamentos', departamento),
  editar: (id: number, departamento: Departamento) =>
    api.put<Departamento>(`/departamentos/${id}`, departamento),
  excluir: (id: number) => api.delete(`/departamentos/${id}`),
}
