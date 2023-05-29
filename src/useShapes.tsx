import React, { useState } from "react"
import { RectangleValue } from "./shapes/rectangle/Rectangle.types"
import { PointValue } from "./shapes/point/Point.types"

const useShapes = () => {
  const [shapes, setShapes] = useState<{
    [id: string]: RectangleValue | PointValue
  }>({})

  /**
   * the id of selected shape
   */
  const [_focusId, _setFocusId] = useState("")

  const get = (id: string) => {
    return shapes[id]
  }

  const add = (shape: RectangleValue | PointValue) => {
    setShapes((all) => ({
      ...all,
      [shape.id]: shape,
    }))
  }

  const del = (id: string | string[]) => {
    setShapes((shapes) => {
      if (Array.isArray(id)) {
        id.forEach((_id) => {
          delete shapes[_id]
        })
      } else {
        delete shapes[id]
      }
      return { ...shapes }
    })
  }

  const update = (
    shape: (Partial<RectangleValue> | Partial<PointValue>) & { id: string }
  ) => {
    setShapes((shapes) => ({
      ...shapes,
      [shape.id]: {
        ...shapes[shape.id],
        ...shape,
      },
    }))
  }

  const hide = (id: string | string[]) => {
    if (Array.isArray(id)) {
      id.forEach((_id) => {
        update({
          id: _id,
          visible: false,
        })
      })
    } else {
      update({
        id,
        visible: false,
      })
    }
  }

  const hideAll = () => {
    Object.keys(shapes).map((id) => {
      hide(id)
    })
  }

  const show = (id: string | string[]) => {
    if (Array.isArray(id)) {
      id.forEach((_id) => {
        update({
          id: _id,
          visible: true,
        })
      })
    } else {
      update({ id, visible: true })
    }
  }

  const showAll = () => {
    Object.keys(shapes).map((id) => {
      show(id)
    })
  }

  const focus = (id: string) => {
    _setFocusId(id)
  }

  const unfocus = () => {
    _setFocusId("")
  }

  const getFocusId = () => {
    return _focusId
  }

  return {
    shapes,
    get,
    add,
    del,
    hide,
    hideAll,
    show,
    showAll,
    update,
    getFocusId,
    focus,
    unfocus,
  }
}

export default useShapes
