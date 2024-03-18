import React, { forwardRef as forwardReactRef } from 'react'
import { As, ComponentWithAs, PropsOf, RightJoinProps } from './types'
import { IS_ALL, IS_ONLY, IS_SURVIVOR } from './constants'

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As
      [IS_ONLY]?: boolean
      [IS_ALL]?: boolean
      [IS_SURVIVOR]?: boolean
    }
  >,
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<Component, Props>
}
