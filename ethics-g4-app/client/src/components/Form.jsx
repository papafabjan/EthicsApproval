import React, {useState} from 'react'
import { Pg0 } from './form-pages/Pg0';
import { Pg1 } from './form-pages/Pg1';
import { Pg2 } from './form-pages/Pg2';
import { Pg3 } from './form-pages/Pg3';
import { Pg4 } from './form-pages/Pg4';
import { Pg5 } from './form-pages/Pg5';
import { Pg6 } from './form-pages/Pg6';
import { Pg7 } from './form-pages/Pg7';
import { Pg8 } from './form-pages/Pg8';
import { Pg9 } from './form-pages/Pg9';
import { Pg10 } from './form-pages/Pg10';

function Form() {

    const[page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "", 
        studentRegistration: "",
        program: "",
    });

    const FormTitles = [
        "Page 0",
        "Page 1",
        "Page 2",
        "Page 3",
        "Page 4",
        "Page 5",
        "Page 6",
        "Page 7",
        "Page 8",
        "Page 9",
        "Page 10",
    ];

    const PageDisplay = () => {
        if (page == 0) {
            return <Pg0 />;
        }
        else if (page == 1) {
            return <Pg1 formData={formData} setFormData={setFormData}/>;
        }
        else if (page == 2) {
            return <Pg2 />;
        }
        else if (page == 3) {
            return <Pg3 />;
        }
        else if (page == 4) {
            return <Pg4 />;
        }
        else if (page == 5) {
            return <Pg5 />;
        }
        else if (page == 6) {
            return <Pg6 />;
        }
        else if (page == 7) {
            return <Pg7 />;
        }
        else if (page == 8) {
            return <Pg8 />;
        }
        else if (page == 9) {
            return <Pg9 />;
        }
        else {
            return <Pg10 />;
        }
    } 

    

    return (
        <div className='form'>
            <div className='form-container'>
                <div className='header'>
                    <h1>{FormTitles[page]}</h1>
                </div>

                <div className='body'>
                    {PageDisplay()}
                </div>

                <div className='footer'>

                    <button disabled= {page == 0} onClick={() => {setPage((currPage) => currPage - 1)}}>
                        Prev
                    </button>

                    <button disabled= {page == FormTitles.length - 1} onClick={() => {setPage((currPage) => currPage + 1)}}>
                        Next
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Form