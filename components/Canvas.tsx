import React, { useRef, useEffect } from "react";

function Canvas(props: {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
  
} & React.CanvasHTMLAttributes<HTMLCanvasElement>) {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = (canvas as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas  ref={canvasRef} {...rest} />;
}

export default Canvas;
