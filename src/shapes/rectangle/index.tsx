import React from "react"
import Rectangle from "./Rectangle"
import Edit from "./Edit"
import { RectangleProps } from "./Rectangle.types"
export { default as EditRectangle } from "./Edit"
export { handleCreate as handleCreateRectangle } from "./handleCreate"

export default (props: RectangleProps) => {
  if (props.selected) {
    return <Edit {...props} />
  }

  return <Rectangle {...props} />
}
