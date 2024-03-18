import React, { ReactElement, ReactNode, forwardRef as forwardReactRef } from 'react'
import { IS_ALL, IS_ONLY, IS_SURVIVOR } from './constants'
/* eslint-disable  @typescript-eslint/ban-types*/

export type As = React.ElementType

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As
  [IS_ALL]?: boolean
  [IS_ONLY]?: boolean
  [IS_SURVIVOR]?: boolean
}

export type OmitCommonProps<
  Target,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitAdditionalProps extends keyof any = never,
> = Omit<Target, 'as' | typeof IS_ALL | typeof IS_ONLY | typeof IS_SURVIVOR | OmitAdditionalProps> & {
  htmlTranslate?: 'yes' | 'no' | undefined
}

export type RightJoinProps<SourceProps extends object = {}, OverrideProps extends object = {}> = OmitCommonProps<
  SourceProps,
  keyof OverrideProps
> &
  OverrideProps

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = (RightJoinProps<ComponentProps, AdditionalProps> | RightJoinProps<AsProps, AdditionalProps>) & {
  as?: AsComponent
}

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<React.ComponentProps<Component>, React.ComponentProps<AsComponent>, Props, AsComponent>,
  ): JSX.Element

  displayName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propTypes?: React.WeakValidationMap<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: React.ValidationMap<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps?: Partial<any>
  id?: string
}

export type CamoComponent<T extends As = 'div'> = ComponentWithAs<
  T,
  {
    children: ReactNode
    [IS_ALL]?: boolean
    [IS_ONLY]?: boolean
    [IS_SURVIVOR]?: boolean
  }
>
