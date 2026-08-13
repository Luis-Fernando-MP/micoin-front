import ComboboxRoot from './root'
import Searchable from './extensions/searchable'

const Combobox = Object.assign(ComboboxRoot, {
  Searchable,
})

export type {
  ComboboxItemState,
  ComboboxOption,
  ComboboxProps,
  ComboboxSlot,
} from './root'
export default Combobox
