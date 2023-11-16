import OptionsList from '../OptionsList';

export const Pg1 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">Registration Number</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="e.g. CSS12345"/>
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput">Track Selection</label>
                <OptionsList />
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Another label</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
            </div>
        </form>
    </>
    );
};
