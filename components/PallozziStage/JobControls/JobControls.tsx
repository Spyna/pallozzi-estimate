import { ChangeEvent, useEffect, useState } from "react";
import { DataType } from "../../../lib/JobToBeDone";
import { Button, ButtonGroup } from "../../Button/Button";
import PallozziSettings from "../PallozziSettings/PallozziSettings";
import ActorsSection from "./ActorsSection";
import DataSection from "./DataSection";
import JobNameSection from "./JobNameSeection";

export interface JobData {
  name: string;
  type: DataType;
}

export interface JobInfo {
  name: string;
  actors: string[];
  datas: JobData[];
}

interface JobControlsProps {
  onJobSubmit: (jobInfo: JobInfo) => void;
}

export default function JobControls({ onJobSubmit }: JobControlsProps) {
  const [jobName, setJobName] = useState<string>("");
  const [actors, setActors] = useState<string[]>([]);
  const [datas, setDatas] = useState<JobData[]>([]);
  const [job, setJob] = useState<JobInfo>();

  useEffect(() => {
    if (job) {
      onJobSubmit(job);
    }
  }, [job, onJobSubmit]);

  useEffect(() => {
    setJob({
      name: jobName,
      actors,
      datas,
    });
  }, [actors, datas, jobName]);

  function reset() {
    setJobName("");
    setActors([]);
    setDatas([]);
    setJob(undefined);
  }

  return (
    <div className="p-3">
      <Button onClick={reset}>Reset</Button>
      <PallozziSettings />
      <JobNameSection jobName={jobName} setJobName={setJobName} />
      <ActorsSection setActors={setActors} actors={actors} />
      <DataSection setDatas={setDatas} datas={datas} />
    </div>
  );
}
