/*global THREE*/
var ball, center, table, fullArm, arm, robo;
var camera, scene, renderer;
var geometry, material, mesh;
var controlLeft, controlRight, controlUp, controlDown, controlA, controlS, controlQ, controlW;
var showWire = true;

function createLight(){
    'use strict';
    var spot = new THREE.SpotLight(0xffffff);
    spot.position.set( 100, 1000, 100 );
    scene.add(spot);
    var spot2 = new THREE.SpotLight(0xffffff);
    spot2.position.set( 100, 100, 1000 );
    scene.add(spot2);
}

function addTableWheel(obj, x, y, z) {
    'use strict';
	ball = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(4, 10, 10);
	var material = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y - 5, z);

	ball.position.set(x, y, z);
	obj.add(mesh);

	scene.add(ball);

}

function createTableCenter(obj, x, y, z) {
    'use strict';
	var center = new THREE.Object3D();
	geometry = new THREE.SphereBufferGeometry(10, 20, 0, 0, 2*Math.PI, 0, 0.5 * Math.PI);
	var material = new THREE.MeshPhongMaterial({color: 0x787878, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	center.position.set(x, y, z);
	obj.add(mesh);

}

function addTableTop(obj, x, y, z) {
	
	'use strict';

	geometry = new THREE.CubeGeometry(60, 5, 40);
	var material = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);

}

function addTargetBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry( 2, 2, 45, 15 );
    var material = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: showWire});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addTargetTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(9, 2.5, 16, 30);
    var material = new THREE.MeshPhongMaterial({color: 0x8B0000, wireframe: showWire});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 2;
	obj.add(mesh);
}


function createTarget(x, y, z) {

	'use strict';
	var target = new THREE.Object3D();

    material = new THREE.MeshPhongMaterial({ color: 0x484848, wireframe: showWire});

	addTargetBase(target, 80, 15, 0);
	addTargetTop(target, 80, 47, 0);
	
	scene.add(target);

	target.position.x = x;
	target.position.y = y;
	target.position.z = z;

}


function createTable(x, y, z) {

	'use strict';
	table = new THREE.Object3D();
	material = new THREE.MeshPhongMaterial({ color: 0xFF4D4D, wireframe: showWire});

	addTableTop(table, 0, 0, 0);
	addTableWheel(table, -22, -1, -11);
	addTableWheel(table, -22, -1, 11);
	addTableWheel(table, 22, -1, 11);
	addTableWheel(table, 22, -1, -11);

	scene.add(table);

	table.position.x = x;
	table.position.y = y;
	table.position.z = z;

}

function createRobo(x, y, z) {
    'use strict';
	robo = new THREE.Object3D();

	createTable(0, -20, 0);
	createFullArm(0, 0, 0);

	robo.position.x = x;
	robo.position.y = y;
	robo.position.z = z;
	robo.add(table);
	robo.add(fullArm);

	scene.add(robo);
}

function createFullArm(x, y, z) {
    'use strict';
	fullArm = new THREE.Object3D();

    createArm(0, -10, 0);
    createTableCenter(fullArm, 0,-18,0);

	fullArm.position.x = x;
	fullArm.position.y = y;
	fullArm.position.z = z;
	fullArm.add(arm);
	fullArm.add(center);

	scene.add(fullArm);
}

function addForearm(obj, x, y, z) {

    'use strict';
	geometry = new THREE.CubeGeometry(4, 31, 4);
	var material = new THREE.MeshPhongMaterial({color: 0x787878, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y + 15, z);
	obj.add(mesh);

}

function addArm(obj, x, y, z) {

    'use strict';
	geometry = new THREE.CubeGeometry(31, 4, 4);
	var material = new THREE.MeshPhongMaterial({color: 0x787878, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x + 19, y + 34, z);
	obj.add(mesh);

}

function addJoint(obj, x, y, z) {
    'use strict';
    ball = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(4, 10, 10);
	var material = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y + 34, z);

	ball.position.set(x, y, z);
	obj.add(mesh);

	scene.add(ball);
}

function addHand(obj, x, y, z) {

    'use strict';
	geometry = new THREE.CubeGeometry(2, 12, 2);
	material = new THREE.MeshPhongMaterial({color: 0xf7f7f7, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x + 43, y + 34, z);
	obj.add(mesh);

}

function addFinger(obj, x, y, z) {

    'use strict';
	geometry = new THREE.CubeGeometry(7, 1, 1);
	material = new THREE.MeshPhongMaterial({color: 0xf7f7f7, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x + 47.5, y + 34, z);
	obj.add(mesh);

}

function createArm(x, y, z) {

    'use strict';
	arm = new THREE.Object3D();
	material = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: showWire});

	addForearm(arm, 0, 7, 0);
    addArm(arm, 0, 7, 0);
    addJoint(arm, 0, 7, 0);
	addJoint(arm, 38, 7, 0);
	addHand(arm, 0, 7, 0);
    addFinger(arm, 0, 11, 0);
	addFinger(arm, 0, 3, 0);

	arm.position.x = x;
	arm.position.y = y-5;
	arm.position.z = z;

	arm.rotation.x = 0;
	arm.rotation.y = 0;
	arm.rotation.z =0;
}

function onKeyDown(e) {
    'use strict';
	switch (e.keyCode) {
		//movement
		case 37: // left arrow
			controlLeft = true;
			break;
		case 38: // up arrow
			controlUp = true;
			break;
		case 39: //right arrow
			controlRight = true;
			break;
		case 40: // down arrow
			controlDown = true;
			break;
		//A
		case 65:
			controlA = true;
			break;
		//S
		case 83:
			controlS = true;
			break;
		//Q
		case 81:
			controlQ = true;
			break;
		//W
		case 87:
			controlW = true;
			break;
		//change camera
        case 49: //1
    		alterCamera(0,100,0);
    		break;
    	case 50: //2
    		alterCamera(0,0,100);
    		break;
		case 51: //3
    		alterCamera(130,0,0);
    		break;
		//wireframe 
    	case 52: //4
    		scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
                showWire = false;
			});
			break;
    }

}

function onKeyUp(e){
    'use strict';
	//Mainly used for movement breaks for now
	switch (e.keyCode){
		case 37: // left arrow
			controlLeft = false;
			break;
		case 38: // up arrow
			controlUp = false;
			break;
		case 39: //right arrow
			controlRight = false;
			break;
		case 40: // down arrow
			controlDown = false;
			break;
		//A
		case 65:
			controlA = false;
			break;
		//S
		case 83:
			controlS = false;
			break;
		//Q
		case 81:
			controlQ = false;
			break;
		//W
		case 87:
			controlW = false;
			break;
	}
}


/*Movement Functions*/

function rotateFullArmPositive() {
    'use strict';
	fullArm.rotation.y +=  1* Math.PI/180;
}

function rotateFullArmNegative() {
    'use strict';
	fullArm.rotation.y -=  1* Math.PI/180;
}

function rotateArmPositive() {
    'use strict';
    if (arm.rotation.z*(180/Math.PI)<90){
	   arm.rotation.z +=  1* Math.PI/180;
    }
}

function rotateArmNegative() {
    'use strict';
    if (arm.rotation.z*(180/Math.PI)>-90){
	   arm.rotation.z -=  1* Math.PI/180;
    }
}

function moveRight(){
    'use strict';
	robo.translateX(0.5);
}

function moveLeft(){
    'use strict';
	robo.translateX(-0.5);
}

function moveForward(){
    'use strict';
	robo.translateZ(-0.5);
}

function moveBackwards(){
    'use strict';
	robo.translateZ(0.5);
}

function checkMove(){
    'use strict';
	if(controlLeft) // left arrow
    	moveLeft();
	if(controlUp)
		moveForward();
	if(controlRight)
    	moveRight();
	if(controlDown)    		
		moveBackwards();
	if(controlA)
		rotateFullArmPositive();		
	if(controlS)
		rotateFullArmNegative();
	if(controlQ)
		rotateArmPositive();
	if(controlW)
		rotateArmNegative();
}


function createCamera() {

	'use strict';
	camera = new THREE.OrthographicCamera( window.innerWidth / - 7, window.innerWidth / 7, window.innerHeight / 7, window.innerHeight /  -7, -1000, 1000 );
	camera.position.set(0,100,0);
	camera.lookAt(scene.position);

}

function alterCamera(x,y,z) {
    'use strict';
	camera.position.set(x,y,z);
	camera.lookAt(scene.position);
}

function createScene() {

	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxesHelper(10)); 
	
	createRobo(0, 0, 0);
    createTarget(-30,-20,0);

}

function animate() {
    'use strict';
	//Checks for keyboard input for movement
	checkMove();
	//Renders Scene
	render();
	
	requestAnimationFrame(animate);
}

function init(){

	'use strict';
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
    renderer.setClearColor( 0x5c5353);
	createScene();
	createCamera();
    createLight();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);

}

function onResize(){

	'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

function render() {

	'use strict';
	renderer.render(scene, camera);
	
}