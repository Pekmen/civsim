import './style.css';

import { CivSimulation } from './CivSimulation';

const canvas = document.querySelector<HTMLCanvasElement>('#worldCanvas');

if (canvas) {
  canvas.width = 800;
  canvas.height = 600;
  const simulation = new CivSimulation(canvas, {
    initialWorkers: 10,
    initialHouses: 0,
    debugConfig: {
      enabled: true,
      showFPS: true,
      // showPosition: true,
      // showCollisionBox: true,
      showTargetVector: true,
      // showVelocityVector: true,
    },
  });
  simulation.start();
} else {
  alert("Your browser doesn't support canvas");
}
