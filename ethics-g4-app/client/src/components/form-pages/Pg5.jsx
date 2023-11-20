import OptionsList from '../OptionsList';

export const Pg5 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="ResearchProject">Potential Participants <span style={{ color: 'red' }}>*</span></label>
                <p>What sort of participants will you test. Indicate how many participants do you plan to test, and what is the rationale for the intended sample size? (i.e., has a power analysis been carried out?)</p>
                <input type="text" class="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantName">Recruiting Potential Participants <span style={{ color: 'red' }}>*</span></label>    
                <p>How will you find, approach and ask potential participants to take part at your research?</p>
                <input type="text" class="form-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantEmail">Payment <span style={{ color: 'red' }}>*</span></label>
                <p>Will financial/in kind payments be offered to participants? </p>
                <input type="text" class="form-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div class="form-group">
                <label for="StartDate">Potential Harm to Participants <span style={{ color: 'red' }}>*</span></label>
                <p>What is the potential for physical and/or psychological harm/distress to the participants?  How will this be managed to ensure appropriate protection and well-being of the participants?</p>
                <input type="text" class="form-control" id="StartDate"/>
            </div>
            <div class="form-group">
                <label for="StartDate">Involves potentially vulnerable participants? <span style={{ color: 'red' }}>*</span></label>
                <p>e.g., those who are ill, ethnic or racial minorities, those who do not speak the language used for the research, children, those economically disadvantaged, adults with diminished capacity</p>
                <input type="text" class="form-control" id="StartDate"/>
            </div>
        </form>
    </>
    );
};
