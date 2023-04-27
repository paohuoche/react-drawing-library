import { Base, ESupportShape } from "./types"
import useDrawing from "./useDrawing"

export type DrawingProps = {
  imageUrl: string
  width: number
  height: number
  drawing: ReturnType<typeof useDrawing>
  //   draw: null
  //   beforeCreate: () => void
  //   onCreate: () => void
  //   afterCreate: () => void
  //   beforeUpdate: () => void
  //   onUpdate: () => void
  //   beforeDelete: () => void
  //   onDelete: () => void
  //   onBlankClick: () => void
  //   onBlankRightClick: () => void
}

export type Shape = {
  type: keyof typeof ESupportShape
  id: string
  coords: Base.Coord[]
  color: string
  text?: string
}
