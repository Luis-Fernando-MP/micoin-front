import { create } from 'zustand'

type ComboboxStore = {
  activeId: string | null
  open: (id: string) => void
  close: (id: string) => void
}

/**
 * useComboboxStore — solo un Combobox abierto a la vez.
 *
 * @example
 * const activeId = useComboboxStore((s) => s.activeId)
 * useComboboxStore.getState().open(id)
 */
const useComboboxStore = create<ComboboxStore>((set, get) => ({
  activeId: null,
  open: (id) => set({ activeId: id }),
  close: (id) => {
    if (get().activeId !== id) {
      return
    }

    set({ activeId: null })
  },
}))

export { useComboboxStore }
