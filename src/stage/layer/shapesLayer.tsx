import React, { memo, useContext } from "react"
import useDrawing from "../../useShapes"
import { Layer } from "react-konva"
import Rectangle, { EditRectangle } from "../../shapes/rectangle"
import { Basic } from "../../types"
import { toReal, toStage } from "../../utils/transformCoord"
import { StageContext } from "../stage"
import Point from "../../shapes/point/Point"
// import Rectangle from "../shapes/rectangle"

const ShapesLayer = (props: {
  shapes: ReturnType<typeof useDrawing>["shapes"]
  imageBounding: Basic.Boundary
}) => {
  const context = useContext(StageContext)

  /**
   * update shape data
   */
  const update = (value: Basic.Shape) => {
    context.shapes.update(value)
  }

  /**
   * delete shape data
   */
  const del = (id: string) => {
    context.shapes.del(id)
  }

  /**
   * highlight selected shape
   */
  const focus = (id: string) => {
    if (context.draw) return
    context.shapes.focus(id)
  }

  let element = []

  for (let id in props.shapes) {
    let shape = props.shapes[id]

    if (!shape.visible) continue

    switch (shape.type) {
      case "Rectangle": {
        const value = {
          ...shape,
          coords: toStage(shape.coords, props.imageBounding),
        }

        let rect = (
          <Rectangle
            key={value.id}
            value={value}
            selected={context.shapes.getFocusId() === value.id}
            draggable={!context.draw}
            focus={focus}
            del={del}
            visible={context.shapes.getFocusId() !== value.id}
            onDragEnd={(lt, size) => {
              const rb = {
                x: lt.x + size.width,
                y: lt.y + size.height,
              }
              update({
                ...value,
                coords: toReal([lt, rb], props.imageBounding),
              })
            }}
          />
        )
        element.push(rect)
        break
      }

      case "Point": {
        const value = {
          ...shape,
          coords: toStage(shape.coords, props.imageBounding),
        }
        let point = (
          <Point
            key={value.id}
            value={value}
            del={del}
            visible={context.shapes.getFocusId() !== value.id}
            selected={context.shapes.getFocusId() === value.id}
            draggable={!context.draw}
            onDragEnd={(lt) => {
              update({
                ...value,
                coords: toReal([lt], props.imageBounding),
              })
            }}
          />
        )
        element.push(point)
        break
      }

      default:
        break
    }
  }

  return (
    <>
      <Layer>{element}</Layer>

      {/* used for draging shape */}
      <Layer name="top-layer" />
    </>
  )
}

export default ShapesLayer
