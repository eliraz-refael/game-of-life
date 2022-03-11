import { Cell, CellEnum } from './Cell'

type GameBoardType = ReadonlyArray<ReadonlyArray<{ key: string, value: CellEnum.ALIVE | CellEnum.DEAD }>>

export function Board({ gameBoard }: { gameBoard: GameBoardType }) {
    return (
        <>
            {gameBoard.map((row, i) =>
                <div className="row" key={i}>
                    {row.map(cell => <Cell key={cell.key} state={cell.value} />)}
                </div>
            )}
        </>
    )
}
