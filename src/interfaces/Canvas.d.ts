export type StrokeWidth = 10 | 20 | 30 | 40 | 50

export type StrokeColour = 
'#000000' |  // black
'#ffffff' |  // white
'#4285F6' |  // blue
'#EC4233' |  // red
'#F9BE04' |  // yellow
'#33A955' |  // green
'#AF52DE' |  // purple
'#FF9501'    // orange

export interface CursorCoords {
  x: number,
  y: number
}