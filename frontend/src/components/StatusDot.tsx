export type StatusTone = 'success' | 'danger' | 'warning' | 'neutral'

const dotTone: Record<StatusTone, string> = {
  success: 'bg-success dark:bg-success-dark',
  danger: 'bg-danger dark:bg-danger-dark',
  warning: 'bg-warning dark:bg-warning-dark',
  neutral: 'bg-muted dark:bg-muted-dark',
}

const textTone: Record<StatusTone, string> = {
  success: 'text-success dark:text-success-dark',
  danger: 'text-danger dark:text-danger-dark',
  warning: 'text-warning dark:text-warning-dark',
  neutral: 'text-muted dark:text-muted-dark',
}

export function StatusDot({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${textTone[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotTone[tone]}`} />
      {children}
    </span>
  )
}
