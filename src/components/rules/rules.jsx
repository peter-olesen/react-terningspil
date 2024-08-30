import styles from './rules.module.scss';

export const Rules = ({ onClose }) => {
    return (
        <div className={styles.rulesOverlay}>
            <div className={styles.rulesContent}>
                <h2>Lucky Libre</h2>
                <p>
                    Roll the dice and try to get a higher score than the AI. Each player gets six rolls. 
                    The player with the highest score at the end wins.
                </p>
                <button onClick={onClose}>Start Game</button>
            </div>
        </div>
    );
};
