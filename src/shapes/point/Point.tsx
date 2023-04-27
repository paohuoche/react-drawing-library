import React, { useState } from "react"
import { Circle, Group, KonvaNodeEvents } from "react-konva"
import { PointProps } from "./Point.types"
import { Portal } from "react-konva-utils"

const CircleRadius = 6
const CircleActiveRadius = 8
const CircleStrokeWidth = 1
const CircleActiveStrokeWidth = 2
const TextOffset_X = -10
const TextOffset_Y = -7

const Point = (props: PointProps) => {
  const value = props.value
  const [isDragging, setIsDragging] = useState(false)

  const onClick: KonvaNodeEvents["onClick"] = (e) => {
    if (e.evt.button === 2) {
      props.del?.(value.id)
    }
  }

  const onDragStart: KonvaNodeEvents["onDragStart"] = (e) => {
    setIsDragging(true)
  }

  const onDragEnd: KonvaNodeEvents["onDragEnd"] = (e) => {
    props.onDragEnd?.(e.target.getPosition())
    setIsDragging(false)
  }

  return (
    <Portal selector=".top-layer" enabled={isDragging}>
      <Group
        x={value.coords[0].x}
        y={value.coords[0].y}
        draggable={props.draggable}
        visible={props.visible}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Circle
          x={0}
          y={0}
          radius={CircleRadius}
          fill={value.color}
          stroke="white"
          strokeWidth={CircleStrokeWidth}
          strokeScaleEnabled={false}
          onClick={onClick}
        />
      </Group>
    </Portal>
  )
}

export default Point
