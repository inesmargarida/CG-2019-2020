/*global THREE*/




"use strict"
var renderer, scene, clock, wires = false;

//Textures
var pauseScreen = new THREE.TextureLoader().load('./textures/pause.jpg');
var ballTexture = new THREE.TextureLoader().load('./textures/lenna.png');
var squares = new THREE.TextureLoader().load('./textures/board.png');

var dice1 = new THREE.TextureLoader().load('./textures/1.png');
var dice2 = new THREE.TextureLoader().load('./textures/2.png');
var dice3 = new THREE.TextureLoader().load('./textures/3.png');
var dice4 = new THREE.TextureLoader().load('./textures/4.png');
var dice5 = new THREE.TextureLoader().load('./textures/5.png');
var dice6 = new THREE.TextureLoader().load('./textures/6.png');

var bump1 = new THREE.TextureLoader().load('./textures/bump1.png');
var bump2 = new THREE.TextureLoader().load('./textures/bump2.png');
var bump3 = new THREE.TextureLoader().load('./textures/bump3.png');
var bump4 = new THREE.TextureLoader().load('./textures/bump4.png');
var bump5 = new THREE.TextureLoader().load('./textures/bump5.png');
var bump6 = new THREE.TextureLoader().load('./textures/bump6.png');

var boardBump = new THREE.TextureLoader().load('./textures/wood.jpg');

var diceArray = [];

diceArray.push(new THREE.MeshPhongMaterial({wireframe: false, shininess: 80, map: dice1, bumpMap:bump1, specular: 0xeaeaea, color: 0xC7B692}));
diceArray.push(new THREE.MeshPhongMaterial({wireframe: false, shininess: 80, map: dice2, bumpMap:bump2, specular: 0xeaeaea, color: 0xC7B692}));
diceArray.push(new THREE.MeshPhongMaterial({wireframe: false, shininess: 80, map: dice3, bumpMap:bump3, specular: 0xeaeaea, color: 0xC7B692}));
diceArray.push(new THREE.MeshPhongMaterial({wireframe: false, shininess: 80, map: dice4, bumpMap:bump4, specular: 0xeaeaea, color: 0xC7B692}));
diceArray.push(new THREE.MeshPhongMaterial({wireframe: false, shininess: 80, map: dice5, bumpMap:bump5, specular: 0xeaeaea, color: 0xC7B692}));
diceArray.push(new THREE.MeshPhongMaterial({wireframe: false, shininess: 80, map: dice6, bumpMap:bump6, specular: 0xeaeaea, color: 0xC7B692}));

var diceBasic = [];
diceBasic.push(new THREE.MeshBasicMaterial({wireframe: false, map: dice1,  color: 0xC7B692}));
diceBasic.push(new THREE.MeshBasicMaterial({wireframe: false, map: dice2,  color: 0xC7B692}));
diceBasic.push(new THREE.MeshBasicMaterial({wireframe: false, map: dice3,  color: 0xC7B692}));
diceBasic.push(new THREE.MeshBasicMaterial({wireframe: false, map: dice4,  color: 0xC7B692}));
diceBasic.push(new THREE.MeshBasicMaterial({wireframe: false, map: dice5, color: 0xC7B692}));
diceBasic.push(new THREE.MeshBasicMaterial({wireframe: false, map: dice6,  color: 0xC7B692}));

var dicemats, chessmats, ballmats;
var currentMat = 1;

function createMaterials() {

    dicemats = new Array(2);
    dicemats[0] = diceArray;
    dicemats[1] = diceBasic;
    
    chessmats = new Array(2);
    chessmats[0] = new THREE.MeshPhongMaterial( {color: 0xffffff, wireframe: false, map: squares, bumpMap: boardBump});
    chessmats[1] = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: false, map: squares });

    ballmats = new Array(2);
    ballmats[0] = new THREE.MeshPhongMaterial( {wireframe: false, shininess: 80, map: ballTexture, specular: 0xeaeaea, color: 0xC7B692} );
    ballmats[1] = new THREE.MeshBasicMaterial( {wireframe: false, color: 0xC7B692, map: ballTexture} );
}



//Materials
var allMaterials = Array();
var ballmats, dicemats;

//HUD Variables
var nScene, nCam;
var pause;

//Show
var paused = false;

//objects
var floor, ball, dice;

//camaras
var camera = new Array(3);
var current_cam = 0;

//Light
var dirlight, point_light;

var width = 150, height = 70;
var aspectratio;
var ratio = 2.07;
var scale = 0.013;
var scale_width;
var scale_height;
var last_width;
var last_height;

class chesstable extends THREE.Object3D {

    constructor(a,b,c,x,y,z){

        super();
        this.geometry = new THREE.BoxGeometry(a,b,c);
        //this.geometry.dynamic = true;
        var texture = squares;

        this.material = chessmats[0];
        
        boardBump.wrapS = boardBump.wrapT = THREE.RepeatWrapping;
        boardBump.repeat.set(2, 2);

        this.material.bumpMap = boardBump;
        allMaterials.push(this.material);
        allMaterials.push(chessmats[1]);
        this.box = new THREE.Mesh( this.geometry, this.material );
        //this.box.dynamic = true;
        this.box.position.set(x,y,z);
        scene.add(this.box);

    }

}

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        
    
    var axes = new THREE.AxesHelper(50);
    axes.visible = true;
    this.add(axes);
    
    this.acceleration = -1.02;
    this.angle = 0;
    this.position.set(0,0,0);
    this.velocity = 0;
    this.addBall(0, 0, 0);
    scene.add(this);

    }

    addBall(x, y, z) {

        this.ballMaterial = ballmats[0]
        allMaterials.push(this.ballMaterial);~
        allMaterials.push(ballmats[1]);
        ballTexture.wrapS = ballTexture.wrapT = THREE.ClampToEdgeWrapping;

        var ballGeometry = new THREE.SphereGeometry(20, 20, 20);

        this.ballMesh = new THREE.Mesh(ballGeometry, this.ballMaterial);
       
        this.ballMesh.position.set(x, y, z);
        this.ballMesh.castShadow = true;

        this.add(this.ballMesh);
    }
    updatepos(timeDiff) {
        "use strict";        

        this.velocity += this.acceleration * timeDiff;

        if (this.velocity > 3) {
            this.velocity = 3;
        } else if (this.velocity <= 0) {
            this.velocity = 0;
        }

        var angleDiff = this.velocity * timeDiff;
        this.angle += angleDiff;
        this.angle %= 2 * Math.PI;

        this.rotateY(-1 * angleDiff);
        this.ballMesh.rotateX(angleDiff);

        this.position.x = 120 * Math.cos(this.angle);
        this.position.z = 120 * Math.sin(this.angle);
    }
}


class Dice extends THREE.Object3D {
    constructor(x, y, z) {
        super();

    var axes = new THREE.AxesHelper(50);
    axes.visible = true;
    this.add(axes);
    //this.position.set(x, y, z);
    this.addDice(x, y, z);
    this.receiveShadow = true;
    scene.add(this);
    }

    addDice(x, y, z) {

        allMaterials = allMaterials.concat(diceArray);
        allMaterials = allMaterials.concat(diceBasic);

        var diceGeometry = new THREE.CubeGeometry( 30, 30, 30, 1, 1, 1);

        this.diceMesh = new THREE.Mesh(diceGeometry, diceArray);
       
        this.diceMesh.position.set(x, y, z);
        
        this.diceMesh.rotation.z+= Math.PI/4;
        this.diceMesh.rotation.x+= Math.PI/4;
        
        this.diceMesh.castShadow = true;
        this.add(this.diceMesh);
    }
    updatepos(timeDiff) {    
        
        this.rotateY(timeDiff);
        
    }
}

//METER FLAGS !!!!!!!!!!!!!!!!!
//flags:
var matChange = false, current_camera = 0, dirOn = true, pntOn = true, restart = false, changedWires = false;

function onKeyDown(e) {

	switch (e.keyCode) {
       
		//Cameras
		case 53: //5
            current_camera = 0;
			break;
		case 54: //6
            current_camera = 1;
            break;
        case 55: //7
            current_camera = 2;
            break;
        
        case 68: //D
            dirOn = false;
            break;
            
        case 76: //L
            matChange = true;
            changedWires = true;
            break;
        case 80: //P
            pntOn = false
            break;
        case 82: //R
            restart = true;
            break;
        case 83: //S
            paused = !paused;
            pause.visible = !pause.visible;
            break;
        case 87:  //W
            wires = !wires;
            changedWires = true;
            break;
        case 66: //B
            if (!paused) 
                ball.acceleration = -ball.acceleration;
            break;
       
	}
}

function onoffwires() {
    var i;
    for (i = 0; i < allMaterials.length; i++) {
        allMaterials[i].wireframe = wires;
    }
}

function checkFlags() {
    if (matChange){
        dice.diceMesh.material = dicemats[currentMat];
        floor.box.material = chessmats[currentMat];
        ball.ballMesh.material = ballmats[currentMat];
        if (currentMat==1){
            currentMat = 0;
        }
        else{
            currentMat = 1;
        }
        matChange = false;
    }if(current_camera != current_cam){
        switch_camera(current_camera);
        current_cam = current_camera;
    }if(dirOn == false) {
        onOffDirLight();
        dirOn = true;
    }if(pntOn == false) {
        onOffPntLight();
        pntOn = true;
    }if(restart){
        if(paused)
            restartShow();
        restart = false;
    }if(changedWires){
        onoffwires();
        changedWires = false;
    }
}

function restartShow() { 

    ball.position.set(120, 0, 0);
    ball.velocity = 0;
    ball.ballMesh.position.set(0, 0, 0);
    ball.angle = 0;  
    ball.acceleration = -1.02;  
    ball.ballMesh.rotation.set(0,0,0);
    ball.rotation.set(0,0,0);
    
    dice.rotation.set(0,0,0);
    dice.diceMesh.position.set(0,0,0);
    
}



function createPauseScreen() {

    var geometry = new THREE.PlaneGeometry(25, 10, 0);
    
    var texture = pauseScreen;

    var material = new THREE.MeshBasicMaterial({map: texture});

    pause = new THREE.Mesh(geometry, material);

    pause.visible = false;

    pause.position.set(60, 20, 10);

}

/*Create HUD Using a Second Viewport*/
function addHUD() {

    nScene = new THREE.Scene();
    
    // Pause/Restart Screens
    createPauseScreen();

    // Camera
    if (window.innerWidth / window.innerHeight > ratio)
        nCam = new THREE.OrthographicCamera(window.innerWidth / scale_height, -window.innerWidth / scale_height, window.innerHeight / scale_height, -window.innerHeight / scale_height, 1, 100);
    else
        nCam = new THREE.OrthographicCamera(window.innerWidth / scale_width, -window.innerWidth / scale_width, window.innerHeight / scale_width, -window.innerHeight / scale_width, 1, 100);
    nScene.add(nCam);

    nCam.position.z = -50;
    nCam.lookAt(nScene.position);

    nScene.add(pause);

}

function createScene() {
    scene = new THREE.Scene();

    makeObjects();
}

function makeObjects() {
    floor = new chesstable(350,10,350,0,-30,0);
    ball = new Ball(0, 0, 0);
    dice = new Dice(0, 0, 0);
}


function createDirLight() { // VER SE INCIDE SOBRE UM ANGULO DIFERENTE DE ZERO RELATIVAMENTE A NORMAL DO TABULEIRO
    dirlight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirlight.position.set(700, 180, 200);
    dirlight.target.position.set( width/2, height/2, 0 );
    dirlight.target.updateMatrixWorld();
    scene.add(dirlight);
}

function createPointLight() {

	point_light = new THREE.PointLight(0xffffff, 2, 300, 2);

	point_light.position.set(0, 50, 0);
    point_light.castShadow = true; 

    scene.add(point_light);
}

function onOffDirLight() {
    dirlight.visible = !dirlight.visible;
}

function onOffPntLight() {
    point_light.visible = !point_light.visible;
}


function createLights() {
    createDirLight();    
    createPointLight();
}

function switch_camera(number) {
    current_cam = number;
}

function createCameras() {
    createOrtCamera();
    createOrtCamera2();
	createPerspCamera();
}

function createPerspCamera() {
    camera[0] = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 1, 1000 );
	camera[0].position.set(750, 180, 200);
	camera[0].lookAt( scene.position );
}

function createOrtCamera() {

	camera[1] = new THREE.OrthographicCamera( window.innerWidth / - 7, window.innerWidth / 7, window.innerHeight / 7, window.innerHeight /  -7, -1000, 1000 );
	camera[1].position.set(100,0,0);
	camera[1].lookAt(scene.position);
}

function createOrtCamera2() {

	camera[2] = new THREE.OrthographicCamera( window.innerWidth / - 4, window.innerWidth / 4, window.innerHeight / 4, window.innerHeight /  -4, -1000, 1000 );
	camera[2].position.set(0,100,0);
	camera[2].lookAt(scene.position);
}

function init() {
    
	renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
    renderer.setClearColor( 0x5c5353);

    scale_width = window.innerWidth * scale;
    scale_height = window.innerHeight * scale * ratio;
    
    createMaterials();
    createScene();
	createCameras();
    createLights();

    addHUD();

	window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    
    clock = new THREE.Clock();

}

function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (current_cam==0){
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera[0].aspect = window.innerWidth / window.innerHeight;
            camera[0].updateProjectionMatrix();
        } 
    }
    if (current_cam==1){
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera[1].aspect = window.innerWidth / window.innerHeight;
            camera[1].updateProjectionMatrix();
        } 
    }
    if (current_cam==2){
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera[2].aspect = window.innerWidth / window.innerHeight;
            camera[2].updateProjectionMatrix();
        } 
    }
    if (window.innerHeight > 0 && window.innerWidth > 0) {
           	nCam.aspect = window.innerWidth / window.innerHeight;
            nCam.updateProjectionMatrix();
    } 
}

function render() {

    renderer.clear();

	renderer.render(scene, camera[current_cam]);

    renderer.render(nScene, nCam);

}

function checkMove(pauseddelta) {

    var timeDiff = clock.getDelta() - pauseddelta ;

    ball.updatepos(timeDiff); 
    dice.updatepos(timeDiff); 

}

function animate() {

    var pauseddelta = 0;

    if(!paused) checkMove(pauseddelta);
    else {
        pauseddelta = clock.getDelta();
    }
    checkFlags();

    render();
    requestAnimationFrame(animate);
}
