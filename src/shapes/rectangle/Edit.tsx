import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Basic } from "../../types"
import { RectangleProps } from "../../shapes/rectangle/Rectangle.types"
import { Circle, KonvaNodeEvents, Layer } from "react-konva"
import Rectangle from "../../shapes/rectangle"
import { toReal, toStage } from "../../utils/transformCoord"
import { StageContext } from "../../stage/stage"
import { DrawingColor } from "../../stage"
import { Portal } from "react-konva-utils"
import { Circle as CircleType } from "konva/lib/shapes/Circle"

const Edit = (props: RectangleProps) => {
  const context = useContext(StageContext)

  const [shape, setShape] = useState({
    ...props.value,
    color: DrawingColor,
    coords: props.value.coords,
  })

  /**
   * update shape data in store
   */
  const update = (coords: Basic.Coord[]) => {
    context.shapes.update({
      ...props.value,
      coords: context.toReal(coords),
    })
  }

  const del = (id: string) => {
    context.shapes.del(id)
  }

  /**
   * update shape data in local state
   */
  const localUpdate = (coords: Basic.Coord[]) => {
    setShape((shape) => {
      return {
        ...shape,
        coords,
      }
    })
  }

  let shapeElement = null

  shapeElement = (
    <Rectangle
      value={shape}
      visible
      draggable
      del={del}
      onDragMove={(coord, size) => {
        localUpdate([
          coord,
          { x: coord.x + size.width, y: coord.y + size.height },
        ])
      }}
      onDragEnd={(coord) => {
        update(shape.coords)
      }}
    />
  )

  /**
   * point operator
   */
  let coords = useMemo(() => {
    return [
      shape.coords[0],
      {
        x: shape.coords[1].x,
        y: shape.coords[0].y,
      },
      shape.coords[1],
      {
        x: shape.coords[0].x,
        y: shape.coords[1].y,
      },
    ]
  }, [shape.coords])

  return (
    <Portal selector=".top-layer" enabled>
      {shapeElement}
      {coords.map((coord, index) => {
        return (
          <DragCircle
            key={index}
            coord={coord}
            coords={shape.coords}
            index={index}
            update={update}
            localUpdate={localUpdate}
          />
        )
      })}
    </Portal>
  )
}

/**
 * @param props index determinate location of circle
 * @param props coord position of darg circle
 * @param props coords coords of rectangle, [leftTop, rightBottom]
 * @returns
 */
const DragCircle = (props: {
  coord: Basic.Coord
  coords: Basic.Coord[]
  index: number
  localUpdate: (coords: Basic.Coord[]) => void
  update: (coord: Basic.Coord[]) => void
}) => {
  const _coordRef = useRef(props.coord)
  const circleRef = useRef<CircleType>(null!)
  const [isDragging, setIsDragging] = useState(false)

  /**
   * the position of cidrle, disable update from props.coord when it is dragging
   */
  const coord = isDragging ? _coordRef.current : props.coord
  if (!isDragging) {
    _coordRef.current = props.coord
  }

  const onPointerDown: KonvaNodeEvents["onPointerDown"] = (e) => {
    if (e.evt.button !== 0) return
    setIsDragging(true)
  }

  const calcCoords = (coord: Basic.Coord, pointerPos: Basic.Coord) => {
    let coords = props.coords
    if (props.index === 0) {
      coords[0] = pointerPos
    } else if (props.index === 1) {
      coords[0].y = pointerPos.y
      coords[1].x = pointerPos.x
    } else if (props.index === 2) {
      coords[1] = pointerPos
    } else if (props.index === 3) {
      coords[0].x = pointerPos.x
      coords[1].y = pointerPos.y
    }
    return coords
  }
  const onDragMove = () => {
    if (!isDragging) return
    let pos = circleRef.current.getPosition()
    let coords = calcCoords(props.coord, pos)
    props.localUpdate([...coords])
  }

  const onDragEnd = () => {
    if (!isDragging) return
    let pos = circleRef.current.getPosition()
    let coords = calcCoords(props.coord, pos)
    props.update([...coords])
    setIsDragging(false)
  }

  return (
    <Circle
      ref={circleRef}
      onPointerDown={onPointerDown}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      key={`${coord.x}-${coord.y}`}
      x={coord.x}
      y={coord.y}
      radius={4}
      fill="#52acff"
      stroke="white"
      strokeWidth={1}
      strokeScaleEnabled={false}
      scaleX={1}
      scaleY={1}
      draggable={true}
    />
  )
}

export default Edit
