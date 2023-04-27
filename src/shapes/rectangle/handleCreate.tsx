import React from "react"
import { Base } from "../../types"
import { Stage } from "konva/lib/Stage"
import Konva from "konva"
import { Layer } from "konva/lib/Layer"
import { Rect } from "konva/lib/shapes/Rect"
import { KonvaNodeEvents } from "react-konva"
import { EventsListener } from "../../hooks/useListeningCreateShape"

export const handleCreate = (stage: Stage, draw: Base.Draw) => {
  const { r, g, b } = Konva.Util.getRGB(draw.color)

  let layer: Layer // drawing layer
  let newRect: Rect

  let isDrawing = false

  let begin_point = { x: 0, y: 0 }
  // let end_point = { x: 0, y: 0 }

  /**
   * listening mouseDown
   * @param coord coordinate of mouse click
   * @param e
   * @returns
   */
  const onMouseDown: (coord: Base.Coord) => KonvaNodeEvents["onMouseDown"] =
    (coord) => () => {
      layer = new Konva.Layer({
        id: "drawingLayer",
      })

      isDrawing = true

      newRect = new Konva.Rect({
        strokeScaleEnabled: false,
        // hitStrokeWidth: false,
        fill: `rgba(${r}, ${g}, ${b}, .3)`,
        strokeWidth: 2,
        stroke: draw.color,
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
  const onMouseMove: (coord: Base.Coord) => KonvaNodeEvents["onMouseMove"] =
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
  const onMouseUp: EventsListener["onMouseUp"] = (coord, cb) => (e) => {
    // if end_point.x === 0 , it indicate that cursor do not move
    if (coord.x === begin_point.x) {
      isDrawing = false
      layer?.destroy()
      return
    }

    cb?.([begin_point, coord].sort((a, b) => a.x - b.x))

    isDrawing = false

    // 完成绘制一个矩形后，重制起止坐标
    begin_point = { x: 0, y: 0 }
    // end_point = { x: 0, y: 0 }
    layer?.destroy()
  }

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  }
}
