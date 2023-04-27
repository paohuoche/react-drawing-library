import { Basic } from "../../types"

export interface PointValue extends Basic.Shape {
  type: "Point"
}

export type PointProps = {
  value: PointValue
  selected?: boolean
  draggable: boolean
  visible: boolean
  focus?: (id: string) => void
  del?: (id: string) => void
  onDragMove?: (
    position: Basic.Coord,
    size: { width: number; height: number }
  ) => void
  onDragEnd?: (position: Basic.Coord) => void
}
