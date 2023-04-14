// import
import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'
// style
import style from './layout.module.scss'

const GridDecoration = () => {
  // hooks
  const [colorFlag, setColorFlag] = useState(true)
  const [rowCount, setRowCount] = useState(0)
  const [columnCount, setColumnCount] = useState(0)
  const [tiles, setTiles] = useState<null[] | null>(null)

  // ref
  const gridContainer = useRef<HTMLDivElement>(null)

  // methods
  const createTiles = () => {
    let tilesCount = 0
    let temp = []
    const rows = Math.floor(gridContainer.current?.clientHeight! / 75)
    const columns = Math.floor(gridContainer.current?.clientWidth! / 75)

    if (rows && columns) {
      tilesCount = Math.floor(rows * columns)
    }

    if (tilesCount > 0) {
      for (let i = 0; i < tilesCount; i++) {
        temp.push(null)
      }
    }

    setRowCount(rows || 0)
    setColumnCount(columns || 0)
    setTiles(temp)
  }

  const handleClick = (idx: number) => {
    anime({
      targets: '.tile',
      backgroundColor: colorFlag ? '#81e6b6' : '#def787',
      delay: anime.stagger(50, {
        grid: [columnCount, rowCount],
        from: idx
      })
    })

    setColorFlag(!colorFlag)
  }

  // effect
  useEffect(() => {
    createTiles()

    // window event
    window.addEventListener('resize', createTiles)
    return () => {
      window.removeEventListener('resize', () => console.log('evento eliminado'))
    }
  }, [])

  return (
    <div
      style={{ '--rows': rowCount, '--columns': columnCount } as React.CSSProperties}
      ref={gridContainer}
      className={style.decorationContainer}
    >
      {tiles?.map((v, idx) => (
        <div
          key={idx}
          className={`${style.tile} tile`}
          onClick={() => {
            handleClick(idx)
          }}
        >
          {' '}
        </div>
      ))}
    </div>
  )
}

export default GridDecoration
