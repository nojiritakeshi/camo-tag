import React, { ReactElement, ReactNode } from 'react'
import { CamoComponent } from './types'
import { IS_ALL, IS_ONLY, IS_SURVIVOR } from './constants'
import { forwardRef } from './forwardRef'

type CamoChildren = ReactElement<{
  children: ReactElement
  [IS_SURVIVOR]: boolean
  [IS_ONLY]?: boolean
  [IS_ALL]?: boolean
}> &
  React.HTMLAttributes<HTMLElement>

const Camo: CamoComponent = forwardRef(({ as = 'div', children, ...props }, ref) => {
  const cacheChildren: ReactNode[] = []
  if (props[IS_ALL]) {
    processIsAllChildren(children, cacheChildren)
    if (cacheChildren.length > 0) {
      return React.createElement(React.Fragment, {}, cacheChildren)
    }
    return <></>
  }
  processIsOnlyChildren(children, cacheChildren)
  const elementType = props[IS_ONLY] ? React.Fragment : as
  const excludeUniqueAttributeProps = { ...props, [IS_ONLY]: undefined, [IS_ALL]: undefined, [IS_SURVIVOR]: undefined }
  const attribute = props[IS_ONLY] ? {} : { ref, ...excludeUniqueAttributeProps }
  if (cacheChildren.length > 0) {
    return React.createElement(elementType, attribute, cacheChildren)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return React.createElement(as, { ref, ...excludeUniqueAttributeProps }, children)
})

/**
 * 1. If children is not a ReactElement, do nothing and return;
 * 2. If children is a ReactElement, cast to typedChild
 * 3. If props[IS_ALL] is true and typedChild.props[IS_SURVIVOR] is true,
 * clone typedChild.props[IS_SURVIVOR] as undefined and push it to cacheChildren.
 * 4. If typedChild.props.children exists, call this function recursively.
 * @param children
 * @param cacheChildren
 * @returns
 */
function processIsAllChildren(children: ReactNode, cacheChildren: ReactNode[]) {
  if (children == null) return
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return
    }
    const typedChild = child as CamoChildren
    if (typedChild.props?.children) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (typedChild.props[IS_SURVIVOR]) {
        // Remove is-survivor from child.props.
        const clone = React.cloneElement(typedChild, {
          ...typedChild.props,
          [IS_SURVIVOR]: undefined,
          [IS_ONLY]: undefined,
        })
        cacheChildren.push(clone)
        return
      }
      // If the child element has further child elements, call this function recursively.
      processIsAllChildren(typedChild.props.children, cacheChildren)
    } else {
      if (typedChild.props[IS_SURVIVOR]) cacheChildren.push(child)
    }
  })
}

/**
 * 1. If children is not a ReactElement, do nothing and return;
 * 2. If children is a ReactElement, cast to typedChild
 * 3. If typedChild.props.children exists,
 *   1. If typedChild.props[IS_ONLY] is true, clone typedChild.props.children and push it to cacheChildren.
 *   2. If typedChild.props[IS_ONLY] is false, call this function recursively.
 * @param children
 * @param cacheChildren
 * @returns
 */
function processIsOnlyChildren(children: ReactNode, cacheChildren: ReactNode[]) {
  if (children == null) return
  const childrenArray = React.Children.toArray(children)
  for (const child of childrenArray) {
    if (!React.isValidElement(child)) {
      continue
    }
    const baseKey = child.key || 'defaultKey'
    const typedChild = { ...child, key: `${baseKey}${Math.random()}` } as CamoChildren
    if (typedChild.props?.children) {
      if (typedChild.props[IS_ONLY]) {
        processIsOnlyChildren(typedChild.props.children, cacheChildren)
        continue
      }

      const props = {
        ...typedChild.props,
        [IS_SURVIVOR]: undefined,
        [IS_ONLY]: undefined,
      }
      const clone = React.cloneElement(typedChild, { ...props }, typedChild.props.children)
      cacheChildren.push(clone)
    } else {
      cacheChildren.push(child)
    }
  }
}

export { Camo }
