import { writeFileSync } from 'fs'
import { roundedCorner, svg, makeElement } from '@svag/lib'

const drawPath = (from, to) => {
  const d = `M${from.x},${from.y} ${roundedCorner(from, to)}`
  const p = makeElement('path', {
    attributes: {
      d,
    },
  })
  return p
}
const corners = [
  drawPath({ x: 0, y: 50 }, { x: 50, y: 0 }),
  drawPath({ x: 50, y: 0 }, { x: 100, y: 50 }),
  drawPath({ x: 100, y: 50 }, { x: 50, y: 100 }),
  drawPath({ x: 50, y: 100 }, { x: 0, y: 50 }),
]

const g = makeElement('g', {
  attributes: {
    stroke: 'green',
    fill: 'red',
    'stroke-width': '2',
  },
  content: corners,
})

const image = svg({
  content: makeElement('g', {
    attributes: {
      transform: 'translate(2,2)',
    },
    content: g,
  }),
  width: 110,
  height: 110,
  stretch: false,
})

console.log(image)
writeFileSync('images/rounded-corners.svg', image)