import OptionsList from '../OptionsList';
import SupervisorOptionsList from '../SupervisorOptionsList';

export const Pg2 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="StudentRegistration">Student registration number <span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="StudentRegistration" placeholder="e.g. CSS12345"/>
            </div>
            <div class="form-group">
                <label for="Program">Program you are enrolled at <span style={{ color: 'red' }}>*</span> </label>
                <OptionsList />
            </div>
            <div class="form-group">
                <label for="Supervisor">Supervisor <span style={{ color: 'red' }}>*</span></label>
                <SupervisorOptionsList />
            </div>
        </form>
    </>
    );
};