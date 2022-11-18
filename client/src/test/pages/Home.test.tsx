// Core
// import { ReactElement } from 'react'
// import { store } from '@/store'
// import { Provider } from 'react-redux'
import { it, describe, expect, vi } from 'vitest'
import {
  emulatorCensorObject,
  waitFor,
  renderHook,
  act,
  fireEvent
} from '@/test/utils'
// Censorship object
import Home from '@/pages/Home'
import { useSocket } from '@/hooks/useSocket'
// Others
import { SERVER_PORT } from '@/enums/socket.enum'
// Types
// import { ICommonProps } from '@/types/common/global'

// const emulatorCensorObject = (props?: Partial<ICommonProps | any>, ui?: ReactElement): RenderResult => {
//   return render(ui ||
//     <Provider store={store}>
//       <Home {...props}/>
//     </Provider>
//   )
// }

emulatorCensorObject({}, <Home/>)

describe('HomePage', () => {
  it('should render successfully', () => {
    const { getByText } = emulatorCensorObject()
    expect(getByText(/Your turn/i)).toBeInTheDocument()
  })

  describe('manipulationSocket()', () => {
    it('should connect successfully', () => {
      // const { result } = renderHook(() => useSocket())
      //
      // act(() => {
      //   result.current.socketConnect(SERVER_PORT)
      // })
    })

    it('should disconnect correctly', () => {})
  })

  describe('manipulationSelectBoxControl()', () => {
    // Happy cases
    it('should receive the correct selected data', () => {})

    it('should be enable when game isn\'t ready', () => {
      console.log('--emulatorCensorObject--', emulatorCensorObject())
      const { getByTestId } = emulatorCensorObject()
      expect(getByTestId('gameControl')).toBeEnabled()
    })

    it('should be disabled when game is ready', () => {
      // const { result } = renderHook(() => useSocket())
      //
      // act(() => {
      //   result.current.socketEmit('GAME_STATUS', 'start')
      // })
    })

    // Error cases
  })

  describe('manipulationResetGameButton()', () => {
    // Happy cases
    it('should call onClick successfully', () => {
      const spy = vi.fn()
      const { getByTestId } = emulatorCensorObject({ onClick: spy })

      fireEvent.click(getByTestId('resetGameButton'))

      waitFor(() => expect(spy).toHaveBeenCalled())
    })

    it('should contain text correctly', () => {
      const { getByTestId } = emulatorCensorObject()
      expect(getByTestId('resetGameButton')).toHaveTextContent('Reset')
    })

    it('should be disabled when game isn\'t ready', () => {
      const { getByTestId } = emulatorCensorObject()
      waitFor(() => expect(getByTestId('resetGameButton')).toBeDisabled())
    })

    it('should block reset action when user remove disabled attribute', () => {
      emulatorCensorObject()
    })

    it('should be enabled when game is ready', () => {
      emulatorCensorObject()
    })

    it('should implement reset game', () => {
      emulatorCensorObject()
    })

    // Error cases
  })
})
