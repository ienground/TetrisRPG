/**
 * Developed by
 * @ienground_
 * Final Project of Intro to Creative Computing (2021)
 * Geometry Tetris RPG
 *
 * Ericano Rhee on github.com/ienground
 */

// typeface
let gmSansBold, gmSansLight, gmSansMedium;
let size = 5.2;
let stars = [];
let blockColors;

// item : i, o, t, l, j, s, z

function preload() {
    gmSansBold = loadFont("assets/GmarketSansBold.otf");
    gmSansLight = loadFont("assets/GmarketSansLight.otf");
    gmSansMedium = loadFont("assets/GmarketSansMedium.otf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(RGB);
    background(255);

    blockColors = [
        { front : color('#344040'), top : color('#C2C2C2'), side : color('#808893') },
        { front : color('#E34F45'), top : color('#FE9464'), side : color('#FE7668') },
        { front : color('#D2AACF'), top : color('#FFFFFF'), side : color('#6F97C7') },
        { front : color('#3D8965'), top : color('#90FCC8'), side : color('#6BCE95') },
        { front : color('#492A88'), top : color('#7F5BB5'), side : color('#67308E') },
        { front : color('#D8A54C'), top : color('#F0D062'), side : color('#E6B758') },
        { front : color('#FC2D67'), top : color('#FD7FB9'), side : color('#A02446') },
    ]

    for (let i = 0; i < 30; i++) {
        let x = random(0, width);
        let y = random(0, height);
        let size = random(3, 5);

        let item = { x : x, y : y, size : size };
        stars.push(item);
    }

}

function draw() {
    background(255);
    drawBackground();

    // 좌표 : 높이 기준.

    push();

    translate(width / 2, 0);

    drawCubeFront(color(30),- 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55 + 2 * height / size * sin(60) * 0.45, -height / size * 0.55 - height / size * 0.45);
    drawCubeTop(color(70), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55 + 4 * height / size);
    drawCubeSide(color(80), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55);
    drawCubeFront(color(30),- 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55);
    drawCubeTop(color(70), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55);
    drawCubeSide(color(80), 2 * height / size * sin(60) * 0.55, height / size - height / size * 0.55);

    drawCubeFront(color(0), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.45,  - height / size * 0.45);
    drawCubeTop(color(40), - 2 * height / size * sin(60),  + 4 * height / size)
    drawCubeSide(color(255, 50), - 2 * height / size * sin(60), 0);

    // Block
    drawBlock(0, 0, 0, 0);
    drawBlock(1, 4, 0, 0);
    drawBlock(2, 6, 0, 0);
    drawBlock(3, 0, 1, 0);
    // drawBlock(0, 1, 0, 0);
    // drawBlock(0, 0, 1, 0);
    // drawBlock(0, 1, 1, 0);
    // drawBlock(0, 9, 19, 0);

    // drawCubeFront(color(255, 70), - 2 * height / size * sin(60), 0);
    // drawCubeTop(color(40), - 2 * height / size * sin(60), 0)
    // drawCubeSide(color(255, 90), 0, height / size);

    pop();
}

function drawCubeFront(c, px, py) {
    push();
    noStroke();
    fill(c);
    translate(px, py);

    beginShape();
    vertex(0, 0);
    vertex(2 * height / size * sin(60), height / size);
    vertex(2 * height / size * sin(60), 5 * height / size);
    vertex(0, 4 * height / size);
    endShape();

    pop();
}

function drawCubeTop(c, px, py) {
    push();
    noStroke();
    fill(c);
    translate(px, py);

    beginShape();
    vertex(0, 0);
    vertex(2 * height / size * sin(60) * 0.45, -height / size * 0.45);
    vertex(2 * height / size * sin(60) * 1.45, height / size * 0.55);
    vertex(2 * height / size * sin(60), height / size);
    endShape();

    pop();
}

function drawCubeSide(c, px, py) {
    push();
    noStroke();
    fill(c);
    translate(px, py);

    beginShape();
    vertex(0, 0);
    vertex(2 * height / size * sin(60) * 0.45, -height / size * 0.45);
    vertex(2 * height / size * sin(60) * 0.45, 3.55 * height / size);
    vertex(0, 4 * height / size)
    endShape();

    pop();
}

function drawBackground() {
    for (let i = 0; i < height * 2; i += 5) {
        let c = lerpColor(color('#093E50'), color('#1E1A2B'), i / sqrt(width * height));
        noFill(); stroke(c); strokeWeight(height / 75);
        line(i - height, i, width + i - height, i - height);
    }

    for (let i = 0; i < stars.length; i++) {
        noStroke();
        fill(255, 80);
        circle(stars[i].x, stars[i].y, (frameCount / 30 - 2) % stars[i].size + 2);
    }
}

function drawBlock(type, x, y, r) {
    push();
    let unit = height / (size * 5);
    let sideX = 2 * height / size * sin(60) * 0.45;
    let sideY = height / size * 0.45;
    translate(- 2 * height / size * sin(60), 4 * height / size)
    translate(x * unit * sin(60), -y * unit + x * unit * cos(60));
    switch (type) {
        case 0: { // I형
            noStroke();
            fill(blockColors[type].front);
            beginShape();
            vertex(0, 0);
            vertex(0, -unit);
            vertex(4 * unit * sin(60), -unit + 4 * unit * cos(60));
            vertex(4 * unit * sin(60), 4 * unit * cos(60));
            endShape();

            fill(blockColors[type].top);
            beginShape();
            vertex(0, -unit);
            vertex(sideX, -unit - sideY);
            vertex(4 * unit * sin(60) + sideX, unit - sideY);
            vertex(4 * unit * sin(60), unit);
            endShape();

            fill(blockColors[type].side);
            beginShape();
            vertex(4 * unit * sin(60), unit);
            vertex(4 * unit * sin(60) + sideX, unit - sideY);
            vertex(4 * unit * sin(60) + sideX, 4 * unit * cos(60) - sideY);
            vertex(4 * unit * sin(60), 4 * unit * cos(60));
            endShape();

            break;
        }
        case 1: { // o형
            noStroke();
            fill(blockColors[type].front);
            beginShape();
            vertex(0, 0);
            vertex(0, -2 * unit);
            vertex(2 * unit * sin(60), -2 * unit + 2 * unit * cos(60));
            vertex(2 * unit * sin(60), 2 * unit * cos(60));
            endShape();

            fill(blockColors[type].top);
            beginShape();
            vertex(0, - 2 * unit);
            vertex(sideX, -2 * unit - sideY);
            vertex(2 * unit * sin(60) + sideX, -unit - sideY);
            vertex(2 * unit * sin(60), -unit);
            endShape();

            fill(blockColors[type].side);
            beginShape();
            vertex(2 * unit * sin(60), -unit);
            vertex(2 * unit * sin(60) + sideX, -unit - sideY);
            vertex(2 * unit * sin(60) + sideX, unit - sideY);
            vertex(2 * unit * sin(60), 2 * unit * cos(60));
            endShape();
            break;
        }
        case 2: { // T형
            noStroke();

            fill(blockColors[type].top);
            beginShape();
            vertex(0, -unit);
            vertex(sideX, -unit - sideY);
            vertex(sideX + unit * sin(60), -unit - sideY + unit * cos(60));
            vertex(unit * sin(60), -unit + unit * cos(60));
            endShape();

            fill(blockColors[type].front);
            beginShape();
            vertex(0, 0);
            vertex(0, -unit);
            vertex(unit * sin(60), -unit + unit * cos(60));
            vertex(unit * sin(60), -2 * unit + unit * cos(60));
            vertex(2 * unit * sin(60), -2 * unit + 2 * unit * cos(60));
            vertex(2 * unit * sin(60), -unit + 2 * unit * cos(60));
            vertex(3 * unit * sin(60), -unit + 3 * unit * cos(60));
            vertex(3 * unit * sin(60), 3 * unit * cos(60));
            endShape();

            fill(blockColors[type].top);
            beginShape();
            vertex(unit * sin(60), -2 * unit + unit * cos(60));
            vertex(unit * sin(60) + sideX, -2 * unit + unit * cos(60) - sideY);
            vertex(2 * unit * sin(60) + sideX, -2 * unit + 2 * unit * cos(60) - sideY);
            vertex(2 * unit * sin(60), -2 * unit + 2 * unit * cos(60));
            endShape();

            beginShape();
            vertex(2 * unit * sin(60), -unit + 2 * unit * cos(60));
            vertex(2 * unit * sin(60) + sideX, -unit + 2 * unit * cos(60) - sideY);
            vertex(3 * unit * sin(60) + sideX, -unit + 3 * unit * cos(60) - sideY);
            vertex(3 * unit * sin(60), -unit + 3 * unit * cos(60));
            endShape();


            fill(blockColors[type].side);
            beginShape();
            vertex(2 * unit * sin(60), -2 * unit + 2 * unit * cos(60));
            vertex(2 * unit * sin(60) + sideX, -2 * unit + 2 * unit * cos(60) - sideY);
            vertex(2 * unit * sin(60) + sideX, -1 * unit + 2 * unit * cos(60) - sideY);
            vertex(2 * unit * sin(60), -1 * unit + 2 * unit * cos(60));
            endShape();

            beginShape();
            vertex(3 * unit * sin(60), -unit + 3 * unit * cos(60));
            vertex(3 * unit * sin(60) + sideX, -unit + 3 * unit * cos(60) - sideY);
            vertex(3 * unit * sin(60) + sideX, 3 * unit * cos(60) - sideY);
            vertex(3 * unit * sin(60), 3 * unit * cos(60));
            endShape();

            break;
        }
        case 3: { // T형
            noStroke();

            stroke(255, 0, 0);strokeWeight(5);
            // fill(blockColors[type].top);
            // beginShape();
            // vertex(0, -unit);
            // vertex(sideX, -unit - sideY);
            // vertex(sideX + unit * sin(60), -unit - sideY + unit * cos(60));
            // vertex(unit * sin(60), -unit + unit * cos(60));
            // endShape();

            fill(blockColors[type].front);
            beginShape();
            vertex(0, 0);
            vertex(0, -unit);
            vertex(2 * unit * sin(60), -unit + 2 * unit * cos(60));
            endShape();

            // fill(blockColors[type].top);
            // beginShape();
            // vertex(unit * sin(60), -2 * unit + unit * cos(60));
            // vertex(unit * sin(60) + sideX, -2 * unit + unit * cos(60) - sideY);
            // vertex(2 * unit * sin(60) + sideX, -2 * unit + 2 * unit * cos(60) - sideY);
            // vertex(2 * unit * sin(60), -2 * unit + 2 * unit * cos(60));
            // endShape();
            //
            // beginShape();
            // vertex(2 * unit * sin(60), -unit + 2 * unit * cos(60));
            // vertex(2 * unit * sin(60) + sideX, -unit + 2 * unit * cos(60) - sideY);
            // vertex(3 * unit * sin(60) + sideX, -unit + 3 * unit * cos(60) - sideY);
            // vertex(3 * unit * sin(60), -unit + 3 * unit * cos(60));
            // endShape();
            //
            //
            // fill(blockColors[type].side);
            // beginShape();
            // vertex(2 * unit * sin(60), -2 * unit + 2 * unit * cos(60));
            // vertex(2 * unit * sin(60) + sideX, -2 * unit + 2 * unit * cos(60) - sideY);
            // vertex(2 * unit * sin(60) + sideX, -1 * unit + 2 * unit * cos(60) - sideY);
            // vertex(2 * unit * sin(60), -1 * unit + 2 * unit * cos(60));
            // endShape();
            //
            // beginShape();
            // vertex(3 * unit * sin(60), -unit + 3 * unit * cos(60));
            // vertex(3 * unit * sin(60) + sideX, -unit + 3 * unit * cos(60) - sideY);
            // vertex(3 * unit * sin(60) + sideX, 3 * unit * cos(60) - sideY);
            // vertex(3 * unit * sin(60), 3 * unit * cos(60));
            // endShape();

        }

    }
    pop();
}

// function drawFront(shape, )

function mouseClicked() {

}

function keyPressed(key) {
    print(key.code);
}