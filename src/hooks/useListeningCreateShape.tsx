import { Stage as StageType } from "konva/lib/Stage"
import React, { useEffect, useRef } from "react"
import { Base } from "../types"
import { handleCreateRectangle } from "../shapes/rectangle"
import { KonvaNodeEvents } from "react-konva"

export type EventsListener = {
  onMouseDown?: (coord: Base.Coord) => KonvaNodeEvents["onMouseDown"]
  onMouseMove?: (coord: Base.Coord) => KonvaNodeEvents["onMouseMove"]
  onMouseUp?: (
    coord: Base.Coord,
    cb?: (params: Base.Coord[]) => void
  ) => KonvaNodeEvents["onMouseUp"]
}

const useListeningCreateShape = (params: {
  stage: StageType
  draw: Base.Draw | null
}): EventsListener => {
  let events: EventsListener = {}

  if (!params.draw) return events

  switch (params.draw.type) {
    case "Rectangle": {
      const _events = handleCreateRectangle(params.stage, params.draw)
      // events.onMouseDown = _events.onMouseDown
      events = _events
      break
    }

    case "Point": {
      break
    }

    default:
      break
  }

  return events
}

export default useListeningCreateShape
