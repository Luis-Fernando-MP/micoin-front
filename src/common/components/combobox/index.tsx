import ComboboxRoot from './root'
import Searchable from './extensions/searchable'

const Combobox = Object.assign(ComboboxRoot, {
  Searchable,
})

export type {
  ComboboxItemState,
  ComboboxOption,
  ComboboxPlacement,
  ComboboxProps,
  ComboboxSlot,
} from './root'
export default Combobox
