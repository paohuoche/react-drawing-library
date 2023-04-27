import React, { memo } from "react"
import useDrawing from "../useDrawing"
import { Layer } from "react-konva"
import { Rectangle } from "../shapes/rectangle"
// import Rectangle from "../shapes/rectangle"

const ShapesLayer = memo(
  (props: { shapes: ReturnType<typeof useDrawing>["shapes"] }) => {
    let element = []

    for (let id in props.shapes) {
      const shape = props.shapes[id]

      switch (shape.type) {
        case "Rectangle": {
          let tmp = <Rectangle key={shape.id} value={shape} />
          element.push(tmp)
          break
        }

        case "Point": {
          break
        }
        // case 'Rect': {

        //   break
        // }
        // case "Rectangle": {
        //   let tmp = <Rectangle value={props.shapes[id]} />
        //   break
        // }

        // case "Point": {
        //   break
        // }

        default:
          break
      }
    }

    console.log(element)

    return <Layer>{element}</Layer>
  }
)

export default ShapesLayer
