import { type FC, type ReactNode, useState } from 'react'
import { Pressable, View } from 'react-native'

import Text from '@components/text'

import { cn } from '@/lib/utils'

type Tab = {
  id: string
  label: string
  content: ReactNode
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

/**
 * Tabs — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver TabsProps / Props del archivo
 *
 * @param props.tabs
 * @param props.defaultTab
 * @param props.className
 * @example
 * import Tabs from '@components/tabs';
 * <Tabs />
 */
const Tabs: FC<Props> = ({ tabs, defaultTab, className }) => {
  const initial = defaultTab ?? tabs[0]?.id ?? ''
  const [active, setActive] = useState(initial)
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]

  return (
    <View className={cn('gap-3', className)}>
      <View className="flex-row gap-1 rounded-lg border border-border bg-card p-1">
        {tabs.map((tab) => {
          const selected = tab.id === active

          return (
            <Pressable
              key={tab.id}
              onPress={() => setActive(tab.id)}
              className={cn(
                'flex-1 items-center rounded-md px-3 py-2',
                selected && 'bg-primary-background',
              )}
            >
              <Text
                className={cn(
                  'text-sm font-medium',
                  selected && 'text-primary-foreground',
                )}
              >
                {tab.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <View>{current?.content}</View>
    </View>
  )
}

/**
 *
 */
export default Tabs
