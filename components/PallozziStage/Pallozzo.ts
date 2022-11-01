import Konva from "konva";

interface Position {
  x: number;
  y: number;
}

abstract class Observer {
  abstract update(): void;
}

abstract class Subject {
  abstract registerObserver(o: Observer): void;
  abstract notifyObservers(): void;

  abstract getPosition(): Position;
}

class TitleTextObserver extends Observer {
  text: Konva.Text;
  subject: Subject;
  node: Konva.Node;
  constructor(subject: Subject, node: Konva.Node, text: Konva.Text) {
    super();
    this.text = text;
    this.subject = subject;
    this.node = node;
  }
  update(): void {
    const pos = this.subject.getPosition();
    this.text.x(pos.x);
    this.text.y(pos.y - this.node.height() / 2 - 15);
  }
}

class EdgeObserver extends Observer {
  node: Konva.Node;
  subject: Subject;
  edge: Konva.Line;
  text: Konva.Text;
  constructor(
    subject: Subject,
    node: Konva.Node,
    edge: Konva.Line,
    text: Konva.Text
  ) {
    super();
    this.node = node;
    this.subject = subject;
    this.edge = edge;
    this.text = text;
  }
  update(): void {
    const pos = this.subject.getPosition();
    this.edge.points([pos.x, pos.y, this.node.x(), this.node.y()]);
    const { x, y } = getMiddle(this.node, pos);
    this.text.x(x);
    this.text.y(y);
  }
}

export class Pallozzo extends Subject {
  node: Konva.Node;
  title: Konva.Text;
  connected: Konva.Node[] = [];
  observers: Observer[] = [];

  constructor(
    text: string,
    x: number,
    y: number,
    radius: number,
    fillColor: string
  ) {
    super();
    let pallozzo = new Konva.Circle({
      x: x,
      y: y,
      radius: 5 * radius,
      stroke: "#666",
      fill: fillColor,
      strokeWidth: 2,
      draggable: true,
    });

    pallozzo.on("mouseover", function () {
      document.body.style.cursor = "pointer";
      this.strokeWidth(4);
    });
    pallozzo.on("mouseout", function () {
      document.body.style.cursor = "default";
      this.strokeWidth(2);
    });
    this.node = pallozzo;

    const box = this.node.getClientRect();
    const pallozzoTitle = new Konva.Text({
      x: box.x + box.width / 2,
      y: box.y - 15,
      text: text,
      fontSize: 15,
      fontFamily: "Calibri",
      fill: "black",
    });
    this.registerObserver(
      new TitleTextObserver(this, this.node, pallozzoTitle)
    );
    this.title = pallozzoTitle
    this.node.on("dragmove", () => {
      this.notifyObservers();
    });
  }

  addTo(layer: Konva.Layer) {
    layer.add(this.node as Konva.Shape);
    layer.add(this.title as Konva.Shape);
  }

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => observer.update());
  }

  getPosition() {
    const { x, y, width, height } = this.node.getClientRect();
    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  }

  connect(pallozzo: Pallozzo, relationType: string): PallozzoConnection {
    const node = pallozzo.node;
    this.connected.push(node);
    const sourceBox = this.node.getClientRect();
    let edge = new Konva.Line({
      strokeWidth: 1,
      stroke: "black",
      lineCap: "round",
      id: node.id(),
      opacity: 0.6,
      points: [
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2,
        node.getClientRect().x + node.getClientRect().width / 2,
        node.getClientRect().y + node.getClientRect().height / 2,
      ],
    });
    

    const { x, y } = getMiddleOfEdge(this.node, node);

    const relationText = new Konva.Text({
      x,
      y,
      text: relationType,
      fontSize: 15,
      fontFamily: "Calibri",
      fill: "#777",
    });
    this.registerObserver(new EdgeObserver(this, node, edge, relationText));

    node.on("dragmove", () => {
      this.notifyObservers();
    });
    return {
      edge,
      text: relationText
    }
  }
}

function getMiddleOfEdge(node1: Konva.Node, node2: Konva.Node): Position {
  const box1 = node1.getClientRect();
  const box2 = node2.getClientRect();
  const x =
    Math.min(box1.x + box1.width / 2, box2.x + box2.width / 2) +
    Math.abs(box1.x + box1.width / 2 - box2.x + box2.width / 2) / 2;
  const y =
    Math.min(
      box1.y + box1.height / 2 + box1.height / 2,
      box2.y + box2.height / 2
    ) +
    Math.abs(box1.y - box2.y + box2.height / 2) / 2;

  return {
    x,
    y,
  };
}

export interface PallozzoConnection {
  edge: Konva.Line;
  text: Konva.Text;
}

function getMiddle(node1: Konva.Node, position: Position): Position {
  const box1 = node1.getClientRect();
  const x =
    Math.min(box1.x + box1.width / 2, position.x) +
    Math.abs(box1.x + box1.width / 2 - position.x) / 2;
  const y =
    Math.min(box1.y + box1.height / 2 + box1.height / 2, position.y) +
    Math.abs(box1.y - position.y) / 2;

  return {
    x,
    y,
  };
}
