import { PointValue } from "./shapes/point/Point.types"
import { RectangleValue } from "./shapes/rectangle/Rectangle.types"
import { Basic, ESupportShape } from "./types"
import useShapes from "./useShapes"

export type DrawingProps = {
  imageUrl?: string
  width: number
  height: number
  shapes: ReturnType<typeof useShapes>
  bounding?: Basic.Boundary
  draw?: {
    type: keyof typeof ESupportShape
    color: string
    text?: string
  } | null
  //   draw: null
  beforeCreate?: () => Promise<boolean>
  onCreate?: (value: RectangleValue | PointValue) => void
  //   afterCreate: () => void
  //   beforeUpdate: () => void
  onUpdate?: (value: RectangleValue | PointValue) => void
  //   beforeDelete: () => void
  onDelete?: (value: RectangleValue | PointValue) => void
  //   onBlankClick: () => void
  //   onBlankRightClick: () => void
}
