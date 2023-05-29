// import { Coord, ImageInfo } from '../index.types'

import { Basic } from "../types"

/**
 * transform the coordinate to related to image bounding
 * @param draw
 * @param imageInfo
 * @returns
 */
export const toReal = (
  stageCoords: Basic.Coord[],
  imageInfo: Basic.Boundary
) => {
  return stageCoords.map((coord) => ({
    x: (coord.x - imageInfo.x) / imageInfo.scale,
    y: (coord.y - imageInfo.y) / imageInfo.scale,
  }))
}

/**
 * transform the coordinate to related to konva stage
 * @param real
 * @param imageInfo
 * @returns
 */
export const toStage = (real: Basic.Coord[], imageInfo: Basic.Boundary) => {
  return real.map((coord) => ({
    x: coord.x * imageInfo.scale + imageInfo.x,
    y: coord.y * imageInfo.scale + imageInfo.y,
  }))
}
