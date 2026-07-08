import { useEffect, useState } from 'react'
import { centrosDeCustoApi } from '../api/centrosDeCusto'
import { contrapartesApi } from '../api/contrapartes'
import { departamentosApi } from '../api/departamentos'
import { empresasApi } from '../api/empresas'
import { enumsApi } from '../api/enums'
import type {
  CentroDeCusto,
  Contraparte,
  Departamento,
  Empresa,
  EnumsResponse,
  TipoContrato,
  Unidade,
} from '../api/types'
import { tiposContratoApi } from '../api/tiposContrato'
import { unidadesApi } from '../api/unidades'

export interface Lookups {
  empresas: Empresa[]
  unidades: Unidade[]
  departamentos: Departamento[]
  centrosDeCusto: CentroDeCusto[]
  tiposContrato: TipoContrato[]
  contrapartes: Contraparte[]
  enums: EnumsResponse
}

const vazio: Lookups = {
  empresas: [],
  unidades: [],
  departamentos: [],
  centrosDeCusto: [],
  tiposContrato: [],
  contrapartes: [],
  enums: { emissores: [], tiposEntidade: [], tiposRegistro: [] },
}

export function useLookups() {
  const [lookups, setLookups] = useState<Lookups>(vazio)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    Promise.all([
      empresasApi.listar(),
      unidadesApi.listar(),
      departamentosApi.listar(),
      centrosDeCustoApi.listar(),
      tiposContratoApi.listar(),
      contrapartesApi.listar(),
      enumsApi.listar(),
    ])
      .then(([empresas, unidades, departamentos, centrosDeCusto, tiposContrato, contrapartes, enums]) => {
        if (!ativo) return
        setLookups({ empresas, unidades, departamentos, centrosDeCusto, tiposContrato, contrapartes, enums })
      })
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setCarregando(false))

    return () => {
      ativo = false
    }
  }, [])

  return { ...lookups, carregando, erro }
}
