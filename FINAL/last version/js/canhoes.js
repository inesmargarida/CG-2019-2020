/*global THREE*/
var parallelepiped, cylinder, fence, ball, center, table, cannon, balls, sphere;
var scene, renderer, clock;
var geometry, material, mesh;
var controlLeft, controlRight, controlUp, controlDown, controlSpace, controlE, controlQ, controlR, controlW;
var showWire = true, sphereAxesFlag = true;
var selectedBall;

var camera = new Array(3);
var active_camera = 0;
var currentCannon = "thirdcannon", selected_mesh;
var allballs = [] ;
var shootballs = [] ;
var shootPos = [];
var occupied = [];
var meshes = [];
var ballaxes  = [];

function createLight(){
    'use strict';
    var spot = new THREE.SpotLight(0xffffff);
    spot.position.set( 100, 1000, 100 );
    scene.add(spot);
    var spot2 = new THREE.SpotLight(0xffffff);
    spot2.position.set( 1000, 100, 100 );
    scene.add(spot2);
    var spot3 = new THREE.SpotLight(0xffffff);
    spot3.position.set( 100, 100, 1000 );
    scene.add(spot3);
}

function addWallParallel(obj, x, y, z) {
	parallelepiped = new THREE.Object3D();
	var geometry = new THREE.BoxGeometry( 5, 100, 150 );
	var material = new THREE.MeshPhongMaterial( {color: 0x9cb6ff, wireframe: showWire} );
	var parallelepiped = new THREE.Mesh( geometry, material );
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y + 42, z);
	parallelepiped.position.set(x, y, z);
	obj.add(mesh);

}

function addWallPerpendicular(obj, x, y, z) {
	parallelepiped = new THREE.Object3D();
	var geometry = new THREE.BoxGeometry( 150, 100, 5 );
	var material = new THREE.MeshPhongMaterial( {color: 0x9cb6ff, wireframe: showWire } );
	var parallelepiped = new THREE.Mesh( geometry, material );
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y + 42, z);
	parallelepiped.position.set(x, y, z);
	obj.add(mesh);
}

function addBall(obj, x, y, z){
    sphere = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry(5,10,10);
    var material = new THREE.MeshPhongMaterial( {color: 0x000000, wireframe: showWire } );
    var sphere = new THREE.Mesh( geometry, material);

    mesh = new THREE.Mesh( geometry, material);
    mesh.position.set( x, y, z);
    sphereAxes = new THREE.AxesHelper(10);
    ballaxes.push(sphereAxes);
    sphereAxes.visible = sphereAxesFlag;
    mesh.add(sphereAxes);
    //mesh.name = "ballsmesh";
    obj.add(mesh);
   	allballs.push(mesh);
    return sphere;
}

function addFirstBall(obj, x, y, z){
    sphere = new THREE.Object3D();
    var geometry = new THREE.SphereGeometry(5,10,10);
    var material = new THREE.MeshPhongMaterial( {color: 0x000000, wireframe: showWire } );
    var sphere = new THREE.Mesh( geometry, material);

    mesh = new THREE.Mesh( geometry, material);
    mesh.position.set( x, y, z);
    mesh.name = "firstball";
    sphereAxes = new THREE.AxesHelper(10);
    ballaxes.push(sphereAxes);
    sphereAxes.visible = sphereAxesFlag;
    mesh.add(sphereAxes);
    //mesh.name = "ballsmesh";
    obj.add(mesh);
    allballs.push(mesh);
    return sphere;
}

function createShootingBall(x,y,z) {
	'use strict';
	var shot = 0;
	var shootingball = new THREE.Object3D();
	selected_mesh = scene.getObjectByName(currentCannon);

	shootingball.velocity = THREE.Math.randFloat(0.5,1.5);
	shootingball.accelaration = 0;
	shootingball.direction = new THREE.Vector3(-1, 0, selected_mesh.rotation.y).normalize();
	shootingball.rotateOverItself = new THREE.Vector3(0, 0, Math.PI/2).normalize();
	shootingball.userData = { moving: true };

	var mesh = addBall(shootingball,0,0,0);

    meshes.push(mesh);
    shot += 1;
	scene.add(shootingball);

	shootingball.position.x = x+40;
	shootingball.position.y = y;
	shootingball.position.z = z;


	if(currentCannon == "firstcannon")
		shootingball.position.z = -45;
	else if(currentCannon == "secondcannon")
		shootingball.position.z = 0;
	shootballs.push(shootingball);
	allballs.push(shootingball);
	shootPos.push(shootingball.position);
	shootingball.rotateY(selected_mesh.rotation.y);
}

function createRandBalls(x,y,z){
    'use strict';
    var x1, z1;
	balls = new THREE.Object3D();
	material = new THREE.MeshPhongMaterial({ color: 0x8b0000, wireframe: showWire});
	balls.velocity = THREE.Math.randFloat(0);
	balls.direction = new THREE.Vector3(0, 0, 0).normalize();
	balls.userData = { moving: false };
	
    var i, j = 0, full = 0; // THREE.Math.randInt(5,12
    while (occupied.length <THREE.Math.randInt(5,12)) {
    	full = 0;
        x1 = THREE.Math.randInt(8,148);
        z1 = THREE.Math.randInt(65,-65);
        if(occupied.length == 0) {
        	var ballcurrent = addFirstBall(balls, x1-150, -25, z1);
            occupied[0]=[x1,z1,ballcurrent];
            selectedBall = occupied[0];
        }
        for (j = 0; j < occupied.length; j++) {
            if ( Math.sqrt(Math.pow((x1 - occupied[j][0]),2) + Math.pow((z1 - occupied[j][1]),2)) < 20) {
               	full = 1;
            }
        }
        if( full == 0) {
	    	addBall(balls, x1-150, -25, z1);
	    	occupied.push([x1,z1]);
	    }

    }
    scene.add(balls);
    occupied = [];

}


function createFence(x,y,z){

	'use strict';
	fence = new THREE.Object3D();
	material = new THREE.MeshPhongMaterial({ color: 0x8b0000, wireframe: showWire});

	addWallParallel(fence, 0, -22, 0);
	addWallPerpendicular(fence, 77, -22, 72.5);
	addWallPerpendicular(fence, 77, -22, -72.5);
    //addBall(fence,148,-25,-65);

	scene.add(fence);

	fence.position.x = x;
	fence.position.y = y;
	fence.position.z = z;

}


function createTableCenter(obj, x, y, z) {
    'use strict';
	var center = new THREE.Object3D();
	geometry = new THREE.SphereBufferGeometry(16, 10, 0, 0, 2*Math.PI, 0, 0.5 * Math.PI);
	var material = new THREE.MeshPhongMaterial({color: 0x404040, wireframe: showWire});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	center.position.set(x, y, z);
	obj.add(mesh);

}


function createCylinder(obj, x,y,z, cylnumber) {

	var geometry = new THREE.CylinderGeometry( 5, 7, 70, 32);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -20, 0 ));
	geometry.rotateZ(-Math.PI * 0.5)
	var material = new THREE.MeshPhongMaterial( {color: 0x404040,  wireframe: showWire} );
	var cylinder = new THREE.Mesh( geometry, material );
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x + 20, y, z);

	if(cylnumber == 1)
		mesh.name = "firstcannon";
	else if(cylnumber == 2)
		mesh.name = "secondcannon";
	else if(cylnumber == 3)
		mesh.name = "thirdcannon";


	obj.add(mesh);

}

function createCannon(x, y, z, cylnumber) {
    'use strict';
	cannon = new THREE.Object3D();

	createTableCenter(cannon, 4,-13,0);
	createCylinder(cannon,-14,-3.9,0, cylnumber);

	cannon.position.x = x;
	cannon.position.y = y-20; // ---> se bolas disparadas nao forem para rolar pelo chao y = y
	cannon.position.z = z;
	cannon.add(center);
	cannon.add(cylinder);

	scene.add(cannon);
}

function onKeyDown(e) {
    'use strict';
	switch (e.keyCode) {
		//movement
		case 32: // space bar
			createShootingBall(90, -24.2, 45); // --> se bolas disparadas nao forem para rolar pelo chao y = -4.2
			controlSpace = true;
			break;
		case 37: // left arrow
			controlLeft = true;
			break;
		case 39: //right arrow
			controlRight = true;
			break;
		//E
		case 69:
			controlE = true;
			break;
		//Q
		case 81:
			controlQ = true;
			break;
		case 82:
			controlR = true;
			break;
		//W
		case 87:
			controlW = true;
			break;
		//change camera
        case 49: //1
    		alterCamera(0);
    		break;
    	case 50: //2
    		alterCamera(1);
    		break;
		case 51: //3
    		alterCamera(2); // deve ser 2 quando estiver feita
    		break;
		//wireframe
    	case 52: //4
    		scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
                showWire = !showWire;
			});
			break;
    }

}

function onKeyUp(e){
    'use strict';
	//Mainly used for movement breaks for now
	switch (e.keyCode){
		case 32: // space bar
			//controlSpace = false;
			break;
		case 37: // left arrow
			controlLeft = false;
			break;
		case 39: //right arrow
			controlRight = false;
			break;
		//E
		case 69:
			controlE = false;
			break;
		//Q
		case 81:
			controlQ = false;
			break;
		case 82:
			controlR = false;
			break;
		//W
		case 87:
			controlW = false;
			break;

	}
}


/*Movement Functions*/

function changeAngleRight(){
	'use strict';
	selected_mesh = scene.getObjectByName(currentCannon);
	if (selected_mesh.rotation.y*(180/Math.PI)<50){
		selected_mesh.rotation.y +=  1* Math.PI/180;
	 }
}

function changeAngleLeft(){
	'use strict';
	selected_mesh = scene.getObjectByName(currentCannon);
	if (selected_mesh.rotation.y*(180/Math.PI)>-50){
		selected_mesh.rotation.y -=  1* Math.PI/180;
	 }
}


function checkMove(){
    'use strict';
    if(controlSpace){
		//shootballs.forEach(shootBall);
		;
	}
	if(controlLeft) // left arrow
		changeAngleLeft();
	if(controlRight)
		changeAngleRight();
	if(controlE)
		currentCannon = "firstcannon";
		selectCannon(currentCannon);
	if(controlQ)
		currentCannon = "secondcannon";
		selectCannon(currentCannon);
	if(controlW)
		currentCannon = "thirdcannon";
		selectCannon(currentCannon);
	if(controlR) {

		if(sphereAxesFlag == true) {
			ballaxes.forEach(function(item,index){
		        var m = ballaxes[index];
		        m.visible = false;
			})
			sphereAxesFlag = false;

		}
		else {
			ballaxes.forEach(function(item,index){
		        var m = ballaxes[index];
		        m.visible = true;
			})
			sphereAxesFlag = true;
		}
	}
}


function selectCannon(cannonname) {

	var selected_mesh;

	if(cannonname=="firstcannon") {
		selected_mesh = scene.getObjectByName("firstcannon");
		selected_mesh.material.color.setHex(0xff0000);
		selected_mesh = scene.getObjectByName("secondcannon");
		selected_mesh.material.color.setHex(0x404040);
		selected_mesh = scene.getObjectByName("thirdcannon");
		selected_mesh.material.color.setHex(0x404040);
	}
	else if(cannonname=="secondcannon") {
		selected_mesh = scene.getObjectByName("firstcannon");
		selected_mesh.material.color.setHex(0x404040);
		selected_mesh = scene.getObjectByName("secondcannon");
		selected_mesh.material.color.setHex(0xff0000);
		selected_mesh = scene.getObjectByName("thirdcannon");
		selected_mesh.material.color.setHex(0x404040);
	}
	else {
		selected_mesh = scene.getObjectByName("firstcannon");
		selected_mesh.material.color.setHex(0x404040);
		selected_mesh = scene.getObjectByName("secondcannon");
		selected_mesh.material.color.setHex(0x404040);
		selected_mesh = scene.getObjectByName("thirdcannon");
		selected_mesh.material.color.setHex(0xff0000);
	}

}


function ballsmov(){
	allballs.forEach(function (item,index){ // devia ser allballs
		if (item.userData.moving) {
			item.position.add(item.direction.clone().multiplyScalar(item.velocity));
			item.rotateOnAxis(item.rotateOverItself, 0.1);
		}
	})

}

function updatePos(){
    shootballs.forEach(function (item, index){
        //console.log(item.position);
        shootPos[index]=item.position;   
    })
    //console.log(shootPos);
    checkCol();
}

function checkCol(){
    allballs.forEach(function (item,index){
        if (item.position.x <= -141.3){
            wallCol(item, -1,1,1,-1,1); 
        }
        else if (item.position.z >= 66 && item.position.x < 20){
            wallCol(item,1,1,-1,1,-1);
        }
        else if (item.position.z <= -67 && item.position.x < 20){
            wallCol(item, 1,1,-1,1,-1);
        }
         allballs.forEach(function (item2,index2){
        	if(((typeof item.direction != 'undefined' && typeof item2.direction != 'undefined')
        	|| (typeof item.direction != 'undefined' && typeof item2.direction == 'undefined')) && ballsdist(item.position,item2.position) != 0 
        		&& ballsdist(item.position,item2.position) < 10) {
        		ballCol(item2,item);
        	}

        })
    })
}

function ballsdist(vector1, vector2) {
	var dx = vector1.x - vector2.x;
	var dy = vector1.y - (vector2.y);
	var dz = vector1.z - vector2.z;

	return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

function wallCol(ball, x,y,z, a, b){
	ball.direction.x *= x;
	ball.direction.y *= y;
	ball.direction.z *= z;
	ball.rotateOverItself.z *= (a);
	ball.rotateOverItself.y *= (b);
	ball.rotation.y += 2*Math.PI-2*ball.rotation.y;
	ball.userData.moving = true;

}

function ballCol(item, item2){
	var auxvel, auxrot, auxit;
	console.log( item.velocity + "wsd" + item2.velocity)

	if(typeof item2.velocity == 'undefined' || isNaN(item2.velocity) || item2.velocity == 0) {
		console.log("bola parada")
		item2.direction = item.direction;
		item2.velocity = item.velocity;
		item.userData.moving = false;
		item.velocity = 0;
		item2.userData.moving = true;
		item2.rotateOverItself = item.rotateOverItself;
		item2.rotation.y = item.rotation.y;
	}
	if( typeof item.velocity == 'undefined'  || isNaN(item.velocity) ||  item.velocity == 0 ) {
		console.log("other bola parada")
		item.direction = item2.direction;
		item.velocity = item2.velocity;
		item2.userData.moving = false;
		item2.velocity = 0;
		item.userData.moving = true;
		item.rotateOverItself = item2.rotateOverItself;
		item.rotation.y = item2.rotation.y;
	}
	else {
		console.log("bolaa a mover")
		auxvel = item2.velocity;
		item2.direction.x *= -1;
		item2.velocity = item.velocity;
		item.velocity = auxvel;
		item.userData.moving = true;
		item2.userData.moving = true;
		item2.rotation.y = item.rotation.y;
		item.rotateOverItself.z *= (-1);
		item.rotateOverItself.z *= (-1);
		item2.rotateOverItself.z *= (-1);
		//item.rotation.y = auxrot;
		//item2.rotateOverItself = item.rotateOverItself;
		//item.rotateOverItself = auxit;
	}

}


function createCamera() {

	'use strict';
	camera[0] = new THREE.OrthographicCamera( window.innerWidth / - 7, window.innerWidth / 7, window.innerHeight / 7, window.innerHeight /  -7, -1000, 1000 );
	camera[0].position.set(0,100,0);
	camera[0].lookAt(scene.position);

}

function createPerspCamera() {
	'use strict';
	camera[1] = new THREE.PerspectiveCamera(22, window.innerWidth / window.innerHeight, 1, 1000 );
	camera[1].position.set(520, 180, 70);
	camera[1].lookAt( scene.position );

}

function createMotionCamera() {
	'use strict';
	camera[2] = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	selectedBall = scene.getObjectByName("firstball");
	var y = -10;
    var x = -20;
    if ((selectedBall.position.z) < 0){
        y = 10;
        x = -20;
    }
	camera[2].position.set(x, 7, y);
	camera[2].lookAt(selectedBall.position);
	selectedBall.add(camera[2]);
}


function alterCamera(number) {
	active_camera = number;
}

function createScene() {

	'use strict';

	scene = new THREE.Scene();

	createCannon(120, 0, -45, 1);
	createCannon(120, 0, 0, 2);
	createCannon(120, 0, 45, 3);
	createFence(-150,0,0);
    createRandBalls(-150,0,0);

}

function animate() {
	'use strict';
	var timeDiff = clock.getDelta();

    updatePos();
    ballsmov();
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
	createPerspCamera();
	createMotionCamera();
    createLight();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);

	clock = new THREE.Clock();

	var interval = setInterval(function() {
        allballs.forEach(function(ball) {
            ball.velocity *= 0.9;
		})
	
    }, 10000)

}

function onResize() {
    "use strict";
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    var width = window.innerWidth;
    var height = window.innerHeight;

    resizeCameraOrtographic(0, width, height);
    resizeCameraPerspective(1);
    resizeCameraPerspective(2);
}

function resizeCameraOrtographic(index, width, height) {
    "use strict";

	camera[index].left = - width / 2;
	camera[index].right = width / 2;
	camera[index].top = height / 2;
	camera[index].bottom = - height / 2;
    camera[index].updateProjectionMatrix();

}

function resizeCameraPerspective(index) {
    "use strict";
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    var width = window.innerWidth;
    var height = window.innerHeight;

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera[index].aspect = width / height;
        camera[index].updateProjectionMatrix();
	}
}
function render() {

	'use strict';
	renderer.render(scene, camera[active_camera]);
}