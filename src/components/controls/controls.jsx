import styles from './controls.module.scss';
import FlatMaskIcon from '../../assets/images/flat-mask.svg';
import StripedMaskIcon from '../../assets/images/striped-mask.svg';
import { useEffect } from 'react';

export const Controls = ({ onRollDice, currentPlayer, rolling}) => {

    useEffect(() => {
        console.log(`It's ${currentPlayer}'s turn`);  
    }, [currentPlayer]);

    return(
        <div className={styles.controls}>
            <h2>{currentPlayer}'s Turn</h2>
            {currentPlayer === 'Player 1' && <img src={FlatMaskIcon} alt="Player 1 Mask"/>}
            {currentPlayer === 'AI' && <img src={StripedMaskIcon} alt="AI Mask"/>}
            <button onClick={onRollDice} disabled={rolling}>
                {rolling ? 'Rolling...' : 'Roll Dice'}
            </button>
        </div>
    )
}