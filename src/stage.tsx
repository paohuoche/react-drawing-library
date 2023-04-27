import React, { useRef } from "react"
// import { DrawingProps } from "."
import { KonvaNodeEvents, Stage } from "react-konva"
import ImageLayer from "./layer/imageLayer"
import useProcessingImage from "./hooks/useProcessingImage"
import { Stage as StageType } from "konva/lib/Stage"
import useListeningCreateShape from "./hooks/useListeningCreateShape"
import { DrawingProps } from "./index.types"
import boundCheck from "./utils/boundCheck"
import { v4 as uuidv4 } from "uuid"
import ShapesLayer from "./layer/shapesLayer"
import { Base, ESupportShape } from "./types"

const Drawing = (props: DrawingProps) => {
  const url = props.imageUrl
  const stageRef = useRef<StageType>(null!)

  const draw = {
    type: "Rectangle" as keyof typeof ESupportShape,
    color: "#52acff",
    text: "aa",
  }

  // processing the image
  const imageInfo = useProcessingImage({
    url,
    width: props.width,
    height: props.height,
  })

  // binding the event listeners for drawing shapes
  const eventListeners = useListeningCreateShape({
    stage: stageRef.current,
    draw,
  })

  //
  const onMouseDown: KonvaNodeEvents["onMouseDown"] = (e) => {
    const { outside, coord } = boundCheck(stageRef.current, imageInfo)
    if (e.evt.altKey || e.evt.button === 2 || outside) {
      return
    }
    eventListeners.onMouseDown?.(coord)?.(e)
  }

  //
  const onMouseMove: KonvaNodeEvents["onMouseMove"] = (e) => {
    const { outside, coord } = boundCheck(stageRef.current, imageInfo)
    if (e.evt.altKey || e.evt.button === 2) {
      return
    }
    eventListeners.onMouseMove?.(coord)?.(e)
  }

  //
  const onMouseUp: KonvaNodeEvents["onMouseUp"] = (e) => {
    const { outside, coord, boundedCoord } = boundCheck(
      stageRef.current,
      imageInfo
    )
    if (e.evt.altKey || e.evt.button === 2) {
      return
    }

    console.log("create")
    const create = (coords: Base.Coord[]) => {
      console.log("add")
      props.drawing.add({
        type: draw.type,
        coords,
        color: draw.color,
        id: uuidv4(),
      })
    }

    eventListeners.onMouseUp?.(boundedCoord, create)?.(e)
  }

  return (
    <div>
      <Stage
        ref={stageRef}
        width={props.width}
        height={props.height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <ImageLayer url={url} imageInfo={imageInfo} />
        <ShapesLayer shapes={props.drawing.shapes} />
      </Stage>
    </div>
  )
}

export default Drawing
