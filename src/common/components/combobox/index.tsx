import Searchable from './extensions/searchable'
import ComboboxRoot from './root'

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
