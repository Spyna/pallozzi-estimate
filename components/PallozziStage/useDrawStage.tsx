import Konva from "konva";
import { useContext, useEffect } from "react";
import {
  PallozziConfig,
  PallozziContext,
  PallozziContextType,
} from "../../context/PallozziConfigContext";
import { Jtbd } from "../../lib/JobToBeDone";
import { downloadURI } from "../../lib/utils";
import { Pallozzo } from "./Pallozzo";

export interface Stage {
  download: () => void;
}

export function useDrawStage(
  container: React.RefObject<HTMLDivElement>,
  job: Jtbd | null
): Stage {
  let stage: Konva.Stage | null = null;
  if (container.current) {
    const { width, height } = container.current.getBoundingClientRect();
    stage = new Konva.Stage({
      container: container.current,
      width,
      height,
    });
  }

  const { config } = useContext<PallozziContextType>(PallozziContext);
  useEffect(() => {
    if (!stage || !job) {
      return;
    }

    let edgesLayer = new Konva.Layer();
    let pallozziLayer = new Konva.Layer();

    addBackGroundColor(stage);
    addEstimate(stage, job.getEstimate(config.weights));
    stage.add(edgesLayer);
    stage.add(pallozziLayer);

    let radius = job.getEstimate(config.weights);
    if (radius === 0) {
      radius = 5;
    }
    const pallozzo: Pallozzo = new Pallozzo(
      job.name,
      stage.width() / 2,
      stage.height() / 2,
      radius,
      "purple"
    );

    addActors(job, pallozzo, pallozziLayer, edgesLayer, config);
    addData(job, pallozzo, pallozziLayer, edgesLayer);

    pallozzo.addTo(pallozziLayer);
  }, [stage, job, config]);

  function download() {
    if (!job || !stage) {
      return;
    }
    const dataURL = stage.toDataURL({ pixelRatio: 3 });
    downloadURI(dataURL, `${job ? job.name : "pallozzi-estimate"}.png`);
  }

  return {
    download,
  };
}

function addActors(
  job: Jtbd,
  pallozzo: Pallozzo,
  pallozziLayer: Konva.Layer,
  edgesLayer: Konva.Layer,
  config: PallozziConfig
) {
  job.actors.forEach((actor, i) => {
    const actorPallozzo = new Pallozzo(
      actor.name,
      150 * (i + 2),
      100 * (i + 1),
      5,
      config.color.actor
    );
    actorPallozzo.addTo(pallozziLayer);
    const { edge, text } = pallozzo.connect(actorPallozzo, "DOES");
    edgesLayer.add(edge);
    pallozziLayer.add(text);
  });
}

function addData(
  job: Jtbd,
  pallozzo: Pallozzo,
  pallozziLayer: Konva.Layer,
  edgesLayer: Konva.Layer
) {
  job.data.forEach((data, i) => {
    const dataPallozzo = new Pallozzo(
      data.name,
      50 * (i + 2),
      150 * (i + 1),
      4,
      "lightgreen"
    );
    dataPallozzo.addTo(pallozziLayer);
    const { edge, text } = pallozzo.connect(dataPallozzo, data.type);
    edgesLayer.add(edge);
    pallozziLayer.add(text);
  });
}

function addBackGroundColor(stage: Konva.Stage) {
  const layer = new Konva.Layer();
  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: "#ccfbf1",
  });
  layer.add(background);
  stage.add(layer);
}

function addEstimate(stage: Konva.Stage, estimate: number) {
  const layer = new Konva.Layer();
  const background = new Konva.Text({
    x: 10,
    y: 10,
    text: `Estimate: ${estimate.toFixed(2)} days`,
    fontSize: 20,
    fontFamily: "Calibri",
    fill: "black",
  });
  layer.add(background);
  stage.add(layer);
}
