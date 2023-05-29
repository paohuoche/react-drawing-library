import React from "react"
import { Basic } from "../../types"
import { Stage } from "konva/lib/Stage"
import Konva from "konva"
import { Layer } from "konva/lib/Layer"
import { Rect } from "konva/lib/shapes/Rect"
import { KonvaNodeEvents } from "react-konva"
import { EventsListener } from "../../stage/generateListener"

const DrawingColor = "#52acff"

export const handleCreate = (stage: Stage) => {
  const { r, g, b } = Konva.Util.getRGB(DrawingColor)

  let layer: Layer // drawing layer
  let newRect: Rect
  let isDrawing = false
  let begin_point = { x: 0, y: 0 }

  /**
   * listening mouseDown
   * @param coord coordinate of mouse click
   * @param e
   * @returns
   */
  const onMouseDown: (coord: Basic.Coord) => KonvaNodeEvents["onMouseDown"] =
    (coord) => () => {
      layer = new Konva.Layer({
        id: "drawingLayer",
      })

      isDrawing = true

      newRect = new Konva.Rect({
        strokeScaleEnabled: false,
        fill: `rgba(${r}, ${g}, ${b}, .3)`,
        strokeWidth: 2,
        stroke: DrawingColor,
      })
      layer.add(newRect)
      stage.add(layer)

      begin_point = coord

      newRect.x(coord.x)
      newRect.y(coord.y)
    }

  /**
   * handle drawing
   * @param coord the coordinate of cursor in realtime
   * @returns
   */
  const onMouseMove: (coord: Basic.Coord) => KonvaNodeEvents["onMouseMove"] =
    (coord) => (e) => {
      if (!isDrawing) return

      newRect.width(coord.x - begin_point.x)
      newRect.height(coord.y - begin_point.y)
      layer.batchDraw()
    }

  /**
   * handle mouse up, finish drawing
   * @param coord the coordinate of cursor in realtime
   * @returns
   */
  const onMouseUp: EventsListener["onMouseUp"] = (coord) => (e) => {
    if (coord.x === begin_point.x || !isDrawing) {
      isDrawing = false
      layer?.destroy()
      return
    }

    // reset variable
    isDrawing = false
    layer?.destroy()

    return [begin_point, coord].sort((a, b) => a.x - b.x)
  }

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  }
}
