import React, { useState } from "react";
import { Pg1 } from "../components/pages/Pg1";
import { Pg2 } from "../components/pages/Pg2";
import { Pg3 } from "../components/pages/Pg3";

const Application = () => {
    const [pgNo, setPgNo] = useState(1);

    return (
        <div>
            <div>
                {pgNo == 1 ? <Pg1 /> : pgNo == 2 ? <Pg2 /> : <Pg3 />}
                <center>
                    {pgNo > 1 && (
                        <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                            let pg = pgNo;
                            setPgNo(pg - 1);
                        }}
                        >
                        Back
                        </button>
                    )}
                    {pgNo < 3 && (
                        <button
                        className="btn btn-primary mx-4"
                        type="button"
                        onClick={() => {
                            let pg = pgNo;
                            setPgNo(pg + 1);
                        }}
                        >
                        Next
                        </button>
                    )}
                </center>
                <center>
                    <p>Page {pgNo} / 3</p>
                </center>
            </div>
        </div>
    );
};

export default Application;