import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { Camo } from '.'

describe('Vue Camo component', () => {
  it('should be rendered When is-only is false, the element specified in the as property', () => {
    // Arrange
    const props = { isOnly: false, as: 'main' }
    // Arrange
    const inputCode = `<main><p>testTest</p></main>`

    // Act
    const { container } = render(Camo, {
      props,
      slots: {
        default: `<p>testTest</p>`,
      },
    })
    // // Assert
    expect(container.innerHTML).toMatch(inputCode)
  })
  it('should be rendered only the p element', () => {
    // Arrange
    const props = { isOnly: true }
    // Arrange
    const inputCode = `<p>testTest</p>`

    // Act
    const { container } = render(Camo, {
      props,
      slots: {
        default: `<p>testTest</p>`,
      },
    })
    // // Assert
    expect(container.innerHTML).toMatch(inputCode)
  })
  it('should not be rendered When the is-all property is true, all elements should not be rendered', () => {
    // Arrange
    const props = { isAll: true }

    const inputCode = ``

    // Act
    const { container } = render(Camo, {
      props,
      slots: {
        default: `<p>testTest</p>`,
      },
    })

    // Assert
    expect(container.innerHTML).toMatch(inputCode)
  })
  it('should be rendered if any element has is-survivor enabled, only that element', () => {
    // Arrange
    const props = { isAll: true, as: 'main' }

    const inputCode = `<p>survivor</p>`
    // Act
    const { container } = render(Camo, {
      props,
      slots: {
        default: `<p>survivor</p><p :is-survivor=${true}>survivor</p>`,
      },
    })

    // Assert
    expect(container.innerHTML).toMatch(inputCode)
  })
  it('should be enabled is-only when a child element of a Camo tag has the is-only attribute set', () => {
    // Arrange
    const props = { isOnly: true, as: 'main' }

    const inputCode = `<p>testTest</p><p>survivor</p><h2>Hello</h2>`
    // Act
    const { container } = render(Camo, {
      props,
      slots: {
        default: `<div :is-only=${true}><p>testTest</p><p>survivor</p></div><h2>Hello</h2>`,
      },
    })
    // Assert
    expect(container.innerHTML).toMatch(inputCode)
  })
})
