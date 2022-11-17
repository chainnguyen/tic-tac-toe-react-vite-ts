// Core
import { it, describe, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'

// Censorship object
import Home from '@/pages/Home'

// Others
import { renderCensorObject } from '@/tests/helper'

// Types

describe('HomePage Suite', () => {
  it('should render successfully', () => {
    const { container } = renderCensorObject(<Home/>)
    expect(container.querySelectorAll('[data-vitest]')).toBeDefined()
  })

  describe('manipulationSelectBoxControl()', () => {
    // Happy cases
    it('should receive the correct selected data', () => {

    })

    // Error cases
  })

  describe('manipulationResetGameButton()', () => {
    // Happy cases
    it('should call onClick successfully', () => {
      const spy = vi.fn()
      const { getByTestId } = renderCensorObject(<Home/>)

      fireEvent.click(getByTestId('resetButton'))
      expect(spy).toHaveBeenCalled()
    })
    it('should disable when game isn\'t ready', () => {

    })
    it('should enabled when game is ready', () => {})
    it('should implement reset game', () => {})

    // Error cases
  })
})
