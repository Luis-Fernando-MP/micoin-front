import { type FC, type ReactNode, useState } from 'react'
import { View } from 'react-native'

import Button, { type ButtonProps } from '@components/button'
import BRAND from '@components/shared/brand'

import { cn } from '@/lib/utils'

type TabTrigger = string | ReactNode | ((selected: boolean) => ReactNode)

type TabButtonProps = Omit<
  Partial<ButtonProps>,
  'label' | 'children' | 'onPress'
>

type Tab = {
  id: string
  trigger: TabTrigger
  tabProps?: TabButtonProps
  content: ReactNode
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

const resolveTrigger = (trigger: TabTrigger, selected: boolean) => {
  if (typeof trigger === 'function') {
    return trigger(selected)
  }

  return trigger
}

/**
 * Tabs — paneles con triggers Button; tabProps opcional por tab.
 *
 * @param tabs - Paneles con trigger, tabProps y content
 * @param defaultTab - Tab inicial. @default primer tab
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Tabs from '@components/tabs'
 * <Tabs tabs={[{ id: 'a', trigger: 'A', tabProps: { variant: 'outline' }, content: … }]} />
 */
const Tabs: FC<Props> = ({ tabs, defaultTab, className }) => {
  const initial = defaultTab ?? tabs[0]?.id ?? ''
  const [active, setActive] = useState(initial)

  const panel = tabs.find((tab) => tab.id === active) ?? tabs[0]

  return (
    <View className={cn('gap-3', className)}>
      <View
        className={cn(
          'flex-row gap-1 border border-border bg-card p-1',
          BRAND.radius.variants.control,
        )}
      >
        {tabs.map((tab) => {
          const { id, trigger, tabProps } = tab
          const selected = id === active
          const isString = typeof trigger === 'string'
          const { className: tabClassName, ...buttonProps } = tabProps ?? {}

          return (
            <Button
              key={id}
              size="sm"
              variant={selected ? 'default' : 'ghost'}
              status={selected ? 'primary' : 'default'}
              {...buttonProps}
              onPress={() => setActive(id)}
              className={cn('flex-1', tabClassName)}
              label={isString ? trigger : undefined}
            >
              {!isString && resolveTrigger(trigger, selected)}
            </Button>
          )
        })}
      </View>
      <View key={active} className="transition-opacity duration-150 ease-out">
        {panel?.content}
      </View>
    </View>
  )
}

export type { TabButtonProps, Props as TabsProps, Tab as TabsTab, TabTrigger }
export default Tabs
