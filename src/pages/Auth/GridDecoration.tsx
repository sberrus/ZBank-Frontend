// import
import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'
// style
import style from './layout.module.scss'

const GridDecoration = () => {
  // hooks
  const [animationCount, setAnimationCount] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [columnCount, setColumnCount] = useState(0)
  const [tiles, setTiles] = useState<null[] | null>(null)

  // ref
  const gridContainer = useRef<HTMLDivElement>(null)

  // methods
  const createTiles = () => {
    let tilesCount = 0
    let temp = []
    const rows = Math.floor(gridContainer.current?.clientHeight! / 100)
    const columns = Math.floor(gridContainer.current?.clientWidth! / 100)

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

  const colors = ['#E53935', '#FDD835', '#F4511E', '#4CAF50', '#2196F3', '#9C27B0']

  const handleClick = (idx: number) => {
    setAnimationCount((prev) => prev + 1)
    anime({
      targets: '.tile',
      backgroundColor: colors[animationCount % (colors.length - 1)],
      delay: anime.stagger(150, {
        grid: [columnCount, rowCount],
        from: idx
      })
    })
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
