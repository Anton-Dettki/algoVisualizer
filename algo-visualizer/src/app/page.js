'use client'

import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { use, useEffect, useState } from 'react'

function Matrix() {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(25);
    const [adjList, setList] = useState([])
    const [grid, setGrid] = useState([])

    const changeRows = (event, newValue) => { setRows(newValue) }
    const changeCols = (event, newValue) => { setCols(newValue) }

    useEffect(() => {
        computeGrid()
    }, [])

    function computeGrid() {
        const matr = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
        computeAdjacencyList()
        setGrid(matr)
        console.log("GRID ", grid)
    }

    function computeAdjacencyList (rows, cols) {
        const adjList = new Map();

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const nodeId = r * cols + c;
                const neighbors = [];

                if (r > 0) neighbors.push((r - 1) * cols + c); // up
                if (r < rows - 1) neighbors.push((r + 1) * cols + c); // down
                if (c > 0) neighbors.push(r * cols + (c - 1)); // left
                if (c < cols - 1) neighbors.push(r * cols + (c + 1)); // right

                adjList.set(nodeId, neighbors)
            }
        }

        console.log("ADJ", adjList)
        setList(adjList)
    }

    return (
        <>
            <div className="flex-box">
                <Slider value={rows} onChange={changeRows}></Slider>
                Rows: { rows }
                <Slider value={cols} onChange={changeCols}></Slider>
                Cols: size { cols }
                <Button onClick={computeGrid}> Compute</Button>
            </div>

            <div className="inline-block">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((value, colIndex) => (
                            <Button key={colIndex}> {value} </Button>
                        ))}
                    </div>
                ))}
            </div>

        </>
    )
}

export default function Home() {
return (
    <>
      <Matrix />
    </>
)
}


