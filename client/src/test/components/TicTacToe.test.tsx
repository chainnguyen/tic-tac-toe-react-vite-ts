// Core
import { it, describe, expect, vi, assertType, expectTypeOf } from 'vitest'
import { emulatorCensorObject, fireEvent } from '@/test/utils'
// Censorship object
import TicTacToe from '@/components/TicTacToe'
// Others

// Types
import { ITicTacToePropType } from '@/types/game'

// const emulatorCensorObject = (props?: Partial<ICommonProps | any>, ui?: ReactElement): RenderResult => {
//   return render(ui ||
//     <Provider store={store}>
//       <TicTacToe type={3}
//                  controller={vi.fn()}
//                  {...props}
//       />
//     </Provider>
//   )
// }

emulatorCensorObject({}, <TicTacToe type={3} controller={vi.fn()}/>)

describe('TicTacToeComponent', () => {
  // Happy cases
  it('should render successfully', () => {
    const { getByTestId } = emulatorCensorObject()
    expect(getByTestId('TicTacToeComponent')).toBeInTheDocument()
  })

  it('should receive the correct props type', () => {
    const target = emulatorCensorObject()

    expectTypeOf(target).toBeObject()
    // @ts-ignore
    expectTypeOf(target).toMatchTypeOf<ITicTacToePropType>()

    assertType(target)
  })

  // Error cases
})
