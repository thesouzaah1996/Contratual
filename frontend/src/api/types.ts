export interface Empresa {
  id?: number
  nome: string
  numero: string
  inativo: boolean
}

export interface Unidade {
  id?: number
  nome: string
  site: number
  dimensaoAx: string
  cnpj: string
  inativo: boolean
  matriz: boolean
  empresa: Empresa
}

export interface UnidadeRequest {
  nome: string
  site: number
  dimensaoAx: string
  cnpj: string
  inativo: boolean
  matriz: boolean
  empresaId: number
}

export interface Departamento {
  id?: number
  nome: string
}

export interface CentroDeCusto {
  id?: number
  codigo: string
  descricao: string
  inativo: boolean
}

export interface TipoContrato {
  id?: number
  tipo: string
  descricao: string
  inativo: boolean
}

export type TipoEntidade = 'F' | 'C'

export interface Contraparte {
  id?: number
  tipoEntidade: TipoEntidade
  codigoContraparte: string
  razaoSocial: string
  cnpjcpfnum: string
}

export type Emissor = 'F' | 'S'
export type TipoRegistro = 'C' | 'A' | 'D'

export interface Contrato {
  id: number
  tipoRegistro: TipoRegistro
  tipoContrato: TipoContrato
  tipoEspecifico: string
  contraparte: Contraparte
  departamento: Departamento
  unidade: Unidade
  centroDeCusto: CentroDeCusto
  emissor: Emissor
  possuiDocumento: boolean
  dataCriacao: string
  dataInicio: string
  dataFim: string | null
  renovacaoAutomatica: boolean
  observacoes: string | null
  codigoProcesso: string
  codigoContrato: string | null
  responsavel: string
  valor: number
  fidelidade: number | null
  codigoAditivo: string | null
  dataInicioAditivo: string | null
  dataFimAditivo: string | null
  codigoDistrato: string | null
  dataDistrato: string | null
}

export interface ContratoRequest {
  tipoContratoId: number
  tipoEspecifico: string
  contraparteId: number
  departamentoId: number
  unidadeId: number
  centroDeCustoId: number
  emissor: Emissor
  possuiDocumento: boolean
  dataInicio: string
  dataFim: string | null
  renovacaoAutomatica: boolean
  observacoes: string
  codigoProcesso: string
  codigoContrato: string
  responsavel: string
  valor: number
  fidelidade: number | null
}

export interface AditivoRequest {
  codigoAditivo: string
  dataInicioAditivo: string | null
  dataFimAditivo: string | null
  fidelidade: number | null
  renovacaoAutomatica: boolean
  valor: number
  responsavel: string
  observacoes: string
}

export interface DistratoRequest {
  codigoDistrato: string
  dataDistrato: string | null
  responsavel: string
  observacoes: string
}

export interface ContratoFiltro {
  codigoProcesso?: string
  codigoContrato?: string
  emissor?: Emissor
  tipoContratoId?: number
  centroDeCustoId?: number
  departamentoId?: number
  unidadeId?: number
  dataInicio?: string
  dataFim?: string
}

export interface EnumsResponse {
  emissores: { sigla: Emissor; descricao: string }[]
  tiposEntidade: { sigla: TipoEntidade; descricao: string }[]
  tiposRegistro: { sigla: TipoRegistro; descricao: string }[]
}

export interface Dashboard {
  vencimento30x60x90: number[]
  quantidadeDeRegistros: [string, number][]
  quantidadePorCentroCusto: [string, number][]
  quantidadePorTipo: [string, number][]
  quantidadePorUnidade: [string, number][]
}
