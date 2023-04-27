import React, { useState } from "react"
import { Shape } from "./index.types"
import { Rectangle } from "./shapes/rectangle/Rectangle.types"
import { Point } from "./shapes/point/index.types"

const useDrawing = () => {
  const [shapes, setShapes] = useState<{ [id: string]: Rectangle | Point }>({})

  const add = (shape: Rectangle | Point) => {
    setShapes((all) => ({
      ...all,
      [shape.id]: shape,
    }))
  }

  const del = (id: string) => {
    setShapes((shapes) => {
      delete shapes[id]
      return { ...shapes }
    })
  }

  const update = (shape: Rectangle | Point) => {
    setShapes((shapes) => ({
      ...shapes,
      [shape.id]: {
        ...shapes[shape.id],
        ...shape,
      },
    }))
  }

  return {
    shapes,
    add,
    del,
    update,
  }
}

export default useDrawing
