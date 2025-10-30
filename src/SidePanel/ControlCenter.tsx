/* 
ControlCenter.tsx

All side panel preferences, additions and features
are declared in this component.
*/

import { Menu } from '../Menu';
import { Export } from './Export/Export';
import { Fields } from './Fields/Fields';
import { WorkStopper } from './WorkStopper/WorkStopper';

export const ControlCenter = () => {
  return (
    <>
      <Menu />

      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" defaultChecked />
        <div className="collapse-title font-semibold">Fields</div>
        <div className="collapse-content text-sm">
          <Fields />
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" />
        <div className="collapse-title font-semibold">Export saves</div>
        <div className="collapse-content text-sm flex justify-center">
          <Export />
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" />
        <div className="collapse-title font-semibold">Stop Work</div>
        <div className="collapse-content text-sm flex justify-center">
          <WorkStopper />
        </div>
      </div>
    </>
  );
};
