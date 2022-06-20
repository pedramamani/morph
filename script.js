import Two from "./two.js";

var params = { type: Two.Types.svg, fullscreen: true };
var two = new Two(params).appendTo(document.body);


var initialVertices = [
    new Two.Anchor(-100 * Math.SQRT2, 0),
    new Two.Anchor(0, 100 * Math.SQRT2),
    new Two.Anchor(100 * Math.SQRT2, 0),
    new Two.Anchor(0, -100 * Math.SQRT2)
];
var initialBlob = new Two.Path(initialVertices);
initialBlob.noStroke();
initialBlob.fill = 'black';
initialBlob.closed = true;
initialBlob.curved = true;


var finalVertices = [
    new Two.Anchor(-50, 0),
    new Two.Anchor(0, 50 * Math.sqrt(15)),
    new Two.Anchor(50, 0),
    new Two.Anchor(0, -50 * Math.sqrt(15))
];
var finalBlob = new Two.Path(finalVertices);
finalBlob.noStroke();
finalBlob.fill = 'black';
finalBlob.closed = true;
finalBlob.curved = true;



var blob = initialBlob.clone();
two.bind('update', update);
two.play();


function update(frameCount) {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    for (let index = 0; index < 4; index++) {
        blob.vertices[index].x = initialVertices[index].x + frameCount / 500 * (finalVertices[index].x - initialVertices[index].x);
        blob.vertices[index].y = initialVertices[index].y + frameCount / 500 * (finalVertices[index].y - initialVertices[index].y);
    }
    blob.translation.set(centerX, centerY);
    two.add(blob);
}
