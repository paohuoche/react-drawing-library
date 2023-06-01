import React, { useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { Stage as StageType } from "konva/lib/Stage"
import { Stage } from "react-konva"
import ImageLayer from "./layer/imageLayer"
import { DrawingProps } from "../index.types"
import ShapesLayer from "./layer/shapesLayer"
import { Basic } from "../types"
import generateListener from "./generateListener"
import * as transformCoord from "../utils/transformCoord"

type StageContextType = DrawingProps & {
  //   toStage: (coords: Basic.Coord[]) => Basic.Coord[]
  toReal: (coords: Basic.Coord[]) => Basic.Coord[]
}

export const StageContext = React.createContext<StageContextType>(null!)

const Drawing = (
  props: DrawingProps & {
    boundary: Basic.Boundary
    imageElement?: HTMLImageElement
  }
) => {
  const stageRef = useRef<StageType>(null!)

  const { boundary, imageElement } = props

  const draw = props.draw

  /**
   * register listener
   */
  useEffect(() => {
    /**
     * append shapes in store
     * @param coords
     */
    const handleAppendShape = async (coords: Basic.Coord[]) => {
      if (draw) {
        try {
          let isAdd = true
          if (props.beforeCreate) {
            isAdd = await props.beforeCreate()
          }

          if (isAdd) {
            let value = {
              type: draw.type,
              coords: transformCoord.toReal(coords, boundary),
              color: draw.color,
              id: uuidv4(),
              text: draw.text,
              visible: true,
            }
            props.shapes.add(value)
            props.onCreate?.(value)
          }
        } catch (error) {}
      }
    }

    /**
     * all kinds of listeners
     */
    const { onMouseDown, onMouseMove, onMouseUp } = generateListener({
      stage: stageRef.current,
      draw,
      boundary,
      handleAppendShape,
    })

    stageRef.current.on("mousedown", onMouseDown)
    stageRef.current.on("mousemove", onMouseMove)
    stageRef.current.on("mouseup", onMouseUp(handleAppendShape))

    return () => {
      stageRef.current?.off("mousedown")
      stageRef.current?.off("mousemove")
      stageRef.current?.off("mouseup")
    }
  }, [draw, boundary])

  // const toStage: StageContextType["toStage"] = (coords) => {
  //   console.log(imageBounding)
  //   return transformCoord.toStage(coords, imageBounding)
  // }

  const toReal: StageContextType["toReal"] = (coords) => {
    return transformCoord.toReal(coords, boundary)
  }

  return (
    <div
      id="DrawingStage"
      onContextMenu={(e) => {
        e.preventDefault()
        return false
      }}
    >
      <StageContext.Provider value={{ ...props, toReal }}>
        <Stage ref={stageRef} width={props.width} height={props.height}>
          {imageElement ? (
            <ImageLayer image={imageElement} imageBounding={boundary} />
          ) : null}

          <ShapesLayer
            shapes={props.shapes.shapes}
            imageBounding={boundary}
            deleteCallback={props.onDelete}
          />
          {/* {props.shapes.selectedId ? (
          <Modification shape={selectedShape} imageBounding={imageBounding} />
        ) : null} */}
        </Stage>
      </StageContext.Provider>
    </div>
  )
}

export default Drawing
