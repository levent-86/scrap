export const ControlCenter = () => {
  return (
    <>
      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" defaultChecked />
        <div className="collapse-title font-semibold">Preferences</div>
        <div className="collapse-content text-sm">Preferences logic here.</div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" />
        <div className="collapse-title font-semibold">Field Names</div>
        <div className="collapse-content text-sm">Field Names logic here.</div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" />
        <div className="collapse-title font-semibold">Buttons</div>
        <div className="collapse-content text-sm">Buttons logic here.</div>
      </div>
    </>
  );
};
