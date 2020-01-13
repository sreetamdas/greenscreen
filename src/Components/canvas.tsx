import React, { useRef, useEffect, RefObject } from "react";

type TImageSnapshot = {
	data: Uint8ClampedArray;
	height: number;
	width: number;
};

export const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const hiddenRef = useRef<HTMLCanvasElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	const constraints = { audio: false, video: { width: 480, height: 360 } };

	const rapidRefresh = (
		video: HTMLVideoElement,
		canvas: CanvasRenderingContext2D
	) => {
		// console.log({ video }, { canvas });

		canvas.drawImage(video, 0, 0);
		setTimeout(() => {
			rapidRefresh(video, canvas);
		}, 0); // rapidly refresh :P
	};

	useEffect(() => {
		const canvas = canvasRef.current?.getContext(
			"2d"
		) as CanvasRenderingContext2D;
		const video = videoRef.current as HTMLVideoElement;
		// if (canvas !== null && canvas.getContext) {

		console.log({ canvas });

		// canvasContext.fillStyle = "green";

		/* 
			0, 0, width and height?

			*/
		// canvasContext.fillRect(0, 0, 470, 350);
		// }
		// if (video !== null) {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(mediaStream => {
				video.srcObject = mediaStream;
				video.onloadedmetadata = () => {
					video.play();

					// Add an event listener in order to set up canvas to stream the video
					video?.addEventListener("loadeddata", () => {
						console.log("loaded");

						rapidRefresh(video, canvas);
						processImage(video, canvas, canvasRef);
					}); // can also use "loadeddata"
					// canvasContext?.drawImage(video, 0, 0); // only a single snapshot
				};
			})
			.catch(error => {
				console.log({ error });
			});
		// }
	}, []);

	const processImage = (
		video: HTMLVideoElement,
		canvas: CanvasRenderingContext2D,
		canvasRef: RefObject<HTMLCanvasElement>
	) => {
		const snapshot: TImageSnapshot = canvas.getImageData(
			0,
			0,
			(canvasRef.current as HTMLCanvasElement).width,
			(canvasRef.current as HTMLCanvasElement).height
		);

		console.log({ snapshot });

		/* 
		format of snapshot's data:Uint8ClampedArray =>

		0: RBG's Red value
		1: RGB's Green value
		2: RGB's Blue value
		3: Another 8-bit value

		*/

		const numberOfPixels = snapshot.data.length / 4;
		console.log({ numberOfPixels });

		// Now the processing
	};

	return (
		<React.Fragment>
			<div style={{ border: "1px red solid" }}>
				<canvas
					ref={canvasRef}
					width="480"
					height="360"
					style={{
						border: "4px green solid",
						transform: "scaleX(-1)",
					}}
				></canvas>
				<div style={{ display: "none" }}>
					<canvas ref={hiddenRef}></canvas>
				</div>
				<video
					ref={videoRef}
					style={{
						border: "4px purple solid",
						transform: "scaleX(-1)",
					}}
				></video>
			</div>
		</React.Fragment>
	);
};
