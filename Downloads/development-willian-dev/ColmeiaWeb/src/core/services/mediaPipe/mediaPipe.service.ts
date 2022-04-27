import {SelfieSegmentation} from '@mediapipe/selfie_segmentation'

// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os

/**
 * @fileoverview Demonstrates a minimal use case for MediaPipe face tracking.
 */

const controls = window;
const mpSelfieSegmentation = window;

const examples = {
  images: [],
  // {name: 'name', src: 'https://url.com'},
  videos: [],
};

// Our input frames will come from here.
const videoElement =
      document.getElementsByClassName('input_video')[0] as HTMLVideoElement;
const canvasElement =
    document.getElementsByClassName('output_canvas')[0] as HTMLCanvasElement;
const controlsElement =
    document.getElementsByClassName('control-panel')[0] as HTMLDivElement;
const canvasCtx = canvasElement.getContext('2d')!;

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
// const fpsControl = new controls.FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading')! as HTMLDivElement;
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

let activeEffect = 'mask';
// function onResults(results: mpSelfieSegmentation): void {
//   // Hide the spinner.
//   document.body.classList.add('loaded');

//   // Update the frame rate.
//   // fpsControl.tick();

//   // Draw the overlays.
//   canvasCtx.save();

//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

//   canvasCtx.drawImage(
//       results.segmentationMask, 0, 0, canvasElement.width,
//       canvasElement.height);

//   // Only overwrite existing pixels.
//     if (activeEffect === 'mask' || activeEffect === 'both') {
//       canvasCtx.globalCompositeOperation = 'source-in';
//       // This can be a color or a texture or whatever...
//       canvasCtx.fillStyle = '#00FF007F';
//       canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
//     } else {
//       canvasCtx.globalCompositeOperation = 'source-out';
//       canvasCtx.fillStyle = '#0000FF7F';
//       canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
//     }

//     // Only overwrite missing pixels.
//     canvasCtx.globalCompositeOperation = 'destination-atop';
//     canvasCtx.drawImage(
//         results.image, 0, 0, canvasElement.width, canvasElement.height);


//   canvasCtx.restore();
// }

const selfieSegmentation = new SelfieSegmentation({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`;
}});

// Present a control panel through which the user can manipulate the solution
// options.
// new controls
//     .ControlPanel(controlsElement, {
//       selfieMode: true,
//       modelSelection: 1,
//       effect: 'mask',
//     })
//     .add([
//       new controls.StaticText({title: 'MediaPipe Selfie Segmentation'}),
//       fpsControl,
//       new controls.Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
//       new controls.SourcePicker({
//         onSourceChanged: () => {
//           selfieSegmentation.reset();
//         },
//         onFrame:
//             async (input: controls.InputImage, size: controls.Rectangle) => {
//               const aspect = size.height / size.width;
//               let width: number, height: number;
//               if (window.innerWidth > window.innerHeight) {
//                 height = window.innerHeight;
//                 width = height / aspect;
//               } else {
//                 width = window.innerWidth;
//                 height = width * aspect;
//               }
//               canvasElement.width = width;
//               canvasElement.height = height;
//               await selfieSegmentation.send({image: input});
//             },
//         examples: examples
//       }),
//       new controls.Slider({
//         title: 'Model Selection',
//         field: 'modelSelection',
//         discrete: ['General', 'Landscape'],
//       }),
//       new controls.Slider({
//         title: 'Effect',
//         field: 'effect',
//         discrete: {'background': 'Background', 'mask': 'Foreground'},
//       }),
//     ])
//     .on(x => {
//       const options = x as mpSelfieSegmentation.Options;
//       videoElement.classList.toggle('selfie', options.selfieMode);
//       activeEffect = (x as {[key: string]: string})['effect'];
//       selfieSegmentation.setOptions(options);
//     });
