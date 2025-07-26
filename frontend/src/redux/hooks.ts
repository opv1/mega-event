import { createSelectorHook, useDispatch } from 'react-redux'

import type { AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: <Selected>(
  selector: (state: RootState) => Selected,
  equalityFn?: ((previous: Selected, next: Selected) => boolean) | undefined,
) => Selected = createSelectorHook()
