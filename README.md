# react-drawing-library
This library is developed based on Konva and makes it easy to the management of shapes.

## Table of Contents
- [Installation](#installation)
- [Props](#props)
- [Example](#example)

## Installation
npm i @paohuoche/react-drawing-library

## Props
| name | type | default | description |
| --- | --- | --- | --- |
| imageUrl | String | | the url of image |
| width | Number | Required | width of stage |
| height | Number | Required | height of stage |
| shapes | ReturnType\<typeof useShapes\> | Required | all stores and actions relative to drawing |
| draw | \{ type: Rectangle \| Point, color: string, text\?: string\} | | if set to null or undefined, the stage will be view mode |
| beforeCreate | () => Promise<boolean> | | if provided, the function will be executed before onCreate and when return false, onCreate will not be executed | onCreate | (value: RectangleValue \| PointValue) => void | | Executed when new shape created |
| onUpdate | (value: RectangleValue \| PointValue) => void | | Executed when shape changed |
| onDelete | (value: RectangleValue \| PointValue) => void | | Executed when shape is deleted |
  
## Example
```js
import { useEffect, useState } from "react"
import Drawing, { DrawingProps, useDrawing } from "@paohuoche/react-drawing-library"

const shapeDraw: DrawingProps["draw"] = {
  type: "Rectangle",
  color: "red",
}

function Demo() {
  const imageUrl =
    "https://tse1-mm.cn.bing.net/th/id/OIP-C.rQ9MEBHEGcjQ8Yc2YB23YQHaEj?w=315&h=193&c=7&r=0&o=5&dpr=2&pid=1.7"

  const shapes = useDrawing()
  const [draw, setDraw] = useState<DrawingProps["draw"]>(shapeDraw)
  return (
    <div>
      <button onClick={() => setDraw(shapeDraw)}>Rectangle</button>
      <button
        onClick={() =>
          setDraw({
            type: "Point",
            color: "red",
          })
        }
      >
        Point
      </button>
      <div>
        <button onClick={() => setDraw(null)}>undraw</button>
        <button onClick={() => shapes.unfocus()}>unfocus</button>
      </div>
      <Drawing
        draw={draw}
        shapes={shapes}
        imageUrl={imageUrl}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  )
}
```

