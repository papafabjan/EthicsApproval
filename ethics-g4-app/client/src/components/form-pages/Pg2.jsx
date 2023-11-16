import OptionsList from '../OptionsList';

export const Pg2 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">Page 2 Test</label>
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