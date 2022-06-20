import Two from "./two.js";

const TRANSITION_WIDTH = 200;
const TRANSITION_HEIGHT = 125;
const DISTANCE_SQUARED_THRESHOLD = 60;
const LINE_WIDTH = 1;
const HANDLE_SIZE = 8;
const TRANSITION_RESOLUTION = 1001;

const HALF_LINE_WIDTH = LINE_WIDTH / 2;
const X_MIN_TRANSITION = HALF_LINE_WIDTH;
const Y_MIN_TRANSITION = HALF_LINE_WIDTH;
const X_MAX_TRANSITION = TRANSITION_WIDTH - HALF_LINE_WIDTH;
const Y_MAX_TRANSITION = TRANSITION_HEIGHT - HALF_LINE_WIDTH;
const Y_MIN_HANDLE = TRANSITION_HEIGHT / 8;
const Y_MAX_HANDLE = (7 * TRANSITION_HEIGHT) / 8;

var canvasElement = document.getElementById("canvas");
var canvasTwo = new Two({ type: Two.Types.svg, fitted: true, autostart: true }).appendTo(canvasElement);
var transitionElement = document.getElementById("transition");
var transitionTwo = new Two({ type: Two.Types.canvas, fitted: true, autostart: true }).appendTo(transitionElement);
var transitionRect = transitionElement.getBoundingClientRect();
var transitionPosition = new Two.Vector(transitionRect.left, transitionRect.top);
var dragging = false;
var currentIndex = null;
var handles = null;
var curve = null;
var blob = null;
var mousePosition = new Two.Vector();
var temp = new Two.Vector();
var transitionFunction = [];

var handlePositions = [
    new Two.Vector(TRANSITION_WIDTH / 4, (TRANSITION_HEIGHT * 5) / 8),
    new Two.Vector(TRANSITION_WIDTH / 2, TRANSITION_HEIGHT / 2),
    new Two.Vector((TRANSITION_WIDTH * 3) / 4, (TRANSITION_HEIGHT * 3) / 8),
];

var initialVertices = [
    new Two.Anchor(-100 * Math.SQRT2, 0),
    new Two.Anchor(0, 100 * Math.SQRT2),
    new Two.Anchor(100 * Math.SQRT2, 0),
    new Two.Anchor(0, -100 * Math.SQRT2),
];

var finalVertices = [
    new Two.Anchor(-50, 0),
    new Two.Anchor(0, 50 * Math.sqrt(15)),
    new Two.Anchor(50, 0),
    new Two.Anchor(0, -50 * Math.sqrt(15)),
];

window.addEventListener("resize", resizeCanvasTwo);
window.addEventListener("pointerdown", mouseDown, false);
window.addEventListener("pointermove", mouseMove, false);
window.addEventListener("pointerup", mouseUp, false);
resizeCanvasTwo();

function resizeCanvasTwo() {
    var width = canvasElement.clientWidth;
    var height = canvasElement.clientHeight;
    canvasTwo.renderer.setSize(width, height);
    canvasTwo.scene.position.set(width / 2, height / 2);
}

function mouseDown(e) {
    if (currentIndex !== null) {
        dragging = true;
    }
}

function mouseMove(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;

    if (dragging) {
        var yPosition = mousePosition.y - transitionPosition.y;
        yPosition = Math.min(Y_MAX_HANDLE, Math.max(Y_MIN_HANDLE, yPosition));
        handlePositions[currentIndex].y = yPosition;
    } else {
        var matched = false;

        for (let index = 0; index < 3; index++) {
            const handlePosition = handlePositions[index];
            const distanceSquared = temp.copy(handlePosition).add(transitionPosition).distanceToSquared(mousePosition);

            if (distanceSquared < DISTANCE_SQUARED_THRESHOLD) {
                transitionTwo.renderer.domElement.style.cursor = "pointer";
                matched = true;
                currentIndex = index;
            }
        }

        if (!matched) {
            transitionTwo.renderer.domElement.style.cursor = "default";
            currentIndex = null;
        }
    }
}

function mouseUp(e) {
    dragging = false;
}

function canvasSetup() {
    blob = new Two.Path(initialVertices);
    blob.noStroke();
    blob.fill = "#4f378b";
    blob.closed = true;
    blob.curved = true;
    canvasTwo.add(blob);

    // two.load("assets/heart.svg", function (svg) {
    //     svg.center();
    //     two.add(svg);
    // });
}

function canvasUpdate(frameCount) {
    for (let index = 0; index < 4; index++) {
        blob.vertices[index].x =
            initialVertices[index].x +
            transitionFunction[frameCount] * (finalVertices[index].x - initialVertices[index].x);
        blob.vertices[index].y =
            initialVertices[index].y +
            transitionFunction[frameCount] * (finalVertices[index].y - initialVertices[index].y);
    }
    if (frameCount >= TRANSITION_RESOLUTION) {
        canvasTwo.pause();
    }
}

function transitionSetup() {
    var windowVertices = [
        new Two.Anchor(X_MIN_TRANSITION, Y_MIN_TRANSITION),
        new Two.Anchor(X_MAX_TRANSITION, Y_MIN_TRANSITION),
        new Two.Anchor(X_MAX_TRANSITION, Y_MAX_TRANSITION),
        new Two.Anchor(X_MIN_TRANSITION, Y_MAX_TRANSITION),
    ];
    var window = new Two.Path(windowVertices);
    window.noFill();
    window.stroke = "#d0c9d5";
    window.closed = true;
    transitionTwo.add(window);

    var gridVertices = [
        new Two.Anchor(handlePositions[0].x, Y_MAX_TRANSITION),
        new Two.Anchor(handlePositions[0].x, Y_MIN_TRANSITION),
        new Two.Anchor(handlePositions[1].x, Y_MIN_TRANSITION),
        new Two.Anchor(handlePositions[1].x, Y_MAX_TRANSITION),
        new Two.Anchor(handlePositions[2].x, Y_MAX_TRANSITION),
        new Two.Anchor(handlePositions[2].x, Y_MIN_TRANSITION),
    ];
    var grid = new Two.Path(gridVertices);
    grid.noFill();
    grid.stroke = "#d0c9d55d";
    transitionTwo.add(grid);

    var curveVertices = [
        new Two.Anchor(X_MIN_TRANSITION, Y_MAX_TRANSITION),
        new Two.Anchor(handlePositions[0].x, handlePositions[0].y),
        new Two.Anchor(handlePositions[1].x, handlePositions[1].y),
        new Two.Anchor(handlePositions[2].x, handlePositions[2].y),
        new Two.Anchor(X_MAX_TRANSITION, Y_MIN_TRANSITION),
    ];
    curve = new Two.Path(curveVertices);
    curve.noFill();
    curve.stroke = "#d0c9d5";
    curve.curved = true;
    curve.automatic = true;
    transitionTwo.add(curve);

    handles = new Two.Points(curveVertices.slice(1, 4));
    handles.size = HANDLE_SIZE;
    handles.noStroke();
    handles.fill = "#d0c9d5";
    transitionTwo.add(handles);

    for (var index = 0; index < TRANSITION_RESOLUTION; index++) {
        var y = curve.getPointAt(index / TRANSITION_RESOLUTION).y;
        y = (TRANSITION_HEIGHT - HALF_LINE_WIDTH - y) / (TRANSITION_HEIGHT - LINE_WIDTH);
        transitionFunction.push(y);
    }
}

function transitionUpdate() {
    if (currentIndex === null) {
        return;
    }

    curve.vertices[currentIndex + 1].y = handlePositions[currentIndex].y;
    handles.vertices[currentIndex].y = handlePositions[currentIndex].y;

    transitionFunction = [];
    for (var index = 0; index < TRANSITION_RESOLUTION; index++) {
        var y = curve.getPointAt(index / TRANSITION_RESOLUTION).y;
        y = (TRANSITION_HEIGHT - HALF_LINE_WIDTH - y) / (TRANSITION_HEIGHT - LINE_WIDTH);
        transitionFunction.push(y);
    }
}

transitionSetup(transitionTwo);
canvasSetup(canvasTwo);

transitionTwo.bind("update", transitionUpdate).play();
canvasTwo.bind("update", canvasUpdate).play();
