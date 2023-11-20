import React, { useState } from "react";
import { Pg1 } from "../components/form-pages/Pg1";
import { Pg2 } from "../components/form-pages/Pg2";
import { Pg3 } from "../components/form-pages/Pg3";
import { Pg4 } from "../components/form-pages/Pg4";
import { Pg5 } from "../components/form-pages/Pg5";
import { Pg6 } from "../components/form-pages/Pg6";
import { Pg7 } from "../components/form-pages/Pg7";
import { Pg8 } from "../components/form-pages/Pg8";
import { Pg9 } from "../components/form-pages/Pg9";
import { Pg10 } from "../components/form-pages/Pg10";
import { Pg11 } from "../components/form-pages/Pg11";
const Application = () => {
    const [pgNo, setPgNo] = useState(1);

    return (
        <div>
            <div>
                {pgNo == 1 ? <Pg1 /> : pgNo == 2 ? <Pg2 /> : pgNo == 3 ? <Pg3 /> : pgNo == 4 ? <Pg4 />: pgNo == 5 ? <Pg5 /> : pgNo == 6 ? <Pg6 />: pgNo == 7 ? <Pg7 /> : pgNo == 8 ? <Pg8 /> : pgNo == 9 ? <Pg9 />: pgNo == 10 ? <Pg10 /> : <Pg11 /> }
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
                    {pgNo < 11 && (
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
                    <p>Page {pgNo} / 11</p>
                </center>
            </div>
        </div>
    );
};

export default Application;