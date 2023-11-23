import SupervisorOptionsList from "../SupervisorOptionsList";

export const Pg2 = () => {
  return (
    <>
      <form>
        <div class="form-group">
          <label for="Supervisor">
            Supervisor <span style={{ color: "red" }}>*</span>
          </label>
          <SupervisorOptionsList />
        </div>
      </form>
    </>
  );
};
