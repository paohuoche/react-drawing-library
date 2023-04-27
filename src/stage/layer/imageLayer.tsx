import React from "react"
import { Layer, Image } from "react-konva"
import useImage from "use-image"
import useProcessingImage from "../../hooks/useProcessingImage"
import { Basic } from "../../types"
// import useImage from "use-image"

function ImageLayer(props: {
  image: HTMLImageElement
  imageBounding: Basic.Boundary
}) {
  return (
    <Layer>
      <Image
        image={props.image}
        x={props.imageBounding.x}
        y={props.imageBounding.y}
        width={props.imageBounding.width}
        height={props.imageBounding.height}
      />
    </Layer>
  )
}

export default ImageLayer
