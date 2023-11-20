import React, { useState } from "react";
import { Pg1 } from "../components/form-pages/Pg1";
import { Pg2 } from "../components/form-pages/Pg2";
import { Pg3 } from "../components/form-pages/Pg3";
import { Pg4 } from "../components/form-pages/Pg4";

const Application = () => {
    const [pgNo, setPgNo] = useState(1);

    return (
        <div>
            <div>
                {pgNo == 1 ? <Pg1 /> : pgNo == 2 ? <Pg2 /> : pgNo == 3 ? <Pg3 /> : <Pg4 />}
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
                    {pgNo < 4 && (
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
                    <p>Page {pgNo} / 4</p>
                </center>
            </div>
        </div>
    );
};

export default Application;