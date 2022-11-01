import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ButtonGroup } from "../../Button/Button";

export default function JobNameSection({
  jobName,
  setJobName,
}: {
  jobName: string;
  setJobName: Dispatch<SetStateAction<string>>;
}) {
  const [name, setName] = useState("");

  function onJobNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setJobName(name);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="thing_to_be_done"
          className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
        >
          Thing to be done
        </label>
        <div className="flex">
          <input
            type="text"
            id="thing_to_be_done"
            value={name}
            onChange={onJobNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="send an email to a customer"
            required
          />
          <ButtonGroup type="submit">Set</ButtonGroup>
        </div>
      </div>
    </form>
  );
}
