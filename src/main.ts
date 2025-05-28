import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#worldCanvas');
const context = canvas?.getContext('2d');

if (context) {
  // logic here
} else {
  alert("Your browser doesn't support canvas");
}
