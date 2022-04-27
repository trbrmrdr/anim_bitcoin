
const CANVAS_SIZE = { width: 1024, height: 1024 }
const clock = new THREE.Clock();
const loader = new THREE.ObjectLoader();
var canvas_container_size = { width: 0, height: 0 }

var camera, scene, renderer, stats, mixer, obj_coin;

window.onload = function () {
	const canvas_container = document.getElementById("canvas-container");
	canvas_container.style.backgroundColor = '#202036';
	init();
	animate();

	function init() {

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x414168,);
		// 	// scene.background = null;

		loader.load(
			"data/scene_2.json",

			function (obj) {
				if (obj.parent) {
					// console.log("load compmlete");
					return;
				}

				obj_coin = obj.getObjectByName("Coin_finish.glb");
				scene.add(obj);

			},

			function (xhr) {
				// console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},

			function (err) {
				console.error('An error happened');
			}
		);


		camera = new THREE.PerspectiveCamera(45, CANVAS_SIZE.width / CANVAS_SIZE.height, 1, 500);
		camera.position.set(0, 0, 27);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMapSort = true;
		canvas_container.appendChild(renderer.domElement);

		window.addEventListener('resize', onWindowResize);

		// stats
		stats = new Stats();
		stats.dom.style.left = '480px';
		document.body.appendChild(stats.dom);
		//end stats

		onWindowResize();
		onWindowResize();
	}

	function onWindowResize() {
		let new_width = canvas_container.clientWidth
		let new_height = new_width / CANVAS_SIZE.width * CANVAS_SIZE.height;
		if (canvas_container.clientWidth < canvas_container.clientHeight) {
		}
		if (canvas_container_size.width == new_width && canvas_container_size.height == new_height) return;
		canvas_container_size = { width: new_width, height: new_height };

		renderer.setSize(new_width, new_height);
	}

	//###########################################################################


	try {
		const volume_range = document.getElementById("volume_range");
		volume_range.addEventListener("input", function (val) {
			isPlay = false;
			curr_angle = duration * val.target.value / 100.0;
		});
	} catch { }

	var frame_ds = 0;
	var start_time = -1;
	var stop_time = -1;

	var start_ft = -1;
	var stop_ft = -1;
	var stop_ar = true;

	var curr_speed = 0.25;
	var curr_angle = 0;
	var duration = 360.0 * Math.PI / 180.;
	var isPlay = false;
	function animate() {
		const delta = clock.getDelta();
		if (isPlay) {
			const now = Date.now();

			let new_angle = NaN;

			if (start_ft > 0) {
				if (start_time == -1) {
					start_time = now;
					stop_time = start_time + start_ft * 1000.

					frame_ds = curr_angle
				}

				var dpos = 0;
				if (stop_time > now) {
					var precent = easeInSine(1. - (stop_time - now) / (stop_time - start_time));
					dpos = (duration * 2.0) * precent;
				} else {
					start_ft = - 1
				}

				new_angle = frame_ds + dpos

			} else if (stop_ft > 0) {
				if (start_time == -1) {
					frame_ds = (curr_angle + delta * duration * curr_speed)
					frame_ds += duration - frame_ds % duration

					start_time = now;
					stop_time = start_time + stop_ft * 1000.
				}

				var dpos = 0;
				if (stop_time > now) {
					var precent = easeOutSine(1. - (stop_time - now) / (stop_time - start_time));
					dpos = (duration * 2.0) * precent;
				}

				new_angle =
					frame_ds
					+ (stop_ar ? 0 : duration * 0.5)
					+ dpos

			} else {
				new_angle = curr_angle + delta * duration * curr_speed;
			}
			curr_angle = new_angle % duration;
		}
		if (mixer) mixer.update(delta);
		renderer.render(scene, camera);
		stats.update();
		if (obj_coin) {
			obj_coin.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), curr_angle);
		}
		requestAnimationFrame(animate);
	}


	window.start = function (fade_time_s, val_speed) {
		start_ft = fade_time_s
		start_time = -1;
		curr_speed = val_speed;

		stop_ft = -1.;
		isPlay = true;
	}

	window.rotate = function (val_speed) {
		curr_speed = val_speed;

		stop_ft = -1.
		isPlay = true;
	}

	window.stop = function (fade_time_s, av_rev) {
		stop_ft = fade_time_s;
		start_time = -1;
		stop_ar = av_rev;

		start_ft = -1.;
		isPlay = true;
	}


	window.setType = function (id) {
		document.body.removeChild(stats.dom);

		canvas_container.removeChild(renderer.domElement);
		renderer.dispose();

		canvas_container_size = { width: 0, height: 0 }
		obj_coin = undefined;

		t_type = id;
		init();

	}

};

const easeOutSine = function (x) {
	return Math.sin((x * Math.PI) / 2);
}
const easeInSine = function (x) {
	if (x == Infinity || x == -Infinity) return 0;
	return 1 - Math.cos((x * Math.PI) / 2)
}