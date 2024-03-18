import { VNode, RendererNode, RendererElement, getCurrentInstance as _getCurrentInstance } from 'vue'
import { IS_ONLY, V_IS_ALL, V_IS_ONLY, V_IS_SURVIVOR } from './constants'

export type MakeProps = {
  as: string
  [V_IS_ONLY]: boolean
  [IS_ONLY]: boolean
  [V_IS_SURVIVOR]: boolean
  [V_IS_ALL]: boolean
}

// type VNodeChildren = CamoChildren[] | string | RawSlots | null
type VNodeChildren = CamoChildren[] | string | null

export type CamoChildren = VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: unknown
    // children: CamoChildren[]
    [V_IS_SURVIVOR]?: boolean
    [V_IS_ONLY]?: boolean
    [IS_ONLY]?: boolean
    [V_IS_ALL]?: boolean
  }
> &
  VNodeChildren
