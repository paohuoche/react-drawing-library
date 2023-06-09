import { Basic } from "../../types"

export interface RectangleValue extends Basic.Shape {
  type: "Rectangle"
}

export type RectangleProps = {
  value: RectangleValue
  selected?: boolean
  draggable: boolean
  visible: boolean
  focus?: (id: string) => void
  del?: (id: string) => void
  onDragMove?: (
    position: Basic.Coord,
    size: { width: number; height: number }
  ) => void
  onDragEnd?: (
    position: Basic.Coord,
    size: { width: number; height: number }
  ) => void
}
