import { api } from './client'
import type { EnumsResponse } from './types'

export const enumsApi = {
  listar: () => api.get<EnumsResponse>('/enums'),
}
