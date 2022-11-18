// Core
import { ReactElement, ReactNode } from 'react'
import { afterEach } from 'vitest'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { cleanup, render, RenderResult } from '@testing-library/react';
// Types
import { ICommonProps } from '@/types/common/global'

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

export const emulatorCensorObject = (options?: Partial<ICommonProps | any>, ui?: ReactElement): RenderResult => {
  return render(ui as ReactElement, {
    wrapper: ({ children }: { children: ReactNode }) =>
      <Provider store={store}>{children}</Provider>,
    ...options
  })
}

export * from '@testing-library/react'
