import { describe, it, expect, expectTypeOf, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Camo } from './Camo'
import React, { ComponentProps, MouseEventHandler, createRef } from 'react'
import { IS_ALL, IS_ONLY } from './constants'

describe('React Camo component', () => {
  test(' should be rendered When is-only is false, the element specified in the as property', () => {
    // Arrange
    const props = { [IS_ONLY]: false }
    // Arrange
    const inputCode = `<main><p>testTest</p></main>`

    // Act
    const rendered = render(
      <Camo as="main" {...props}>
        <p>testTest</p>
      </Camo>,
    )
    // // Assert
    expect(rendered.container.innerHTML).toMatch(inputCode)
  })
  test('should be rendered only the p element', () => {
    // Arrange
    const props = { [IS_ONLY]: true }
    // Arrange
    const inputCode = `<p>testTest</p>`

    // Act
    const rendered = render(
      <Camo {...props}>
        <p>testTest</p>
      </Camo>,
    )
    // // Assert
    expect(rendered.container.innerHTML).toMatch(inputCode)
  })
  test('should not be rendered When the is-all property is true, all elements should not be rendered', () => {
    // Arrange
    const props = { [IS_ALL]: true }

    const inputCode = ``

    // Act
    const rendered = render(
      <Camo {...props}>
        <p>testTest</p>
      </Camo>,
    )

    // Assert
    expect(rendered.container.innerHTML).toMatch(inputCode)
  })

  test('should be rendered if any element has is-survivor enabled, only that element', () => {
    // Arrange
    const props = { [IS_ALL]: true }

    const inputCode = `<p>survivor</p>`
    // Act
    const rendered = render(
      <Camo as="main" {...props}>
        <p>testTest</p>
        <p is-survivor={true}>survivor</p>
      </Camo>,
    )
    // Assert
    expect(rendered.container.innerHTML).toMatch(inputCode)
  })

  test('should be enabled is-only when a child element of a Camo tag has the is-only attribute set', () => {
    // Arrange
    const props = { [IS_ONLY]: true }

    const inputCode = `<p>testTest</p><p>survivor</p>`
    // Act
    const rendered = render(
      <Camo as="main" {...props}>
        <div {...props}>
          <p>testTest</p>
          <p>survivor</p>
        </div>
      </Camo>,
    )
    // Assert
    expect(rendered.container.innerHTML).toMatch(inputCode)
  })
})
