import { api, buildQuery } from './client'
import type { AditivoRequest, Contrato, ContratoFiltro, ContratoRequest, DistratoRequest } from './types'

export const contratosApi = {
  pesquisar: (filtro: ContratoFiltro) => api.get<Contrato[]>(`/contratos${buildQuery(filtro)}`),
  buscar: (id: number) => api.get<Contrato>(`/contratos/${id}`),
  salvar: (contrato: ContratoRequest) => api.post<Contrato>('/contratos', contrato),
  editar: (id: number, contrato: ContratoRequest) => api.put<Contrato>(`/contratos/${id}`, contrato),
  lancarAditivo: (id: number, aditivo: AditivoRequest) =>
    api.post<Contrato>(`/contratos/${id}/aditivos`, aditivo),
  lancarDistrato: (id: number, distrato: DistratoRequest) =>
    api.post<Contrato>(`/contratos/${id}/distratos`, distrato),
  excluir: (id: number) => api.delete(`/contratos/${id}`),
}
