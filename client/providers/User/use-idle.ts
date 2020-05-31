import { useState, useEffect, useRef } from 'react';

export function useIdle() {
    const [timeLeft, setTime] = useState(30);
    const [isIdle, setIsIdle] = useState(false);
    const interval = useRef(null);

    useEffect(() => {
        const resetIdle = () => {
            console.log('reset idle')
            document.removeEventListener('mousemove', resetIdle);
            setTime(30);
        }

        document.addEventListener('mousemove', resetIdle);
        if (!isIdle) {
            interval.current = window.setInterval(() => {
                setTime((t) => t - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
            console.log('user is idle === call logout()')
            window.clearInterval(interval.current);
            setIsIdle(true);
        }
        return () => {
            document.removeEventListener('mousemove', resetIdle);
            window.clearInterval(interval.current);}
    }, [isIdle, timeLeft]);

    return isIdle;
}
