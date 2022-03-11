import { v4 as uuidv4 } from 'uuid'
import { CellEnum } from './Cell'

type Board = ReadonlyArray<ReadonlyArray<{ key: string, value: CellEnum.DEAD | CellEnum.ALIVE }>>

const GRID_SIZE = 50
const CHANCE_OF_ALIVE = 25

export function generateInitialBoard(doaFunc: () => CellEnum.DEAD | CellEnum.ALIVE) {
    return [...Array(GRID_SIZE).keys()].map(_ => [...Array(GRID_SIZE).keys()].map(_ => ({ key: uuidv4(), value: doaFunc() })))
}

export function deadOrAlive() {
    return Math.floor(Math.random() * 100) > CHANCE_OF_ALIVE ? CellEnum.DEAD : CellEnum.ALIVE
}

export function getNeighbors(board: Board, { x, y } :{ x: number, y: number }) {
    return [
        getCellByCoordinates(board, { x: x + 1, y }),
        getCellByCoordinates(board, { x: x + 1, y: y + 1 }),
        getCellByCoordinates(board, { x: x + 1, y: y - 1 }),

        getCellByCoordinates(board, { x: x - 1, y }),
        getCellByCoordinates(board, { x: x - 1, y: y + 1 }),
        getCellByCoordinates(board, { x: x - 1, y: y - 1 }),

        getCellByCoordinates(board, { x, y: y + 1 }),
        getCellByCoordinates(board, { x, y: y - 1 }),
    ].filter(item => item !== null)
}

function getCellByCoordinates(board: Board, { x, y }: { x: number, y: number }) {
    if (x > GRID_SIZE - 1 || x < 0) return null
    if (y > GRID_SIZE - 1 || y < 0) return null
    return board[x][y]
}

function cellNextGeneration(board: Board, value: CellEnum.ALIVE | CellEnum.DEAD, { x, y }: { x: number, y: number }) {
    const aliveCount = getNeighbors(board, { x, y }).reduce((alive, cell) => cell.value === CellEnum.ALIVE ? alive + 1 : alive, 0)

    if (value === CellEnum.DEAD && aliveCount === 3) return CellEnum.ALIVE
    if (value === CellEnum.ALIVE && (aliveCount < 2)) return CellEnum.DEAD
    if (value === CellEnum.ALIVE && (aliveCount > 3)) return CellEnum.DEAD
    if (value === CellEnum.ALIVE && (aliveCount === 3 || aliveCount === 2)) return CellEnum.ALIVE
    return CellEnum.DEAD
}

export function tick(board: Board) {
    return board.map((row, x) => row.map(({ key, value }, y) => ({key, value: cellNextGeneration(board, value, { x, y })})))
}
