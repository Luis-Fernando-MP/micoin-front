import { create } from 'zustand'

type ComboboxStore = {
  activeId: string | null
  open: (id: string) => void
  close: (id: string) => void
}

/**
 * useComboboxStore — solo un Combobox abierto a la vez.
 *
 * Suscribirse con selector booleano por id (`s.activeId === id`) para no
 * re-renderizar hermanos. Acciones vía `getState()`.
 *
 * @example
 * const open = useComboboxStore((s) => s.activeId === id)
 * useComboboxStore.getState().open(id)
 */
const useComboboxStore = create<ComboboxStore>((set, get) => ({
  activeId: null,
  open: (id) => {
    if (get().activeId === id) {
      return
    }

    set({ activeId: id })
  },
  close: (id) => {
    if (get().activeId !== id) {
      return
    }

    set({ activeId: null })
  },
}))

export { useComboboxStore }
