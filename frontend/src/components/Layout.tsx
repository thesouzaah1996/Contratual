import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const cadastros = [
  { to: '/contratos', label: 'Contratos' },
  { to: '/empresas', label: 'Empresas' },
  { to: '/unidades', label: 'Unidades' },
  { to: '/departamentos', label: 'Departamentos' },
  { to: '/centros-de-custo', label: 'Centros de Custo' },
  { to: '/tipos-contrato', label: 'Tipos de Contrato' },
  { to: '/contrapartes', label: 'Contrapartes' },
]

const relatorios = [
  { to: '/relatorios/unidade', label: 'Por Unidade' },
  { to: '/relatorios/entidade', label: 'Por Entidade' },
  { to: '/relatorios/tipo-contrato', label: 'Por Tipo de Contrato' },
  { to: '/relatorios/centro-de-custo', label: 'Por Centro de Custo' },
  { to: '/relatorios/vencimento', label: 'Por Vencimento' },
]

function NavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block border-l-2 px-4 py-1.5 text-sm transition-colors ${
          isActive
            ? 'border-accent bg-accent/10 font-medium text-accent dark:border-accent-dark dark:bg-accent-dark/10 dark:text-accent-dark'
            : 'border-transparent text-muted hover:bg-line/30 hover:text-ink dark:text-muted-dark dark:hover:bg-line-dark/30 dark:hover:text-ink-dark'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

function NavGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
        {title}
      </div>
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-surface py-4 dark:border-line-dark dark:bg-surface-dark">
        <div className="mb-6 px-4">
          <span className="font-mono text-sm font-semibold tracking-tight text-ink dark:text-ink-dark">
            CONTRATUAL<span className="text-accent dark:text-accent-dark">.</span>
          </span>
        </div>
        <NavGroup title="Geral">
          <NavItem to="/" label="Início" end />
        </NavGroup>
        <NavGroup title="Cadastros">
          {cadastros.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </NavGroup>
        <NavGroup title="Relatórios">
          {relatorios.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </NavGroup>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-end border-b border-line bg-surface px-6 py-2 dark:border-line-dark dark:bg-surface-dark">
          <span className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark">
            <span className="flex h-6 w-6 items-center justify-center border border-line text-xs font-medium text-ink dark:border-line-dark dark:text-ink-dark">
              U
            </span>
            Usuário
          </span>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
