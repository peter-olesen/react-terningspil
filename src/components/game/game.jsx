import { useEffect, useState } from "react"
import { Player } from "../player/player";
import { Controls } from "../controls/controls";
import { Popup } from "../popup/popup";
import styles from './game.module.scss';

export const Game = () => {
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [playerDice, setPlayerDice] = useState([null, null]);
    const [aiDice, setAiDice] = useState([null, null]);
    const [playerRolls, setPlayerRolls] = useState(0);
    const [aiRolls, setAiRolls] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState("Player");
    const [rolling, setRolling] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [gameResult, setGameResult] = useState('');
    const maxRolls = 6;

    const gameOver = playerRolls === maxRolls && aiRolls === maxRolls;

    const rollDice = () => {
        if (gameOver) return;

        setRolling(true);
        const rollValue1 = Math.floor(Math.random() * 6) + 1;
        const rollValue2 = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            if (currentPlayer === 'Player') {
                if (playerRolls < maxRolls) {
                    setPlayerDice([rollValue1, rollValue2]);
                    setPlayerScore(prev => prev + rollValue1 + rollValue2);
                    setPlayerRolls(prev => prev + 1);
                    setCurrentPlayer('AI');
                    rollAiDice();
                }
            }
        }, 1000);
    };

    const rollAiDice = () => {
        const rollValue1 = Math.floor(Math.random() * 6) + 1;
        const rollValue2 = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            if (aiRolls < maxRolls) {
                setAiDice([rollValue1, rollValue2]);
                setAiScore(prev => prev + rollValue1 + rollValue2);
                setAiRolls(prev => prev + 1);
                setCurrentPlayer('Player');
            }

            if (playerRolls === maxRolls && aiRolls === maxRolls) {
                setGameOver(true);
                determineWinner();
            }

            setRolling(false);
        }, 1000);   
    };

    const determineWinner = () => {
        let result;
        if (playerScore > aiScore) {
            result = 'Player Wins!';
        } else if (aiScore > playerScore) {
            result = 'AI Wins!';
        } else {
            result = "It's a Tie!";
        }
    
        setGameResult(result);
        setPopupVisible(true); 
    };

    const restartGame = () => {
        setPlayerScore(0);
        setAiScore(0);
        setPlayerDice([null, null]);
        setAiDice([null, null]);
        setPlayerRolls(0);
        setAiRolls(0);
        setCurrentPlayer('Player');
        setRolling(false);
        setPopupVisible(false);
    };

    // useEffect(() => {
    //     console.log('Game Over:', gameOver);
    //     console.log('Popup Visible:', popupVisible);
    
    //     if (gameOver) {
    //         setPopupVisible(true);
    //     }
    // }, [gameOver, popupVisible]);
    useEffect(() => {
        if (gameOver) {
            determineWinner();
        }
    }, [gameOver]);

    return (
        <div className={styles.game}>
            <Player
                name="Player"
                diceValue={playerDice}
                score={playerScore}
                rolling={rolling && currentPlayer === 'Player'}
                rollsLeft={maxRolls - playerRolls}
            />
            <Player 
                name="AI"
                diceValue={aiDice}
                score={aiScore}
                rolling={rolling && currentPlayer === 'AI'}
                rollsLeft={maxRolls - aiRolls}
            />

            <div className={styles.controlsContainer}>
                {!gameOver && (
                <Controls onRollDice={rollDice} currentPlayer={currentPlayer} rolling={rolling}/>
                )}
            </div>
            {popupVisible && (
                <Popup winner={gameResult} onRestart={restartGame} />
            )}
        </div>
    );
};