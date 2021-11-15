const Time = (props) => {
    return (
        <div className="time">
            <div className="text">Stopwatch</div>
            {props.hour > 9 ? props.hour : "0" + props.hour} : {" "}
            {props.minute > 9 ? props.minute : "0" + props.minute} : {" "}
            {props.second > 9 ? props.second : "0" + props.second}
        </div>
    );
};

export default Time;