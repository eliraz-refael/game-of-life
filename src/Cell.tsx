export enum CellEnum {
    DEAD,
    ALIVE
}

export function Cell({ state }: { state: CellEnum }) {
    const background = state === CellEnum.DEAD ? 'white' : 'black'
    const style = {
        background,
        height: 20,
        width: 20,
        border: '1px #eee solid'
    }
    return (
        <div style={style}></div>
    )
}
