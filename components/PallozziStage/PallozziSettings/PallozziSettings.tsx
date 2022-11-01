import React, { ChangeEvent, Dispatch, useContext, useState } from "react";
import {
  defaultPallozziConfig,
  PallozziConfig,
  PallozziContext,
  PallozziContextType,
} from "../../../context/PallozziConfigContext";
import { Button, ButtonVariant } from "../../Button/Button";

export default function PallozziSettings() {
  const [showModal, setShowModal] = React.useState(false);

  function toggleModal() {
    setShowModal((open) => !open);
  }
  const { config, updateConfig }: PallozziContextType =
    useContext(PallozziContext);

  const [readWeight, setReadWeight] = useState(config.weights.read);
  const [writeWeight, setWriteWeight] = useState(config.weights.write);
  const [updateWeight, setUpdateWeight] = useState(config.weights.update);

  function setValue(setFn: Dispatch<number>) {
    return function (value: number | string) {
      setFn(Number(value));
    };
  }

  function saveSettings() {
    updateConfig({
      ...config,
      weights: {
        read: readWeight,
        write: writeWeight,
        update: updateWeight,
      },
    });
    toggleModal();
  }

  function reset() {
    updateConfig(defaultPallozziConfig);
    toggleModal();
  }

  return (
    <>
      <Button type="button" onClick={toggleModal}>
        Settings
      </Button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Settings</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:bg-teal-200 rounded-full flex justify-center items-center"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-60 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <h3 className="ext-2x font-semibold mt-3">Action weight</h3>
                  <Input
                    label="Read action weight"
                    onChange={setValue(setReadWeight)}
                    value={readWeight}
                  />
                  <Input
                    label="Write action weight"
                    onChange={setValue(setWriteWeight)}
                    value={writeWeight}
                  />
                  <Input
                    label="Update action weight"
                    onChange={setValue(setUpdateWeight)}
                    value={updateWeight}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    variant={ButtonVariant.outlined}
                    type="button"
                    onClick={toggleModal}
                  >
                    Close
                  </Button>
                  <Button
                    variant={ButtonVariant.outlined}
                    type="button"
                    onClick={reset}
                  >
                    Reset to default
                  </Button>
                  <Button type="button" onClick={saveSettings}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
interface InputProps {
  value: number | string;
  onChange: (value: number | string) => void;
  label: string;
}

function Input({ value, onChange, label }: InputProps) {
  function onValueChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <div>
      <label
        htmlFor={`input-${label}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type="text"
        id={`input-${label}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        value={value}
        onChange={onValueChange}
      />
    </div>
  );
}
