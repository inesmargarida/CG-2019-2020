/*global THREE*/
"use strict"
var renderer, scene;

//objects
var wall, floor, painting, sculpt, pedestal, lamp1, lamp2, lamp3, lamp4;

//materials
var currentmaterials, currentshading ;
var wallmats, paintingmats, cilindmats, paralelmats, paralelframemats,boardmats, icomats, pedmats, lampmats, conemats;
var wallmeshes = new Array() , cilindermeshes = new Array() ,  parallelepipedmeshes = new Array();
var parallelepipedframemeshes = new Array(), boardmeshes = new Array(), icomeshes = new Array(), pedmeshes = new Array(), lampmeshes = new Array(), conemeshes = new Array();

//camaras
var camera = new Array(2);
var current_cam = 0;

//Light
var dirlight;
var spots = new Array(4);
var n_spots = 0;

var width = 150, height = 70;
var aspectratio;
var ratio = 2.07;
var scale = 0.013;
var scale_width;
var scale_height;
var last_width;
var last_height;

// different materials
function createMaterials() {

    wallmats = new Array(3);
    wallmats[0] = new THREE.MeshBasicMaterial( {color: 0xC7B692, wireframe: false });
    wallmats[1] = new THREE.MeshLambertMaterial( {color: 0xC7B692, wireframe: false });
    wallmats[2] = new THREE.MeshPhongMaterial( {color: 0xC7B692, wireframe: false , shininess: 10});

    paintingmats = new Array(3);
    paintingmats[0] = new THREE.MeshBasicMaterial( { wireframe: false });
    paintingmats[1] = new THREE.MeshLambertMaterial( { wireframe: false });
    paintingmats[2] = new THREE.MeshPhongMaterial( { wireframe: false, shininess: 5  });

    paralelmats = new Array(3);
    paralelmats[0] = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false });
    paralelmats[1] = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: false });
    paralelmats[2] = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: false, shininess: 5  });

    cilindmats = new Array(3);
    cilindmats[0] = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false });
    cilindmats[1] = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false });
    cilindmats[2] = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false, shininess: 5 });

    paralelframemats = new Array(3);
    paralelframemats[0] = new THREE.MeshBasicMaterial( { color: 0x7f0000, wireframe: false });
    paralelframemats[1] = new THREE.MeshLambertMaterial( { color: 0x7f0000, wireframe: false });
    paralelframemats[2] = new THREE.MeshPhongMaterial( { color: 0x7f0000, wireframe: false, shininess: 10 });

    boardmats = new Array(3);
    boardmats[0] = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: false });
    boardmats[1] = new THREE.MeshLambertMaterial( { color: 0x404040, wireframe: false });
    boardmats[2] = new THREE.MeshPhongMaterial( { color: 0x404040, wireframe: false, shininess: 5  });

    icomats = new Array(3);
    icomats[0] = new THREE.MeshBasicMaterial( { color: 0x33FFC0, wireframe: false});
    icomats[1] = new THREE.MeshLambertMaterial( { color: 0x33FFC0, wireframe: false });
    icomats[2] = new THREE.MeshPhongMaterial( { color: 0x33FFC0, wireframe: false, shininess: 100 });

    pedmats = new Array(3);
    pedmats[0] = new THREE.MeshBasicMaterial( { color: 0x6E6059, wireframe: false });
    pedmats[1] = new THREE.MeshLambertMaterial( { color: 0x6E6059, wireframe: false });
    pedmats[2] = new THREE.MeshPhongMaterial( { color: 0x6E6059, wireframe: false, shininess: 50});

    lampmats = new Array(3);
    lampmats[0] = new THREE.MeshBasicMaterial( { color: 0xffff1a, wireframe: false, opacity: 1, transparent: true});
    lampmats[1] = new THREE.MeshLambertMaterial( { color: 0xffff1a, wireframe: false, opacity: 1, transparent: true});
    lampmats[2] = new THREE.MeshPhongMaterial( { color: 0xffff1a, wireframe: false, opacity: 1, transparent: true, shininess: 50});

    conemats = new Array(3);
    conemats[0] = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false });
    conemats[1] = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: false });
    conemats[2] = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: false, shininess: 50});

    currentmaterials = 2
    currentshading = 2;
}

class Entity extends THREE.Object3D {

    constructor() {
        super();
    }

    myType() { return "entity"; }

    /*changeMaterial() {

        if (objectsgroup.children[0].material == 0) {
            objectsgroup.children[0].changeChildMaterial(0);
        }
        else {
           objectsgroup.children[0].changeChildMaterial(2);
        }
    }*/

}

class Sculpture extends Entity{
    constructor(x,y,z){
        super();

        this.position.set(x,y,z);
        this.addCilinder(0,0,0,15, 15, 40);
        this.addCilinder(0,25,0, 1, 1, 11);
        this.addIcosaedron(0,50,0);

    
    }
    addIcosaedron(x,y,z) {
        var t = ( 1 + Math.sqrt( 5 ) ) / 2;

        var vertices = [
	     -1, t+5, 0, 	   1, t+2, 0, 	- 2, - t, 0, 	1, - t -5, 0,
		 0, - 2, t, 	0, 1, t,	0, - 1, - t, 	0, 2, - t,
		 t+1, 0, - 1, 	t+1, 0, 1, 	- t-1, 0, - 1, 	- t, 0, 2
	    ];

        
        var indices = [
            0, 11, 5, 	0, 5, 1, 	0, 1, 7, 	0, 7, 10, 	0, 10, 11,
		 1, 5, 9, 	5, 11, 4,	11, 10, 2,	10, 7, 6,	7, 1, 8,
		 3, 9, 4, 	3, 4, 2,	3, 2, 6,	3, 6, 8,	3, 8, 9,
		 4, 9, 5, 	2, 4, 11,	6, 2, 10,	8, 6, 7,	9, 8, 1
        ];

        var geometry = new THREE.PolyhedronGeometry( vertices, indices, 20, 0 );
        var material = icomats[2];
        var icosaedron = new THREE.Mesh( geometry, material );
        icomeshes.push(icosaedron);
        icosaedron.position.set(x, y, z);
        this.add(icosaedron);
    }
    addCilinder(x,y,z, x1, y1, z1) {
        var cilinderMaterialIco = pedmats[2];
        var cilinderGeometry = new THREE.CylinderGeometry( x1, y1, z1, 12);
        var cilinderMesh = new THREE.Mesh(cilinderGeometry, cilinderMaterialIco);
        pedmeshes.push(cilinderMesh);
        cilinderMesh.position.set(x, y, z);
        this.add(cilinderMesh);
    }


}


class Wall extends Entity {
    constructor(a,b,c,x,y,z){
        super();
        this.geometry = new THREE.BoxGeometry(a,b,c);
        //this.geometry.dynamic = true;
        this.material = wallmats[2];
        this.box = new THREE.Mesh( this.geometry, this.material );
        wallmeshes.push(this.box)
        //this.box.dynamic = true;
        this.box.position.set(x,y,z);
        scene.add(this.box);

    }

}

class Painting extends Entity {
    constructor(x, y, z) {
        super();
    
        var i, j;
        for(i = -4; i < 3; i++) 
            for(j = -6; j < 8; j++) 
                this.addParallelepiped(0, i*7.5 + 3.75, j*7.5 - 3.75, 2, 6, 6, 0);

        for(i = -3; i < 4; i++)
            for(j = -6; j < 7; j++)
                this.addCilinder(0.5, i*7.5, j*7.5);

        this.addBoard(0,-4,1, 0, 51, 100);
        this.addFrame(0,-4,1, 0, 50, 100);
        
        this.material = paintingmats[2];
        
        this.position.set(x,y,z);

    }
    
    addCilinder(x,y,z) {
    
        var cilinderMaterial = cilindmats[2];
        var cilinderGeometry = new THREE.CylinderGeometry( 1.25, 1.25, 1.25, 12);
        var cilinderMesh = new THREE.Mesh(cilinderGeometry, cilinderMaterial);
        cilindermeshes.push(cilinderMesh);
        cilinderMesh.position.set(x, y, z);
        cilinderMesh.rotateZ(Math.PI/2);
        this.add(cilinderMesh);

    }
    
    addParallelepiped(x,y,z, x1, y1, z1, type) {
    
        var ParallelepipedMaterial = paralelmats[2];
        var ParallelepipedGeometry = new THREE.BoxGeometry(x1,y1,z1);
        var ParallelepipedMesh = new THREE.Mesh(ParallelepipedGeometry, ParallelepipedMaterial);
        parallelepipedmeshes.push(ParallelepipedMesh);
        if( type == 1 ) { // frame
            var ParallelepipedMaterialFrame = paralelframemats[2];
            ParallelepipedMesh.material = ParallelepipedMaterialFrame;
            parallelepipedframemeshes.push(ParallelepipedMesh);
        }
        ParallelepipedMesh.position.set(x, y, z);
        this.add(ParallelepipedMesh);


    }

    addBoard(x,y,z, x1, y1, z1) {
    
        var ParallelepipedMaterialBoard = boardmats[2];
        var ParallelepipedGeometry = new THREE.BoxGeometry(x1,y1,z1);
        var ParallelepipedMesh = new THREE.Mesh(ParallelepipedGeometry, ParallelepipedMaterialBoard);
        boardmeshes.push(ParallelepipedMesh);
        ParallelepipedMesh.position.set(x, y, z);
        this.add(ParallelepipedMesh);
    }

    addFrame(x,y,z, x1, y1, z1) {

        this.addParallelepiped(x+15, y+28, z,x1+10, 5, z1+5, 1);
        this.addParallelepiped(x+15, y-25, z,x1+10, 5, z1+5, 1);
        this.addParallelepiped(x+15, y, z-50,x1+10, 55, 5, 1);
        this.addParallelepiped(x+15, y, z+50,x1+10, 55, 5, 1);
        
    }

}

class Lamp extends Entity {
    constructor(x, y, z) {
        super();

        this.addCone(0, 0, 0)
        this.addLamp(0, 22 ,0);

        this.position.set(x, y, z);
    }


    addCone(x, y, z) {

        var coneMaterial = conemats[2];
        var coneGeometry = new THREE.ConeGeometry( 5, 60, 32);
        var coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
        conemeshes.push(coneMesh);
        coneMesh.position.set(x, y, z);
        this.add(coneMesh);
    }

    addLamp(x, y, z) {

        var lampMaterial = lampmats[2];
        var lampGeometry = new THREE.SphereGeometry(8, 32, 24, 0, Math.PI * 2, 0, Math.PI/2);
        var lampMesh = new THREE.Mesh(lampGeometry, lampMaterial);
        lampmeshes.push(lampMesh);
        lampMesh.position.set(x, y, z);
        this.add(lampMesh);
    }
}

function onKeyDown(e) {

	switch (e.keyCode) {
        case 49: //1
            onOffSpotLight(1);
            break;
        case 50: //2
            onOffSpotLight(2);
            break;
        case 51: //3
            onOffSpotLight(3);
            break;
        case 52: //4
            onOffSpotLight(4);
            break;
		//Cameras
		case 53: //5
			switch_camera(0);
			break;
		case 54: //6
			switch_camera(1);
			break;
        case 69: //E
            switchShading();
            break;
        case 81: //Q
            onOffDirLight();
            break;
        case 87: //W
            switchLight();
            break;

	}
}

function onKeyUp(e) {
  
}

function createScene() {
    scene = new THREE.Scene();

    createMaterials();
    makeObjects();
}

function makeObjects() {
    wall = new Wall(10,110,250,0,0,0);
    floor = new Wall(110,10,250,45,-55,0);
    sculpt = new Sculpture(50,-30,-60);
    scene.add(sculpt);
    painting = new Painting(5,0,50);
    scene.add(painting);
    lamp1 =  new Lamp(40, -25, -10);
    scene.add(lamp1);
    lamp2 =  new Lamp(40, -25, 110);
    scene.add(lamp2);
    lamp3 =  new Lamp(80, -25, -30);
    scene.add(lamp3);
    lamp4 =  new Lamp(80, -25, -90);
    scene.add(lamp4);
}

function createSpotLight(x,y,z, obj){
    var spot = new THREE.SpotLight(0xffffff, 1.5, 90, Math.PI/2, 0, 1);
    spot.position.set(x,y,z);
    spot.target = obj;
    spot.castShadow = true;
    spot.shadow.camera.near = 0;
    spot.shadow.camera.far = 100;
    spot.shadow.mapSize.width = 4096;
    spot.shadow.mapSize.height = 4096;
    spots[n_spots] = spot;
    n_spots ++;
    //spot.target.position.set(a,b,c);
    scene.add( spot.target );
    scene.add(spot);
    
}

function createDirLight() {
    dirlight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirlight.position.set(700, 180, 200);
    dirlight.target.position.set( width/2, height/2, 0 );
    dirlight.target.updateMatrixWorld();
    scene.add(dirlight);
}

function onOffDirLight() {
    dirlight.visible = !dirlight.visible;
}

function onOffSpotLight(n) {
    spots[n-1].visible = !spots[n-1].visible;
}


function switchLight() {  

    if( currentmaterials == 2 ||  currentmaterials == 1 ) { // material não basic altera para basic

        for (var i = 0; i < wallmeshes.length; i++) {
            wallmeshes[i].material = wallmats[0];
        }
        for (var i = 0; i < cilindermeshes.length; i++) {
            cilindermeshes[i].material = cilindmats[0];
        }
        for (var i = 0; i < parallelepipedmeshes.length; i++) {
            parallelepipedmeshes[i].material = paralelmats[0];
        }
        for (var i = 0; i < parallelepipedframemeshes.length; i++) {
            parallelepipedframemeshes[i].material = paralelframemats[0];
        }
        for (var i = 0; i < boardmeshes.length; i++) {
            boardmeshes[i].material = boardmats[0];    
        }
        for (var i = 0; i < icomeshes.length; i++) {
            icomeshes[i].material = icomats[0];
        }
        for (var i = 0; i < pedmeshes.length; i++) {
            pedmeshes[i].material = pedmats[0];
        }
        for (var i = 0; i < lampmeshes.length; i++) {
            lampmeshes[i].material = lampmats[0];
        }
        for (var i = 0; i < conemeshes.length; i++) {
            conemeshes[i].material = conemats[0];
        }
        currentmaterials = 0;

    }

    else if (currentmaterials == 0) { // quando está basic 

        if( currentshading == 2) { // muda para phong
            for (var i = 0; i < wallmeshes.length; i++) {
                wallmeshes[i].material = wallmats[2];
            }
            for (var i = 0; i < cilindermeshes.length; i++) {
                cilindermeshes[i].material = cilindmats[2];
            }
            for (var i = 0; i < parallelepipedmeshes.length; i++) {
                parallelepipedmeshes[i].material = paralelmats[2];
            }
            for (var i = 0; i < parallelepipedframemeshes.length; i++) {
                parallelepipedframemeshes[i].material = paralelframemats[2];
            }
            for (var i = 0; i < boardmeshes.length; i++) {
                boardmeshes[i].material = boardmats[2];    
            }
            for (var i = 0; i < icomeshes.length; i++) {
                icomeshes[i].material = icomats[2];
            }
            for (var i = 0; i < pedmeshes.length; i++) {
                pedmeshes[i].material = pedmats[2];
            }
            for (var i = 0; i < lampmeshes.length; i++) {
                lampmeshes[i].material = lampmats[2];
            }
            for (var i = 0; i < conemeshes.length; i++) {
                conemeshes[i].material = conemats[2];
            }
            currentmaterials = 2;
            currentshading = 2;
        }
        else { // muda para lambert
            
            for (var i = 0; i < wallmeshes.length; i++) {
                wallmeshes[i].material = wallmats[1];
            }
            for (var i = 0; i < cilindermeshes.length; i++) {
                cilindermeshes[i].material = cilindmats[1];
            }
            for (var i = 0; i < parallelepipedmeshes.length; i++) {
                parallelepipedmeshes[i].material = paralelmats[1];
            }
            for (var i = 0; i < parallelepipedframemeshes.length; i++) {
                parallelepipedframemeshes[i].material = paralelframemats[1];
            }
            for (var i = 0; i < boardmeshes.length; i++) {
                boardmeshes[i].material = boardmats[1];    
            }
            for (var i = 0; i < icomeshes.length; i++) {
                icomeshes[i].material = icomats[1];
            }
            for (var i = 0; i < pedmeshes.length; i++) {
                pedmeshes[i].material = pedmats[1];
            }
            for (var i = 0; i < lampmeshes.length; i++) {
                lampmeshes[i].material = lampmats[1];
            }
            for (var i = 0; i < conemeshes.length; i++) {
                conemeshes[i].material = conemats[1];
            }
            currentmaterials = 1;
            currentshading = 1;
        }
    }
   
}

function switchShading() {  

    if( currentmaterials == 2 ) { // material não basic altera para basic

        for (var i = 0; i < wallmeshes.length; i++) {
            wallmeshes[i].material = wallmats[1];
        }
        for (var i = 0; i < cilindermeshes.length; i++) {
            cilindermeshes[i].material = cilindmats[1];
        }
        for (var i = 0; i < parallelepipedmeshes.length; i++) {
            parallelepipedmeshes[i].material = paralelmats[1];
        }
        for (var i = 0; i < parallelepipedframemeshes.length; i++) {
            parallelepipedframemeshes[i].material = paralelframemats[1];
        }
        for (var i = 0; i < boardmeshes.length; i++) {
            boardmeshes[i].material = boardmats[1];    
        }
        for (var i = 0; i < icomeshes.length; i++) {
            icomeshes[i].material = icomats[1];
        }
        for (var i = 0; i < pedmeshes.length; i++) {
            pedmeshes[i].material = pedmats[1];
        }
        for (var i = 0; i < lampmeshes.length; i++) {
            lampmeshes[i].material = lampmats[1];
        }
        for (var i = 0; i < conemeshes.length; i++) {
            conemeshes[i].material = conemats[1];
        }
        currentmaterials = 1;
        currentshading = 1;

    }

    else if (currentmaterials == 1) { // quando está basic muda para phong
        for (var i = 0; i < wallmeshes.length; i++) {
            wallmeshes[i].material = wallmats[2];
        }
        for (var i = 0; i < cilindermeshes.length; i++) {
            cilindermeshes[i].material = cilindmats[2];
        }
        for (var i = 0; i < parallelepipedmeshes.length; i++) {
            parallelepipedmeshes[i].material = paralelmats[2];
        }
        for (var i = 0; i < parallelepipedframemeshes.length; i++) {
            parallelepipedframemeshes[i].material = paralelframemats[2];
        }
        for (var i = 0; i < boardmeshes.length; i++) {
            boardmeshes[i].material = boardmats[2];    
        }
        for (var i = 0; i < icomeshes.length; i++) {
            icomeshes[i].material = icomats[2];
        }
        for (var i = 0; i < pedmeshes.length; i++) {
            pedmeshes[i].material = pedmats[2];
        }
        currentmaterials = 2;
        currentshading = 2;
    }
   
}

function createLights() {
    createDirLight();
    createSpotLight(40, 35, 110, painting);
    createSpotLight(40, 35, -10, painting);
    createSpotLight(75,35,-30, sculpt);
    createSpotLight(75,35,-90, sculpt);
    
    
}

function switch_camera(number) {
    current_cam = number;
}

function createCameras() {
	createOrtCamera();
	createPerspCamera();
}

function createPerspCamera() {
    camera[0] = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 1, 1000 );
	camera[0].position.set(700, 180, 200);
	camera[0].lookAt( scene.position );
}

function createOrtCamera() {

	camera[1] = new THREE.OrthographicCamera( window.innerWidth / - 7, window.innerWidth / 7, window.innerHeight / 7, window.innerHeight /  -7, -1000, 1000 );
	camera[1].position.set(100,0,0);
	camera[1].lookAt(scene.position);
}

function init() {
    
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
    renderer.setClearColor( 0x5c5353);
    
    createScene();
	createCameras();
    createLights();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);

}

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera[0].aspect = window.innerWidth / window.innerHeight;
        camera[0].updateProjectionMatrix();
    }
}

function render() {

	renderer.render(scene, camera[current_cam]);
}

function animate() {

    render();
    requestAnimationFrame(animate);
}
