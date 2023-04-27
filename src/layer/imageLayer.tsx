import React from "react"
import { Layer, Image } from "react-konva"
import useImage from "use-image"
import useProcessingImage from "../hooks/useProcessingImage"
// import useImage from "use-image"

function ImageLayer(props: {
  url: string
  imageInfo: ReturnType<typeof useProcessingImage>
}) {
  if (!props.imageInfo.image) return null

  return (
    <Layer>
      <Image
        image={props.imageInfo.image}
        x={props.imageInfo.x}
        y={props.imageInfo.y}
        width={props.imageInfo.width}
        height={props.imageInfo.height}
      />
    </Layer>
  )
}

export default ImageLayer
