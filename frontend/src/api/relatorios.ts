import { api, buildQuery } from './client'
import type { Dashboard } from './types'

export interface FiltroUnidadeRelatorio {
  tipoContratoId?: number
  centroDeCustoId?: number
  cnpj?: string
  dataInicio?: string
  dataFim?: string
}

export interface FiltroEntidadeRelatorio extends FiltroUnidadeRelatorio {
  unidadeId?: number
  tipoEntidade?: string
}

export interface FiltroTipoOuCentroRelatorio {
  centroDeCustoId?: number
  dataInicio?: string
  dataFim?: string
  unidadeId?: number
}

export interface FiltroVencimentoRelatorio {
  tipoContratoId?: number
  centroDeCustoId?: number
  unidadeId?: number
}

export const relatoriosApi = {
  dashboard: () => api.get<Dashboard>('/relatorios/dashboard'),
  porUnidade: (filtro: FiltroUnidadeRelatorio) =>
    api.get<unknown[][]>(`/relatorios/por-unidade${buildQuery(filtro)}`),
  porEntidade: (filtro: FiltroEntidadeRelatorio) =>
    api.get<unknown[][]>(`/relatorios/por-entidade${buildQuery(filtro)}`),
  porTipoContrato: (filtro: FiltroTipoOuCentroRelatorio) =>
    api.get<unknown[][]>(`/relatorios/por-tipo-contrato${buildQuery(filtro)}`),
  porCentroDeCusto: (filtro: FiltroTipoOuCentroRelatorio) =>
    api.get<unknown[][]>(`/relatorios/por-centro-de-custo${buildQuery(filtro)}`),
  porVencimento: (filtro: FiltroVencimentoRelatorio) =>
    api.get<unknown[][]>(`/relatorios/por-vencimento${buildQuery(filtro)}`),
}
