import { Stage } from "konva/lib/Stage"
import { Base } from "../types"

export default function boundCheck(
  stage: Stage,
  imageInfo: {
    x: number
    y: number
    width: number
    height: number
  }
): {
  outside: boolean
  coord: Base.Coord // coord 是 transform.invert 后的坐标
  boundedCoord: Base.Coord // Coordinates within the boundary of the image
} {
  const point = stage.getPointerPosition()!

  const transform = stage.getAbsoluteTransform().copy()
  transform.invert()
  const trPoint = transform.point(point)

  const boundedCoord = { ...trPoint }
  const imageLeftX = imageInfo.x
  const imageRightX = imageInfo.x + imageInfo.width

  const imageTopY = imageInfo.y
  const imageBottomY = imageInfo.y + imageInfo.height

  if (boundedCoord.x < imageLeftX) {
    boundedCoord.x = imageLeftX
  } else if (boundedCoord.x > imageRightX) {
    boundedCoord.x = imageRightX
  }

  const { x, y, width, height } = imageInfo

  const outside =
    point.x < x || point.y < y || point.x > width + x || point.y > height + y

  return {
    outside,
    coord: trPoint,
    boundedCoord,
  }
}
