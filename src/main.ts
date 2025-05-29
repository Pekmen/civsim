import { CivSimulation } from './CivSimulation';
import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#worldCanvas');

if (canvas) {
  canvas.width = 800;
  canvas.height = 600;
  const simulation = new CivSimulation(canvas, { showFPS: true });
  simulation.start();
} else {
  alert("Your browser doesn't support canvas");
}
