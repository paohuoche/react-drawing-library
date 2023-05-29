import React, { useRef, useState } from "react"
import { Portal } from "react-konva-utils"
import { Group, Rect, KonvaNodeEvents } from "react-konva"
import { RectangleProps } from "./Rectangle.types"
import Konva from "konva"
import { Basic } from "../../types"
import { Rect as RectType } from "konva/lib/shapes/Rect"

const Rectangle = (props: RectangleProps) => {
  const rectRef = useRef<RectType>(null!)
  const [isDragging, setIsDragging] = useState(false)
  const value = props.value

  const [leftTop, rightBottom] = value.coords
  const color = props.value.color
  const width = rightBottom.x - leftTop.x
  const height = rightBottom.y - leftTop.y
  const { r, g, b } = Konva.Util.getRGB(color)

  const onClick: KonvaNodeEvents["onClick"] = (e) => {
    if (e.evt.button === 0) {
      props.focus?.(value.id)
    } else if (e.evt.button === 2) {
      props.del?.(value.id)
    }
  }

  const onDragStart: KonvaNodeEvents["onDragStart"] = (e) => {
    setIsDragging(true)
  }

  const onDragMove: KonvaNodeEvents["onDragMove"] = (e) => {
    props.onDragMove?.(e.target.getPosition(), rectRef.current.getSize())
  }

  const onDragEnd: KonvaNodeEvents["onDragEnd"] = (e) => {
    props.onDragEnd?.(e.target.getPosition(), rectRef.current.getSize())
    setIsDragging(false)
  }

  return (
    <Portal selector=".top-layer" enabled={isDragging}>
      <Group
        visible={props.visible}
        x={leftTop.x}
        y={leftTop.y}
        onClick={onClick}
        draggable={props.draggable}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        // ref={wholeGroupRef}
        // draggable={props.mode === 'draw' && props.listening}
        // listening={props.listening}
      >
        <Rect
          ref={rectRef}
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`rgba(${r}, ${g}, ${b}, .3)`}
          stroke={color}
          strokeWidth={2}
          strokeScaleEnabled={false}
        />
        {props.value.text ? (
          <Group
            x={-10}
            y={0}
            // ref={textGroupRef}
          >
            <Rect
              x={-props.value.text.length * 12 - 12}
              y={0}
              width={props.value.text.length * 12 + 12}
              height={26}
              fill={"black"}
              opacity={0.4}
            />
            {/* <Line
            points={[0, 8, 0, 18, 8, 13]}
            closed
            fill="black"
            opacity={0.4}
          />
          <Text
            x={-props.value.text.length * 12 - 6}
            y={7}
            text={props.value.text}
            fontSize={12}
            fontFamily="Calibri"
            fill="white"
          /> */}
          </Group>
        ) : null}
      </Group>
    </Portal>
  )
}
export default Rectangle
