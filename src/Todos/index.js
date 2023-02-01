import { useReducer, useRef } from "react";
import reducer, { initState } from "./reducer.js";
import { setJob, addJob, deleteJob } from "./actions.js";
import logger from "./logger.js";

function App() {
    const [state, dispatch] = useReducer(logger(reducer), initState);
    //Destructuring
    const { job, jobs } = state;
    const jobRef = useRef();

    const handleSubmit = () => {
        dispatch(addJob(job));
        dispatch(setJob(""));
        jobRef.current.focus();
    };

    return (
        <div
            style={{
                padding: 50,
            }}
        >
            <h1>Todos</h1>
            <input
                ref={jobRef}
                value={job}
                placeholder="Enter job todo..."
                onChange={(e) => {
                    dispatch(setJob(e.target.value));
                }}
            />
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {job}
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                                dispatch(deleteJob(index));
                            }}
                        >
                            &times;
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
