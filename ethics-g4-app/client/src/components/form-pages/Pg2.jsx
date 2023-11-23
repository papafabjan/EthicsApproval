import SupervisorOptionsList from "../SupervisorOptionsList";

export const Pg2 = () => {
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="Supervisor">
            Supervisor <span style={{ color: "red" }}>*</span>
          </label>
          <SupervisorOptionsList />
        </div>
      </form>
    </>
  );
};
