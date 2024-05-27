import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { useState } from "react";

const Enum = {
    Available: 'Available',
    O_Selected: 'O_Selected',
    X_Selected: 'X_Selected'
}

function Tile_X() {
    return (
        <div
            className="w-16 h-16 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm">
            X
        </div>
    );

}

function Tile_O() {
    return (
        <div
            className="w-16 h-16 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm">
            O
        </div>
    );

}

function Tile_A() {
    return (
        <div
            className="w-16 h-16 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm">
            &nbsp;
        </div>
    );

}

const handleTileClick = (cell_no) => {
    if (cell_no === 1) {
        if (cell_1 === Enum.Available) {
            if (turn === 'O') {
                setCell_1(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_1(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 2) {
        if (cell_2 === Enum.Available) {
            if (turn === 'O') {
                setCell_2(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_2(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 3) {
        if (cell_3 === Enum.Available) {
            if (turn === 'O') {
                setCell_3(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_3(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 4) {
        if (cell_4 === Enum.Available) {
            if (turn === 'O') {
                setCell_4(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_4(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 5) {
        if (cell_5 === Enum.Available) {
            if (turn === 'O') {
                setCell_5(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_5(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 6) {
        if (cell_6 === Enum.Available) {
            if (turn === 'O') {
                setCell_6(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_6(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 7) {
        if (cell_7 === Enum.Available) {
            if (turn === 'O') {
                setCell_7(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_7(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 8) {
        if (cell_8 === Enum.Available) {
            if (turn === 'O') {
                setCell_8(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_8(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
    if (cell_no === 9) {
        if (cell_9 === Enum.Available) {
            if (turn === 'O') {
                setCell_9(Enum.O_Selected);
                setTurn('X');
            } else {
                setCell_9(Enum.X_Selected);
                setTurn('O');
            }
        }
    }
}

export function Playground() {

    const [turn, setTurn] = useState('O');

    const [cell_1, setCell_1] = useState(Enum.Available);
    const [cell_2, setCell_2] = useState(Enum.Available);
    const [cell_3, setCell_3] = useState(Enum.Available);
    const [cell_4, setCell_4] = useState(Enum.Available);
    const [cell_5, setCell_5] = useState(Enum.Available);
    const [cell_6, setCell_6] = useState(Enum.Available);
    const [cell_7, setCell_7] = useState(Enum.Available);
    const [cell_8, setCell_8] = useState(Enum.Available);
    const [cell_9, setCell_9] = useState(Enum.Available);

    const [O_Wins, setO_Wins] = useState(0);
    const [X_Wins, setX_Wins] = useState(0);


    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <div className="grid grid-cols-1 gap-4">
                <div className="text-center text-2xl font-bold">{turn === 'O' ? "Player O's Turn" : "Player X's Turn"}</div>
                <Card>
                    <div className="grid grid-cols-3 gap-4 p-10">
                        {cell_1 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(1)}
                            />
                            : cell_1 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(1)} /> :
                                <Tile_X onClick={() => handleTileClick(1)} />}
                        {cell_2 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(2)} /> : cell_2 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(2)} /> :
                                <Tile_X onClick={() => handleTileClick(2)} />}
                        {cell_3 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(3)} /> : cell_3 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(3)} /> :
                                <Tile_X onClick={() => handleTileClick(3)} />}
                        {cell_4 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(4)} /> : cell_4 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(4)} /> :
                                <Tile_X onClick={() => handleTileClick(4)} />}
                        {cell_5 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(5)} /> : cell_5 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(5)} /> :
                                <Tile_X onClick={() => handleTileClick(5)} />}
                        {cell_6 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(6)} /> : cell_6 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(6)} /> :
                                <Tile_X onClick={() => handleTileClick(6)} />}
                        {cell_7 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(7)} /> : cell_7 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(7)} /> :
                                <Tile_X onClick={() => handleTileClick(7)} />}
                        {cell_8 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(8)} /> : cell_8 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(8)} /> :
                                <Tile_X onClick={() => handleTileClick(8)} />}
                        {cell_9 === Enum.Available ?
                            <Tile_A onClick={() => handleTileClick(9)} /> : cell_9 === Enum.O_Selected ?
                                <Tile_O onClick={() => handleTileClick(9)} /> :
                                <Tile_X onClick={() => handleTileClick(9)} />}
                    </div>
                </Card>
            </div>
            <div className="flex items-center justify-center gap-8 text-lg font-medium">
                <div>
                    Player 1 (O) wins:
                    <span className="font-bold"> {O_Wins}</span>
                </div>
                <div>
                    Player 2 (X) wins:
                    <span className="font-bold"> {X_Wins}</span>
                </div>
            </div>
        </div>
    );
}
