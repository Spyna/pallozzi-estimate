import { Dispatch, SetStateAction } from "react";
import { DataType } from "../../../lib/JobToBeDone";
import { Button, ButtonGroup, ButtonSize } from "../../Button/Button";
import { RemoveIcon } from "../../Icons/Icons";
import { JobData } from "./JobControls";

export default 
function DataSection({
  datas,
  setDatas,
}: {
  datas: JobData[];
  setDatas: Dispatch<SetStateAction<JobData[]>>;
}) {
  function addData(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const input = document.getElementById("data-name") as HTMLInputElement;
    if (input.value === "") {
      return;
    }
    const name = input.value;
    const type = (document.getElementById("data-type") as HTMLInputElement)
      .value;
    const data: JobData = {
      name,
      type: type as DataType,
    };
    setDatas([data, ...datas]);
    input.value = "";
  }

  function removeData(data: JobData) {
    return function () {
      const newActors = [...datas];
      const index = newActors.indexOf(data);
      newActors.splice(index, 1);
      setDatas([...newActors]);
    };
  }
  return (
    <div>
      <form onSubmit={addData}>
        <h3 className="block mb-2 font-medium text-gray-900 dark:text-gray-300">
          Data
        </h3>
        <div className="flex">
          <input
            type="text"
            id="data-name"
            name="data-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email, logs"
            required
          />
          <select id="data-type">
            {(Object.keys(DataType) as Array<keyof typeof DataType>).map(
              (type) => (
                <option key={`data-type-${type}`}>{type}</option>
              )
            )}
          </select>
          <ButtonGroup type="submit">Add</ButtonGroup>
        </div>
        <div>
          {datas.map((data, i) => (
            <li className="my-4" key={`actor-${i}-${data}`}>
              {data.name} ({data.type})
              <Button size={ButtonSize.sm} onClick={removeData(data)}>
                <RemoveIcon className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </div>
      </form>
    </div>
  );
}