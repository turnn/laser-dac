import { Shape } from '@ether-dream/draw/src/Shape';
import { Point, Color } from '@ether-dream/draw/src/Point';
import Bezier = require('bezier-js');

interface BezierCoordinates {
  x: number;
  y: number;
}

interface QuadCurveOptions {
  from: BezierCoordinates;
  to: BezierCoordinates;
  control: BezierCoordinates;
  color: Color;
}

export class QuadCurve extends Shape {
  from: BezierCoordinates;
  to: BezierCoordinates;
  control: BezierCoordinates;
  color: Color;

  constructor(options: QuadCurveOptions) {
    super();
    this.from = options.from;
    this.to = options.to;
    this.control = options.control;
    this.color = options.color;
  }

  draw(resolution: number): Point[] {
    const curve = new Bezier(
      this.from.x,
      this.from.y,
      this.control.x,
      this.control.y,
      this.to.x,
      this.to.y
    );

    const distance = curve.length();
    const steps = Math.round(distance * resolution);
    const curvePoints = curve.getLUT(steps);

    return curvePoints.map(
      (point: any) => new Point(point.x, point.y, this.color)
    );
  }
}