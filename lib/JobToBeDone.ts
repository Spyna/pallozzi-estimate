import { PallozziWeight } from "../context/PallozziConfigContext";
import { randomId } from "./utils";

export class NamedItem {
  id: ID;
  name: string;
  constructor(name: string) {
    this.id = randomId();
    this.name = name;
  }
}

export class Jtbd extends NamedItem {
  actors: Actor[];
  data: Data[];

  constructor(config: JtbdOptions) {
    super(config.name)
    this.actors = config.actors || [];
    this.data = [...config.datas];
  }

  getEstimate(weights: PallozziWeight) {
    const reads = this.data.filter(
      (data) => DataType[data.type] == DataType.READ
    ).length;
    const updates = this.data.filter(
      (data) => DataType[data.type] == DataType.UPDATE
    ).length;
    const writes = this.data.filter(
      (data) => DataType[data.type] == DataType.WRITE
    ).length;
    return this.actors.length * (reads * weights.read + updates * weights.update + writes * weights.write) * 1.8;
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }
}

export type ID = string;

export interface JtbdOptions {
  name: string;
  actors?: Actor[];
  writes?: Data[];
  reads?: Data[];
  updates?: Data[];
  datas: Data[];
}

export enum DataType {
  WRITE = "WRITE",
  READ = "READ",
  UPDATE = "UPDATE",
}

export class Data extends NamedItem {
  type: DataType;
  constructor(name: string, type: DataType) {
    super(name);
    this.type = type;
  }
}

export class Actor extends NamedItem {
  constructor(name: string) {
    super(name);
  }
}
