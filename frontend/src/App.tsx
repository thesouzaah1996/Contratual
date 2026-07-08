import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ContratoAditivoForm } from './pages/contrato/ContratoAditivoForm'
import { ContratoDistratoForm } from './pages/contrato/ContratoDistratoForm'
import { ContratoForm } from './pages/contrato/ContratoForm'
import { ContratoLista } from './pages/contrato/ContratoLista'
import { EmpresaPage } from './pages/empresa/EmpresaPage'
import { UnidadePage } from './pages/unidade/UnidadePage'
import { DepartamentoPage } from './pages/departamento/DepartamentoPage'
import { CentroDeCustoPage } from './pages/centroDeCusto/CentroDeCustoPage'
import { TipoContratoPage } from './pages/tipoContrato/TipoContratoPage'
import { ContrapartePage } from './pages/contraparte/ContrapartePage'
import { PorUnidade } from './pages/relatorios/PorUnidade'
import { PorEntidade } from './pages/relatorios/PorEntidade'
import { PorTipoContrato } from './pages/relatorios/PorTipoContrato'
import { PorCentroDeCusto } from './pages/relatorios/PorCentroDeCusto'
import { PorVencimento } from './pages/relatorios/PorVencimento'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="contratos" element={<ContratoLista />} />
          <Route path="contratos/novo" element={<ContratoForm />} />
          <Route path="contratos/:id/editar" element={<ContratoForm />} />
          <Route path="contratos/:id/aditivo" element={<ContratoAditivoForm />} />
          <Route path="contratos/:id/distrato" element={<ContratoDistratoForm />} />

          <Route path="empresas" element={<EmpresaPage />} />
          <Route path="unidades" element={<UnidadePage />} />
          <Route path="departamentos" element={<DepartamentoPage />} />
          <Route path="centros-de-custo" element={<CentroDeCustoPage />} />
          <Route path="tipos-contrato" element={<TipoContratoPage />} />
          <Route path="contrapartes" element={<ContrapartePage />} />

          <Route path="relatorios/unidade" element={<PorUnidade />} />
          <Route path="relatorios/entidade" element={<PorEntidade />} />
          <Route path="relatorios/tipo-contrato" element={<PorTipoContrato />} />
          <Route path="relatorios/centro-de-custo" element={<PorCentroDeCusto />} />
          <Route path="relatorios/vencimento" element={<PorVencimento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
