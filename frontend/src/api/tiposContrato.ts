import { api } from './client'
import type { TipoContrato } from './types'

export const tiposContratoApi = {
  listar: () => api.get<TipoContrato[]>('/tipos-contrato'),
  buscar: (id: number) => api.get<TipoContrato>(`/tipos-contrato/${id}`),
  salvar: (tipo: TipoContrato) => api.post<TipoContrato>('/tipos-contrato', tipo),
  editar: (id: number, tipo: TipoContrato) => api.put<TipoContrato>(`/tipos-contrato/${id}`, tipo),
  excluir: (id: number) => api.delete(`/tipos-contrato/${id}`),
}
