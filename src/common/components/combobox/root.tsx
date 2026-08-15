import {
  type FC,
  type ReactNode,
  memo,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Check, ChevronDown } from 'lucide-react-native'

import ComboboxHostContext from '@components/combobox/host-context'
import { useComboboxStore } from '@components/combobox/store'
import Icon from '@components/icon'
import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

type ComboboxSlot = string | ReactNode

type ComboboxOption = {
  value: string
  label: string
  content?: ComboboxSlot
}

type ItemState = {
  selected: boolean
  isLast: boolean
}

type Anchor = {
  x: number
  y: number
  width: number
  height: number
}

type ComboboxPlacement = 'modal' | 'inline'

interface Props {
  options: ComboboxOption[]
  allOptions?: ComboboxOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  listHeader?: ReactNode
  renderItem?: (option: ComboboxOption, state: ItemState) => ReactNode
  onOpenChange?: (open: boolean) => void
  placement?: ComboboxPlacement
}

const LIST_MAX_HEIGHT = 240
const LIST_GAP = 4
const LIST_STYLE = { maxHeight: LIST_MAX_HEIGHT }

const itemTextClass = (selected: boolean) =>
  cn(
    'text-sm',
    selected && 'font-semibold text-foreground',
    !selected && 'text-secondary',
  )

const resolvePlacement = (
  placement: ComboboxPlacement | undefined,
  inHost: boolean,
): ComboboxPlacement => {
  if (placement) {
    return placement
  }

  if (inHost) {
    return 'inline'
  }

  return 'modal'
}

const renderOptionBody = (
  option: ComboboxOption,
  selected: boolean,
  renderItem?: Props['renderItem'],
  isLast = false,
) => {
  if (renderItem) {
    return renderItem(option, { selected, isLast })
  }

  const slot = option.content ?? option.label

  if (typeof slot === 'string') {
    return <Text className={itemTextClass(selected)}>{slot}</Text>
  }

  return slot
}

type ComboboxItemProps = {
  option: ComboboxOption
  selected: boolean
  isLast: boolean
  renderItem?: Props['renderItem']
  onSelect: (value: string) => void
}

const ComboboxItem = memo(function ComboboxItem({
  option,
  selected,
  isLast,
  renderItem,
  onSelect,
}: ComboboxItemProps) {
  const handlePress = useCallback(() => {
    onSelect(option.value)
  }, [onSelect, option.value])

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        'min-h-12 flex-row items-center justify-between gap-2 px-4 py-2 active:bg-card-hover',
        !isLast && 'border-b border-border',
        selected && 'bg-card',
      )}
    >
      <View className="flex-1">
        {renderOptionBody(option, selected, renderItem, isLast)}
      </View>
      {selected && <Icon icon={Check} tone="brand" size={16} />}
    </Pressable>
  )
})

type ListPanelProps = {
  options: ComboboxOption[]
  value?: string
  listHeader?: ReactNode
  renderItem?: Props['renderItem']
  onSelect: (value: string) => void
}

const ListPanel = memo(function ListPanel({
  options,
  value,
  listHeader,
  renderItem,
  onSelect,
}: ListPanelProps) {
  const lastIndex = options.length - 1

  return (
    <View
      className={cn(
        'overflow-hidden border border-border bg-background shadow-lg',
        BRAND.radius.variants.surface,
      )}
    >
      {listHeader}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        bounces={false}
        style={LIST_STYLE}
      >
        {options.map((item, index) => (
          <ComboboxItem
            key={item.value}
            option={item}
            selected={item.value === value}
            isLast={index === lastIndex}
            renderItem={renderItem}
            onSelect={onSelect}
          />
        ))}
      </ScrollView>
    </View>
  )
})

/**
 * Combobox — select in-place con opciones y slots personalizables por ítem.
 *
 * @param options - Opciones visibles en la lista
 * @param allOptions - Catálogo para el trigger; @default options
 * @param value - Valor seleccionado
 * @param onChange - Callback al elegir opción
 * @param placeholder - Texto sin selección. @default 'Seleccionar…'
 * @param listHeader - Contenido arriba de la lista
 * @param renderItem - Render por ítem; pisa content
 * @param placement - `modal` o `inline`. @default modal; inline en Dialog host
 * @param onOpenChange - Callback al abrir o cerrar
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Combobox from '@components/combobox'
 * <Combobox options={[{ value: 'pen', label: 'Pens' }]} value="pen" onChange={() => {}} />
 * <Combobox.Searchable options={options} value={v} onChange={setV} />
 */
const ComboboxRoot: FC<Props> = ({
  options,
  allOptions,
  value,
  onChange,
  placeholder = 'Seleccionar…',
  className,
  listHeader,
  renderItem,
  onOpenChange,
  placement: placementProp,
}) => {
  const id = useId()
  const inHost = useContext(ComboboxHostContext)
  const placement = resolvePlacement(placementProp, inHost)
  const triggerRef = useRef<View>(null)
  const wasOpen = useRef(false)
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const open = useComboboxStore((state) => state.activeId === id)
  const catalog = allOptions ?? options

  const selected = useMemo(
    () => catalog.find((option) => option.value === value),
    [catalog, value],
  )

  const triggerContent = useMemo(() => {
    if (!selected) {
      return <Text className="text-sm text-secondary">{placeholder}</Text>
    }

    const slot = selected.content ?? selected.label

    if (typeof slot !== 'string') {
      return slot
    }

    return <Text className="text-sm text-foreground">{slot}</Text>
  }, [placeholder, selected])

  useEffect(() => {
    if (wasOpen.current === open) {
      return
    }

    wasOpen.current = open
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    return () => {
      useComboboxStore.getState().close(id)
    }
  }, [id])

  const close = useCallback(() => {
    setAnchor(null)
    useComboboxStore.getState().close(id)
  }, [id])

  const openList = useCallback(() => {
    if (placement === 'inline') {
      useComboboxStore.getState().open(id)
      return
    }

    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height })
      useComboboxStore.getState().open(id)
    })
  }, [id, placement])

  const toggleOpen = useCallback(() => {
    if (open) {
      close()
      return
    }

    openList()
  }, [close, open, openList])

  const selectOption = useCallback(
    (nextValue: string) => {
      onChange(nextValue)
      close()
    },
    [close, onChange],
  )

  const listPanel = open && (
    <ListPanel
      options={options}
      value={value}
      listHeader={listHeader}
      renderItem={renderItem}
      onSelect={selectOption}
    />
  )

  const anchorStyle = useMemo(() => {
    if (!anchor) {
      return null
    }

    return {
      position: 'absolute' as const,
      top: anchor.y + anchor.height + LIST_GAP,
      left: anchor.x,
      width: anchor.width,
    }
  }, [anchor])

  return (
    <View
      ref={triggerRef}
      collapsable={false}
      className={cn('relative', open && 'z-50', className)}
    >
      <Pressable
        onPress={toggleOpen}
        className={cn(
          'min-h-11 flex-row items-center justify-between gap-3 border border-border bg-background px-4 py-2',
          BRAND.radius.variants.control,
          open && 'border-primary',
        )}
      >
        <View className="flex-1">{triggerContent}</View>
        <Icon icon={ChevronDown} tone="secondary" size={16} />
      </Pressable>

      {open && placement === 'inline' && (
        <View className="absolute left-0 right-0 top-full z-50 mt-1">
          {listPanel}
        </View>
      )}

      {placement === 'modal' && (
        <Modal
          visible={open}
          transparent
          animationType="none"
          onRequestClose={close}
        >
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel="Cerrar opciones"
          />
          {anchorStyle && <View style={anchorStyle}>{listPanel}</View>}
        </Modal>
      )}
    </View>
  )
}

export type {
  ItemState as ComboboxItemState,
  ComboboxOption,
  ComboboxPlacement,
  Props as ComboboxProps,
  ComboboxSlot,
}
export default ComboboxRoot
