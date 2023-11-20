import OptionsList from '../OptionsList';

export const Pg1 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="FirstName">First Name(s) <span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="FirstName" placeholder="e.g Christina,Fabian,Nikos, etc."/>
            </div>
            <div class="form-group">
                <label for="LastName">Last Name(s) <span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="LastName" placeholder="e.g Smith"/>
            </div>
           
        </form>
    </>
    );
};
