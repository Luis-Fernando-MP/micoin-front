import { type FC } from 'react'
import { View } from 'react-native'

import { Radio } from 'lucide-react-native'

import Icon from '@components/icon'
import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props {
  title?: string
  body?: string
}

/**
 * OngoingNotifyMock — mock de notificación ongoing inamovible.
 *
 * @param title - Título. @default 'Cobro en curso'
 * @param title.title
 * @param body - Cuerpo
 *
 * @param title.body
 * @example
 * import TrayNotifyMock from '@components/tray-notify-mock';
 * <TrayNotifyMock.Ongoing />
 */
const OngoingNotifyMock: FC<Props> = ({
  title = 'Cobro en curso',
  body = 'Notificación ongoing (inamovible) · mock UI',
}) => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-center gap-3 border border-brand bg-card p-3',
          BRAND.radius.variants.surface,
        )}
      >
        <Icon icon={Radio} size={18} />
        <View className="flex-1">
          <Text.Title size="xs">{title}</Text.Title>
          <Text.Caption>{body}</Text.Caption>
        </View>
        <Text.Caption status="brand">LIVE</Text.Caption>
      </View>
      <Text.Caption>
        Fase 2: foreground service / ongoing notification en Dev Client.
      </Text.Caption>
    </View>
  )
}

export default OngoingNotifyMock
