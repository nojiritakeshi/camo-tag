import {
  createElementBlock,
  defineComponent,
  ComponentOptions,
  VNode,
  cloneVNode,
  Fragment,
  getCurrentInstance as _getCurrentInstance,
  computed,
} from 'vue'
import { IS_ONLY, IS_SURVIVOR, V_IS_ALL, V_IS_ONLY, V_IS_SURVIVOR } from './constants'
import { MakeProps, CamoChildren } from './type'

export const Camo = genericComponent()({
  name: 'Camo',
  inheritAttrs: false,
  props: { as: 'div', [V_IS_ONLY]: false, [V_IS_SURVIVOR]: false, [V_IS_ALL]: false },
  setup(props, { slots }) {
    return () =>
      computed(() => {
        const cacheChildren: VNode[] = []
        const children = slots.default && slots.default()
        if (children == undefined) return
        const typedChildren = children as CamoChildren
        if (props[V_IS_ALL]) {
          processIsAllChildren(typedChildren, cacheChildren)
          if (cacheChildren.length > 0) {
            return createElementBlock(Fragment, {}, cacheChildren)
          }
          return createElementBlock(Fragment, {}, undefined)
        }
        processIsOnlyChildren(typedChildren, cacheChildren)
        const elementType = props[V_IS_ONLY] ? Fragment : props.as
        const excludeUniqueAttributeProps = {
          ...props,
          as: undefined,
          [V_IS_ONLY]: undefined,
          [V_IS_ALL]: undefined,
          [V_IS_SURVIVOR]: undefined,
        }
        const attribute = props[V_IS_ONLY] ? {} : { ...excludeUniqueAttributeProps }
        if (cacheChildren.length > 0) {
          return createElementBlock(elementType, attribute, cacheChildren)
        }
        return createElementBlock(props.as, { ...excludeUniqueAttributeProps }, children)
      }).value
  },
})

function genericComponent() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- FIXME
  // @ts-ignore -- FIXME
  return (options: ComponentOptions<MakeProps>) => defineComponent(options)
}

/**
 * 1. If children is not a VNode, do nothing and return;
 * 2. If children is a VNode, cast to typedChild
 * 3. If props[IS_ALL] is true and typedChild.props[IS_SURVIVOR] is true,
 * clone typedChild.props[IS_SURVIVOR] as undefined and push it to cacheChildren.
 * 4. If typedChild.props.children exists, call this function recursively.
 * @param children
 * @param cacheChildren
 * @returns
 */
function processIsAllChildren(children: CamoChildren, cacheChildren: VNode[]) {
  if (typeof children === 'string' || children == null) return
  for (const child of [...children]) {
    if (child.children) {
      if (child.props && (child.props[V_IS_SURVIVOR] || child.props[IS_SURVIVOR])) {
        const props = {
          ...child.props,
          [V_IS_SURVIVOR]: undefined,
          [IS_SURVIVOR]: undefined,
          [V_IS_ONLY]: undefined,
          [IS_ONLY]: undefined,
        }
        // Remove is-survivor from child.props.
        const clone = cloneVNode(child, { ...props })
        cacheChildren.push(clone)
        continue
      }
      // If the child element has further child elements, call this function recursively.
      processIsAllChildren(child.children as CamoChildren, cacheChildren)
    } else {
      if (child.props && (child.props[V_IS_SURVIVOR] || child.props[IS_SURVIVOR])) cacheChildren.push(child)
    }
  }
}

/**
 * 1. If children is not a VNode, do nothing and return;
 * 2. If children is a VNode, cast to typedChild
 * 3. If typedChild.props.children exists,
 *   1. If typedChild.props[IS_ONLY] is true, clone typedChild.props.children and push it to cacheChildren.
 *   2. If typedChild.props[IS_ONLY] is false, call this function recursively.
 * @param children
 * @param cacheChildren
 * @returns
 */
function processIsOnlyChildren(children: CamoChildren, cacheChildren: VNode[]) {
  if (typeof children === 'string' || children == null) return
  for (const child of [...children]) {
    if (child.children) {
      if (child.props && (child.props[V_IS_ONLY] || child.props[IS_ONLY])) {
        processIsOnlyChildren(child.children as CamoChildren, cacheChildren)
        continue
      }

      const props = {
        ...child.props,
        [V_IS_SURVIVOR]: undefined,
        [IS_SURVIVOR]: undefined,
        [V_IS_ONLY]: undefined,
        [IS_ONLY]: undefined,
      }
      const clone = cloneVNode(child, { ...props })
      cacheChildren.push(clone)
    } else {
      cacheChildren.push(child)
    }
  }
}
