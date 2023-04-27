import React, { useEffect } from "react"
import { KonvaNodeEvents } from "react-konva"
import boundCheck from "../utils/boundCheck"
import { Stage } from "konva/lib/Stage"
import { DrawingProps } from "../index.types"
import { Basic } from "../types"
import { KonvaEventListener, KonvaEventObject } from "konva/lib/Node"
import { handleCreateRectangle } from "../shapes/rectangle"

export type EventsListener = {
  onMouseDown?: (coord: Basic.Coord) => KonvaNodeEvents["onMouseDown"]
  onMouseMove?: (coord: Basic.Coord) => KonvaNodeEvents["onMouseMove"]
  onMouseUp?: (
    coord: Basic.Coord
  ) => (e: KonvaEventObject<MouseEvent>) => Basic.Coord[] | undefined
}

const generateListener = (params: {
  stage: Stage
  draw: DrawingProps["draw"]
  boundary: Basic.Boundary
  handleAppendShape: (coords: Basic.Coord[]) => Promise<any>
}) => {
  const { stage, draw, boundary } = params
  let onMouseDown: KonvaEventListener<Stage, MouseEvent> = () => {}
  let onMouseMove: KonvaEventListener<Stage, MouseEvent> = () => {}
  let onMouseUp: (
    cb?: (params: Basic.Coord[]) => void
  ) => KonvaEventListener<Stage, MouseEvent> = () => () => {}
  // let onMouseClick: EventsListener['onMouseClick']

  if (stage && draw) {
    /**
     * event listeners of different shape creation
     */
    let eventListeners: EventsListener = {}

    switch (draw.type) {
      case "Rectangle": {
        eventListeners = handleCreateRectangle(params.stage)
        break
      }

      case "Point": {
        eventListeners.onMouseUp = (coords: Basic.Coord) => (e) => [coords]

        break
      }

      default:
        break
    }

    onMouseDown = (e) => {
      const { outside, coord } = boundCheck(stage, boundary)
      if (e.evt.altKey || e.evt.button === 2 || outside) {
        return
      }
      eventListeners.onMouseDown?.(coord)?.(e)
    }

    onMouseMove = (e) => {
      const { outside, coord } = boundCheck(stage, boundary)
      if (e.evt.altKey || e.evt.button === 2) {
        return
      }
      eventListeners.onMouseMove?.(coord)?.(e)
    }

    onMouseUp = (cb) => (e) => {
      const { outside, coord, boundedCoord } = boundCheck(stage, boundary)
      if (e.evt.altKey || e.evt.button === 2) {
        return
      }
      const coords = eventListeners.onMouseUp?.(boundedCoord)?.(e)
      if (coords && cb) {
        cb(coords)
      }
    }
  }

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  }
}

export default generateListener
