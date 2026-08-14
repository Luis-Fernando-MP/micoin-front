import { type FC, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

import ComboboxRoot, {
  type ComboboxOption,
  type ComboboxProps,
} from '@components/combobox/root'
import Input from '@components/input'

type Props = Omit<ComboboxProps, 'listHeader' | 'options'> & {
  options: ComboboxOption[]
  searchPlaceholder?: string
}

/**
 * Combobox.Searchable — combobox con filtro local mientras escribes.
 *
 * @param options - Opciones completas antes del filtro
 * @param searchPlaceholder - Placeholder del buscador. @default 'Buscar…'
 * @param value - Valor seleccionado
 * @param onChange - Callback al elegir opción
 *
 * @example
 * import Combobox from '@components/combobox'
 * <Combobox.Searchable options={options} value={v} onChange={setV} />
 */
const Searchable: FC<Props> = ({
  options,
  searchPlaceholder = 'Buscar…',
  onOpenChange,
  ...props
}) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return options
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized),
    )
  }, [options, query])

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setQuery('')
      }

      onOpenChange?.(nextOpen)
    },
    [onOpenChange],
  )

  const listHeader = useMemo(
    () => (
      <View className="border-b border-border px-3 py-2">
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder={searchPlaceholder}
          variant="ghost"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    ),
    [query, searchPlaceholder],
  )

  return (
    <ComboboxRoot
      {...props}
      options={filtered}
      allOptions={options}
      onOpenChange={handleOpenChange}
      listHeader={listHeader}
    />
  )
}

export type { Props as ComboboxSearchableProps }
export default Searchable
