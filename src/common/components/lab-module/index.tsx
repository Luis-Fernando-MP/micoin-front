import { type FC, type ReactNode } from 'react'
import { View } from 'react-native'

import Chip from '@components/chip'
import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props {
  id: number
  title: string
  what: string
  why: string
  pack?: string
  children: ReactNode
  className?: string
}

/**
 * LabModule — tarjeta de catálogo para demos del design system.
 *
 * @param id - Número de módulo en el catálogo
 * @param title - Nombre corto del módulo
 * @param what - Descripción de qué hace
 * @param why - Descripción de para qué sirve
 * @param pack - Chip opcional de paquete/origen
 * @param children - Controles o demos del módulo
 * @param className - Clases NativeWind extra
 *
 * @example
 * import LabModule from '@components/lab-module'
 * <LabModule id={1} title="Chip" what="Etiqueta" why="Filtros">
 *   <Chip label="Hoy" />
 * </LabModule>
 */
const LabModule: FC<Props> = ({
  id,
  title,
  what,
  why,
  pack,
  children,
  className,
}) => {
  return (
    <View
      className={cn(
        'gap-3 border border-border bg-card p-4',
        BRAND.radius.variants.surface,
        className,
      )}
    >
      <View className="gap-1.5">
        <Text.Title size="sm">
          {id} · {title}
        </Text.Title>
        {pack && <Chip label={pack} status="info" variant="soft" />}
        <Text className="text-sm text-secondary">
          <Text className="font-medium text-primary">Qué hace: </Text>
          {what}
        </Text>
        <Text className="text-sm text-secondary">
          <Text className="font-medium text-primary">Para qué: </Text>
          {why}
        </Text>
      </View>
      {children}
    </View>
  )
}

export type { Props as LabModuleProps }
export default LabModule
