import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Layers3 } from "lucide-react";

const isDesktop = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|tablet|touch|samsung|fridge/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 1024;
    return !isMobile && !isSmallScreen;
};

const desktop = isDesktop();

const Enum = {
    Available: 'Available',
    O_Selected: 'O_Selected',
    X_Selected: 'X_Selected'
};

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

function TooltipInfo() {
    return (
        <TooltipProvider>
            <Tooltip className="flex items-center justify-center gap-2">
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className={`${desktop ? '-translate-y-0' : '-translate-y-1.5'}`}>
                        <FileQuestionIcon className="h-6 w-6" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <Card className="max-w-96 border-none shadow-none overflow-hidden">
                        <CardHeader className="text-lg font-medium">
                            How to Play?
                        </CardHeader>
                        <CardContent className="text-sm text-gray-500 dark:text-gray-400">
                            This is a classic Tic Tac Toe game. You play as O against the AI (X). Take turns placing your marks on a 3x3 grid. The first to get 3 marks in a row (horizontally, vertically, or diagonally) wins the game.
                        </CardContent>
                    </Card>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default function Component() {
    const { toast } = useToast();
    const [board, setBoard] = useState(Array(9).fill(Enum.Available));
    const [turn, setTurn] = useState('O');
    const [playerWins, setPlayerWins] = useState(0);
    const [aiWins, setAiWins] = useState(0);

    const navigate = useNavigate();

    const goToUserPage = () => {
        resetMiniMax();
        navigate('/');
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(Enum.Available));
        setTurn('O');
    };

    const resetMiniMax = () => {
        setPlayerWins(0);
        setAiWins(0);
        resetBoard();
    };

    const checkWinner = (board) => {
        const winStates = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let i = 0; i < winStates.length; i++) {
            const [a, b, c] = winStates[i];
            if (board[a] !== Enum.Available && board[a] === board[b] && board[a] === board[c]) {
                return board[a] === Enum.O_Selected ? 'O' : 'X';
            }
        }

        if (board.every(cell => cell !== Enum.Available)) {
            return 'Draw';
        }

        return null;
    };

    const minimax = (board, depth, isMaximizing) => {
        const winner = checkWinner(board);
        if (winner === 'X') return 10 - depth;
        if (winner === 'O') return depth - 10;
        if (winner === 'Draw') return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === Enum.Available) {
                    board[i] = Enum.X_Selected;
                    let score = minimax(board, depth + 1, false);
                    board[i] = Enum.Available;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === Enum.Available) {
                    board[i] = Enum.O_Selected;
                    let score = minimax(board, depth + 1, true);
                    board[i] = Enum.Available;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const aiMove = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (board[i] === Enum.Available) {
                board[i] = Enum.X_Selected;
                let score = minimax(board, 0, false);
                board[i] = Enum.Available;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        const newBoard = [...board];
        newBoard[move] = Enum.X_Selected;
        setBoard(newBoard);
        setTurn('O');
    };

    useEffect(() => {
        const winner = checkWinner(board);
        if (winner) {
            if (winner === 'O') {
                setPlayerWins(playerWins + 1);
                toast({
                    title: "You Win!",
                    description: "Congratulations! You've won this round",
                    variant: "success"
                });
            } else if (winner === 'X') {
                setAiWins(aiWins + 1);
                toast({
                    title: "AI Wins",
                    description: "The AI has won this round",
                    variant: "error"
                });
            } else {
                toast({
                    title: "Draw",
                    description: "The game is a draw",
                    variant: "info"
                });
            }
            setTimeout(resetBoard, 1500);
        } else if (turn === 'X') {
            setTimeout(aiMove, 500);
        }
    }, [board, turn]);

    const handleTileClick = (index) => {
        if (board[index] === Enum.Available && turn === 'O') {
            const newBoard = [...board];
            newBoard[index] = Enum.O_Selected;
            setBoard(newBoard);
            setTurn('X');
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex flex-col items-center justify-center h-screen gap-8">
                <div className="fixed top-6 right-6 z-50">
                    <TooltipProvider>
                        <Tooltip
                        >
                            <TooltipTrigger>
                                <Button size="icon" variant="outline" onClick={goToUserPage}
                                >
                                    <Layers3 strokeWidth={1.5} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="px-2 py-1 rounded-lg mr-2">
                                <span className="text-sm text-muted-foreground">Play 1 vs 1</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div >
                <div className="flex content-center">
                    <div className="text-center text-2xl font-bold">
                        {turn === 'O' ? "Your Turn" : "AI's Turn"}
                    </div>
                    <TooltipInfo />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Card>
                        <div className="grid grid-cols-3 gap-4 p-10">
                            {board.map((cell, index) => (
                                <Tile key={index} state={cell} onClick={() => handleTileClick(index)} />
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="flex items-center justify-center gap-8 text-lg font-medium">
                    <div>
                        Your wins (O):
                        <span className="font-bold"> {playerWins}</span>
                    </div>
                    <div>
                        AI wins (X):
                        <span className="font-bold"> {aiWins}</span>
                    </div>
                </div>
            </div >
        </>
    );
}

function FileQuestionIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 17h.01" />
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
            <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
        </svg>
    );
}