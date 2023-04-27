import React, { useMemo } from "react"
import useImage from "use-image"

/**
 * get the actual information of displaying the operating image
 * @param params {
 *  url: image url of current opreating
 *  width: width of stage
 *  height: height of stage
 * }
 * @returns the actual information for display the image: 
    width
    height
    x: to the left of stage
    y: to the top of stage
    scale: Scaling ratio of the image
 */
const useProcessingImage = (params: {
  url: string
  width: number
  height: number
}) => {
  const [image] = useImage(params.url)
  const { width, height } = params

  const info = useMemo(() => {
    let boundary = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: 1,
    }
    let element

    if (!image) return { boundary, element }
    element = image
    const stageRatio = width / height
    const imageAspectRatio = image.width / image.height // 宽高比

    if (imageAspectRatio > stageRatio) {
      boundary.width = width * 0.95
      boundary.height = boundary.width / imageAspectRatio
    } else {
      boundary.height = height * 0.95
      boundary.width = boundary.height * imageAspectRatio
    }

    boundary.x = (width - boundary.width) / 2
    boundary.y = (height - boundary.height) / 2
    boundary.scale = boundary.width / image.width

    return { boundary, element }
  }, [params.url, image])

  return info
}

export default useProcessingImage
