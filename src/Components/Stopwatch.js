import React, { useEffect, useState } from "react";
import { timer } from "rxjs";
import Time from "./Time/Time";


const Stopwatch = () => {
    const intervalRX = timer(1000);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [stop, setStop] = useState(false);
    const doubleClickTimer = 0;

    useEffect(() => {
        let interval = null;
        let sec = second;
        let min = minute;
        let hh = hour;
        interval = intervalRX.subscribe(() => {
            if (stop) {
                sec++;
                setSecond(sec);
                if (second >= 59) {
                    setSecond(0);
                    min++;
                    setMinute(min);
                    if (minute >= 59) {
                        setMinute(0);
                        hh++;
                        setHour(hh);
                    }
                }
            }
        });
        return () => interval.unsubscribe();
    }, [stop, second, minute, hour, intervalRX]);

    const hClick = (button) => {
        const stopp = stop;
        if (button === "Start") {
            setStop(!stopp);
        } else if (button === "Stop") {
            setSecond(0);
            setMinute(0);
            setHour(0);
            setStop(!stopp);
        }
    };
    const hReset = () => {
        setSecond(0);
        setMinute(0);
        setHour(0);
        setStop(true);
    };
    const hImitateDoubleClick = () => {
        const curTime = Date.now();
        if (doubleClickTimer > 0) {  //not first click
            const timeDiff = curTime - doubleClickTimer;
            if (timeDiff > 300) {
                doubleClickTimer = 0;
                return false;
            }
            setStop(false);
            doubleClickTimer = 0;
        }

        doubleClickTimer = curTime; // first
    };

    return (

        <div className="Stopwatch">
            <div className="Time">
                <Time hour={hour} minute={minute} second={second} />
            </div>
            <div className="control-buttons">
                <button onClick={
                    stop ? () => hClick("Stop") : () => hClick("Start")
                } >
                    {stop ? "Stop" : "Start"} </button>
                <button onClick={hImitateDoubleClick}>Wait</button>
                <button onClick={hReset}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;