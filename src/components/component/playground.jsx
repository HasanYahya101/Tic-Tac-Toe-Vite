import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";

const Enum = {
    Available: 'Available',
    O_Selected: 'O_Selected',
    X_Selected: 'X_Selected'
}

function Tile({ state, onClick }) {
    return (
        <div
            className="w-16 h-16 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm"
            onClick={onClick}
        >
            {state === Enum.O_Selected ? 'O' : state === Enum.X_Selected ? 'X' : ''}
        </div>
    );
}

export function Playground() {

    const { toast } = useToast()

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

    const resetBoard = () => {
        setCell_1(Enum.Available);
        setCell_2(Enum.Available);
        setCell_3(Enum.Available);
        setCell_4(Enum.Available);
        setCell_5(Enum.Available);
        setCell_6(Enum.Available);
        setCell_7(Enum.Available);
        setCell_8(Enum.Available);
        setCell_9(Enum.Available);
    }

    const checkWinner = () => {
        const winStates = [
            [cell_1, cell_2, cell_3],
            [cell_4, cell_5, cell_6],
            [cell_7, cell_8, cell_9],
            [cell_1, cell_4, cell_7],
            [cell_2, cell_5, cell_8],
            [cell_3, cell_6, cell_9],
            [cell_1, cell_5, cell_9],
            [cell_3, cell_5, cell_7],
        ];

        winStates.forEach((state) => {
            if (state[0] === Enum.O_Selected && state[1] === Enum.O_Selected && state[2] === Enum.O_Selected) {
                setO_Wins(O_Wins + 1);
                resetBoard();
                toast({
                    title: "Player O Wins",
                    description: "Congratulations! Player O wins this round",
                    variant: "success"
                })
            }
            else if (state[0] === Enum.X_Selected && state[1] === Enum.X_Selected && state[2] === Enum.X_Selected) {
                setX_Wins(X_Wins + 1);
                resetBoard();
                toast({
                    title: "Player X Wins",
                    description: "Congratulations! Player X wins this round",
                    variant: "success"
                })
            }
        });

        if (cell_1 !== Enum.Available && cell_2 !== Enum.Available && cell_3 !== Enum.Available && cell_4 !== Enum.Available && cell_5 !== Enum.Available && cell_6 !== Enum.Available && cell_7 !== Enum.Available && cell_8 !== Enum.Available && cell_9 !== Enum.Available) {
            resetBoard();
            toast({
                title: "Draw",
                description: "The game is a draw",
                variant: "info"
            })
        }
    }

    useEffect(() => {
        checkWinner();
    }, [cell_1, cell_2, cell_3, cell_4, cell_5, cell_6, cell_7, cell_8, cell_9]);

    const handleTileClick = (cell_no) => {
        const cellStateMap = {
            1: [cell_1, setCell_1],
            2: [cell_2, setCell_2],
            3: [cell_3, setCell_3],
            4: [cell_4, setCell_4],
            5: [cell_5, setCell_5],
            6: [cell_6, setCell_6],
            7: [cell_7, setCell_7],
            8: [cell_8, setCell_8],
            9: [cell_9, setCell_9],
        };

        const [cellState, setCellState] = cellStateMap[cell_no];

        if (cellState === Enum.Available) {
            setCellState(turn === 'O' ? Enum.O_Selected : Enum.X_Selected);
            setTurn(turn === 'O' ? 'X' : 'O');
        }
        else {
            toast({
                title: "Invalid Move",
                description: "This cell is already selected",
                variant: "destructive"
            })
        }

        checkWinner();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <Toaster />
            <div className="grid grid-cols-1 gap-4">
                <div className="text-center text-2xl font-bold">{turn === 'O' ? "Player O's Turn" : "Player X's Turn"}</div>
                <Card>
                    <div className="grid grid-cols-3 gap-4 p-10">
                        <Tile state={cell_1} onClick={() => handleTileClick(1)} />
                        <Tile state={cell_2} onClick={() => handleTileClick(2)} />
                        <Tile state={cell_3} onClick={() => handleTileClick(3)} />
                        <Tile state={cell_4} onClick={() => handleTileClick(4)} />
                        <Tile state={cell_5} onClick={() => handleTileClick(5)} />
                        <Tile state={cell_6} onClick={() => handleTileClick(6)} />
                        <Tile state={cell_7} onClick={() => handleTileClick(7)} />
                        <Tile state={cell_8} onClick={() => handleTileClick(8)} />
                        <Tile state={cell_9} onClick={() => handleTileClick(9)} />
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
