import React, { useState } from "react"
import { DrawingProps } from "../index.types"
import useProcessingImage from "../hooks/useProcessingImage"
import Stage from "./stage"
import { Basic } from "../types"

export const DrawingColor = "#52acff"

const index = (props: DrawingProps) => {
  if (props.imageUrl) {
    return <StageWithImage {...props} imageUrl={props.imageUrl} />
  }

  if (props.bounding) {
    return <TransparencyStage {...props} bounding={props.bounding} />
  }

  return null
}

/**
 * stage with a image background, all shapes will be draw inside the boundary of image
 */
const StageWithImage = (props: DrawingProps & { imageUrl: string }) => {
  const { boundary, element: imageElement } = useProcessingImage({
    url: props.imageUrl,
    width: props.width,
    height: props.height,
  })

  if (!imageElement) return null

  return <Stage {...props} boundary={boundary} imageElement={imageElement} />
}

/**
 * stage with empty background, all shapes will be draw inside the boundary user defined by bounding prop
 */
const TransparencyStage = (
  props: DrawingProps & { bounding: Basic.Boundary }
) => {
  return <Stage {...props} boundary={props.bounding} />
}

export default index
