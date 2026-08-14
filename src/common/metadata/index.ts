const metadata = {
  name: 'MiCoin',
  shortName: 'MiCoin',
  tagline: 'Controla tu dinero con claridad',
  description:
    'App móvil para registrar gastos, proyectar tu mes y mantener el control de tus monedas.',
  company: 'MiCoin',
  supportEmail: 'soporte@micoin.app',
  website: 'https://micoin.app',
  biometricPrompt: 'Desbloquea MiCoin',
  biometricEnablePrompt: 'Confirma para activar el desbloqueo',
  biometricCancel: 'Cancelar',
  copyright: `© ${new Date().getFullYear()} MiCoin`,
} as const

export { metadata }
