import { Actor, Data, Jtbd } from "../../lib/JobToBeDone";
import React, { useCallback, useContext, useState } from "react";
import JobControls, { JobInfo } from "./JobControls/JobControls";
import { useDrawStage } from "./useDrawStage";
import { Button } from "../Button/Button";
import {
  PallozziContext,
  PallozziContextType,
  withContext,
} from "../../context/PallozziConfigContext";

function PallozziStage() {
  const container = React.useRef<HTMLDivElement>(null);

  const [job, setJob] = useState<Jtbd | null>(null);
  const { config } = useContext<PallozziContextType>(PallozziContext);

  const updateJob = useCallback((newJob: JobInfo) => {
    setJob(
      new Jtbd({
        name: newJob.name,
        actors: newJob.actors.map((actor) => new Actor(actor)),
        datas: newJob.datas.map((data) => new Data(data.name, data.type)),
      })
    );
  }, []);

  const { download } = useDrawStage(container, job);

  function onDownload() {
    download();
  }

  return (
    <div>
      <div className="flex">
        <div className="lg:w-1/4">
          <JobControls onJobSubmit={updateJob} />
        </div>
        <div className="lg:w-3/4">
          <div className="flex p-2">
            <div className="text-2xl font-bold mx-5">
              Estimate: {job?.getEstimate(config.weights).toFixed(2)}{" "}
              {job && "days"}
            </div>
            <Button onClick={onDownload}>Download</Button>
          </div>
          <div
            ref={container}
            className="w-full h-[800px] border-teal-800"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default withContext(PallozziStage);
