export enum ESupportShape {
  Rectangle,
  // Quadrilateral, // 四边形
  // Polygon, // 多边形
  // OrderPoint, // 有序点
  Point, // 点
  // Line, // 线
  // Arrow, // 箭头线
}

export namespace Basic {
  export type Coord = {
    x: number
    y: number
  }

  /**
   * base of a shape
   */
  export interface Shape {
    type: keyof typeof ESupportShape
    coords: Coord[]
    color: string
    id: string
    visible: boolean
    text?: string
    meta?: { [key: string]: any }
    focus?: (id: string) => void
  }

  /**
   * definition of what gonna drawing
   */
  export type Draw = {
    type: keyof typeof ESupportShape
    color: string
    text?: string
  }

  export type Boundary = {
    width: number
    height: number
    x: number
    y: number
    scale: number
  }
}
