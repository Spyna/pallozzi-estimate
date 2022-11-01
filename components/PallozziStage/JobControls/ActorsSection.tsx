import { Dispatch, SetStateAction } from "react";
import { Button, ButtonGroup, ButtonSize } from "../../Button/Button";
import { RemoveIcon } from "../../Icons/Icons";

export default function ActorsSection({
    actors,
    setActors,
  }: {
    actors: string[];
    setActors: Dispatch<SetStateAction<string[]>>;
  }) {
    function addActor(e: React.SyntheticEvent) {
      e.preventDefault();
      e.stopPropagation();
      const input = document.getElementById("actor") as HTMLInputElement;
      if (input.value === "") {
        return;
      }
      const actor = input.value;
      setActors([actor, ...actors]);
      input.value = "";
    }
  
    function removeActor(actor: string) {
      return function () {
        const newActors = [...actors];
        const index = newActors.indexOf(actor);
        newActors.splice(index, 1);
        setActors([...newActors]);
      };
    }
    return (
      <div className="my-2">
        <form onSubmit={addActor}>
          <h3 className="block mb-2 font-medium text-gray-900 dark:text-gray-300">
            Actors
          </h3>
          <div className="flex">
            <input
              type="text"
              id="actor"
              name="actor"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer"
              required
            />
            <ButtonGroup type="submit">Add</ButtonGroup>
          </div>
          <div>
            {actors.map((actor, i) => (
              <li className="my-4" key={`actor-${i}-${actor}`}>
                {actor}{" "}
                <Button size={ButtonSize.sm} onClick={removeActor(actor)}>
                  <RemoveIcon className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </div>
        </form>
      </div>
    );
  }