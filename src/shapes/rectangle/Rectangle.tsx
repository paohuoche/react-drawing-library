import React from "react"
import { Group, Rect } from "react-konva"
import { Rectangle } from "./Rectangle.types"
import Konva from "konva"

const _Rectangle = (props: { value: Rectangle }) => {
  const value = props.value

  const [leftTop, rightBottom] = value.coords
  const color = props.value.color
  const width = rightBottom.x - leftTop.x
  const height = rightBottom.y - leftTop.y
  const { r, g, b } = Konva.Util.getRGB(color)

  return (
    <Group
      x={leftTop.x}
      y={leftTop.y}
      // ref={wholeGroupRef}
      // draggable={props.mode === 'draw' && props.listening}
      // listening={props.listening}
    >
      <Rect
        // ref={rectRef}
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
  )
}

export default _Rectangle
