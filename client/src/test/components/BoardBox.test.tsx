// Core
import { it, describe, expect, vi, expectTypeOf, assertType } from 'vitest'
import { emulatorCensorObject, fireEvent } from '@/test/utils'
// Censorship object
import BoardBox from '@/components/BoardBox'
// Types
import { IBoardBoxPropType } from '@/types/board'

// const emulatorCensorObject = (props?: Partial<ICommonProps | any>, ui?: ReactElement): RenderResult => {
//   return render(ui ||
//     <BoardBox id={0}
//               value={{ box: 'X', isRewardBox: false }}
//               type={3}
//               onClick={vi.fn()}
//               {...props}
//     />
//   )
// }

emulatorCensorObject({}, <BoardBox id={0}
                                   value={{ box: 'X', isRewardBox: false }}
                                   type={3}
                                   onClick={vi.fn()}/>)

describe('BoardBoxComponent', () => {
  // Happy cases
  it('should render successfully', () => {
    const { queryAllByRole } = emulatorCensorObject()
    expect(queryAllByRole('button')).not.toHaveLength(0)
  })

  it('should receive the correct props type', () => {
    const target = emulatorCensorObject()

    expectTypeOf(target).toBeObject()
    // @ts-ignore
    expectTypeOf(target).toMatchTypeOf<IBoardBoxPropType>()

    assertType(target)
  })

  // Error cases
})
