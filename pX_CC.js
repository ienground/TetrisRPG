/**
 * Developed by
 * @ienground_
 * Final Project of Intro to Creative Computing (2021)
 * Geometry Tetris RPG
 *
 * Ericano Rhee on github.com/ienground
 */

// typeface
let pixelFont;
let size = 5.2;
let stars = [];
let blockColors;
let currentBlock, nextBlock;
let currentX, currentY, currentRotate, nextRotate;
let lastBlock, lastX, lastY, lastRotate;
let score = 0;
let charX, charY, charZ, charDirection, preCharX, preCharY, preCharZ, preCharDirection;
let movingStartTime = 0, movingSignal = false, footDirection = false;

let blockWidth = [
    [4, 1, 4, 1],
    [2, 2, 2, 2],
    [3, 2, 3, 2],
    [3, 2, 3, 2],
    [3, 2, 3, 2],
    [3, 2, 3, 2],
    [3, 2, 3, 2]
];
let blockMap;
let lastBlock

let gameStart = true;
let gameStartTime = -30;
let gameOver = false;

let imgNextBlock;
let lastFellTime = -30;

const DIRECTION_FRONT = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_REAR = 2;
const DIRECTION_LEFT = 3;
// item : i, o, t, l, j, s, z
// rotate : 시계 방향으로 0, 1, 2, 3

function preload() {
    pixelFont = loadFont("assets/ThaleahFat.ttf");
    imgNextBlock = loadImage("assets/nextBlock.png");
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

    currentBlock = getRandomInt(0, 6);
    currentRotate = getRandomInt(0, 3);
    currentX = getRandomInt(0, 10 - blockWidth[currentBlock][currentRotate]);
    currentY = 20 - blockWidth[currentBlock][(currentRotate + 1) % 4];
    nextBlock = getRandomInt(0, 6);
    nextRotate = getRandomInt(0, 3);

    charX = 0; charY = 0; charZ = 0; charDirection = DIRECTION_REAR;
    preCharX = 0; preCharY = 0; preCharZ = 0; preCharDirection = DIRECTION_REAR;

    blockMap = Array.from(Array(10), () => Array(20).fill(0));
}

let testBlock = 0, testRotate = 0;

function draw() {
    background(255);
    drawBackground();

    if (!gameStart) {
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

        drawCubeFront(color(255, 70), - 2 * height / size * sin(60), 0);
        drawCubeTop(color(40), - 2 * height / size * sin(60), 0)
        drawCubeSide(color(255, 90), 0, height / size);

        pop();

        splash(255);

    } else if (gameOver) {

    } else {
        // 좌표 : 높이 기준.
        push();

        translate(width / 2, 0);

        drawCubeFront(color(30),- 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55 + 2 * height / size * sin(60) * 0.45, -height / size * 0.55 - height / size * 0.45);
        drawCubeTop(color(70), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55 + 4 * height / size);
        drawCubeSide(color(80), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55);
        drawCubeFront(color(30),- 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55);
        drawCubeTop(color(70), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.55, -height / size * 0.55);
        drawCubeSide(color(80), 2 * height / size * sin(60) * 0.55, height / size - height / size * 0.55);

        // fill(255, 0, 0, 100);
        // beginShape();
        // vertex(2 * height / size * sin(60) * 0.55, height / size - height / size * 0.55);
        // vertex(2 * height / size * sin(60) , height / size - height / size);
        // vertex(2 * height / size * sin(60) , height / size - height / size + 2 * height / size * 0.45);
        // vertex(2 * height / size * sin(60) * 0.55, height / size - height / size * 0.55 + 2 * height / size * 0.45);
        // endShape();

        image(imgNextBlock, 2 * height / size * sin(60) * 0.55 * (1 + 1 / 6), height / size * 0.2, 2 * height / size * sin(60) * 0.45 * (2 / 3), imgNextBlock.height / imgNextBlock.width * 2 * height / size * sin(60) * 0.45 * (2 / 3));
        drawNextBlock(2 * height / size * sin(60) * 0.55, height / size - height / size * 0.55 + 3 * height / size * 0.45, nextBlock, nextRotate);


        drawCubeFront(color(0), - 2 * height / size * sin(60) + 2 * height / size * sin(60) * 0.45,  - height / size * 0.45);
        drawCubeTop(color(40), - 2 * height / size * sin(60),  + 4 * height / size)
        drawCubeSide(color(255, 50), - 2 * height / size * sin(60), 0);

        let fallingTime = 60;

        // drawBlock(testBlock, 3, 0, testRotate);

        // /*
        if ((frameCount - lastFellTime) / fallingTime <= 20 && (checkBlockInfo(currentBlock, currentX, currentY - 1, currentRotate))) {
            if ((frameCount - lastFellTime) % fallingTime === 0) { // 정각에 딱 떨어뜨리기
            // if (frameCount / fallingTime - lastFellTime / fallingTime === (round(frameCount / fallingTime) - round(lastFellTime / fallingTime))) { // 정각에 딱 떨어뜨리기
                print(currentBlock, currentX, currentY - 1, currentRotate, checkBlockInfo(currentBlock, currentX, currentY - 1, currentRotate));
                currentY--;
            } else {
                print("time not work : ", (frameCount - lastFellTime) % fallingTime);
            }

            let blockInfo = getBlockCor(currentBlock, currentX, currentY, currentRotate);
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 20; j++) {
                    if (blockMap[i][j]) {
                        drawBlockCube(-1, i, j);
                    }

                    for (let info of blockInfo) {
                        if (info.x === i && info.y === j) {
                            drawBlockCube(currentBlock, i, j);
                        }
                    }
                    // if (currentX === i && currentY === j) {
                    //     drawBlock(currentBlock, currentX, currentY, currentRotate);
                    // }
                }
            }

        } else { // falling finish
            print(currentBlock, currentX, currentY, currentRotate);


            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 20; j++) {
                    if (blockMap[i][j]) {
                        drawBlockCube(-1, i, j);
                    }
                }
            }

            // drawBlock(currentBlock, currentX, currentY, currentRotate);
            setBlockInfo(currentBlock, currentX, currentY, currentRotate);
            // setBlockInfo(lastBlock, lastX, lastY, lastRotate);
            // let block = { type : currentBlock, x : currentX, y : currentY, r : currentRotate };
            // blockMap.push(block);

            // drawBlock(currentBlock, 0, 0, currentRotate);
            // 2단계 전 블럭을 map에 고정


            lastFellTime = frameCount;
            lastBlock = currentBlock;
            lastX = currentX;
            lastY = currentY;
            lastRotate = currentRotate;

            currentRotate = nextRotate;
            currentBlock = nextBlock;
            currentX = getRandomInt(0, 10 - blockWidth[currentBlock][currentRotate]);
            currentY = 20 - blockWidth[currentBlock][(currentRotate + 1) % 4];
            nextRotate = getRandomInt(0, 3);
            nextBlock = getRandomInt(0, 6);

        }

         // */

        drawCharacter(charX, charY, charZ, charDirection, preCharX, preCharY, preCharZ, preCharDirection);
        // }

        // drawCubeFront(color(255, 70), - 2 * height / size * sin(60), 0);
        // drawCubeTop(color(40), - 2 * height / size * sin(60), 0)
        // drawCubeSide(color(255, 90), 0, height / size);

        pop();

        // splash
        if (frameCount - gameStartTime <= 30) {
            splash(map(frameCount - gameStartTime, 0, 30, 255, 0));
            lastFellTime = gameStartTime + 30;
        }
    }

}

function checkBlockUnit(px, py) {
    if (!(px >= 0 && px < 10 && py >= 0 && py < 20)) {
        return false;
    } else if (blockMap[px][py]) {
        return false;
    }

    return true;
}

function checkBlockInfo(type, x, y, r)  {
    switch (type) {
        case 0: {
            switch (r % 2) {
                case 0: {
                    for (let i = 0; i < 4; i++) {
                        if (!checkBlockUnit(x + i, y)) {
                            return false;
                        }
                    }
                    return true;
                }
                case 1: {
                    for (let i = 0; i < 4; i++) {
                        if (!checkBlockUnit(x, y + i)) {
                            return false;
                        }
                    }
                    return true;
                }
            }

            break;
        }
        case 1: {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    if (!checkBlockUnit(x + i, y + j)) {
                        return false;
                    }
                }
            }
            return true;
        }
        case 2: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + i, y)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 1, y + 1);
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x, y + i)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 1, y + 1);
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + i, y + 1)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 1, y);
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + 1, y + i)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x, y + 1);
                }
            }
            break;
        }
        case 3: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + i, y)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 2, y + 1);
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x, y + i)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 1, y);
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + i, y + 1)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x, y);
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + 1, y + i)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x, y + 2);
                }
            }
            break;
        }
        case 4: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + i, y)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x, y + 1);
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x, y + i)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 1, y + 2);
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + i, y + 1)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x + 2, y);
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        if (!checkBlockUnit(x + 1, y + i)) {
                            return false;
                        }
                    }
                    return checkBlockUnit(x, y);
                }
            }
            break;
        }
        case 5: {
            switch (r % 2) {
                case 0: {
                    if (!checkBlockUnit(x, y)) {
                        return false;
                    }
                    if (!checkBlockUnit(x + 1, y)) {
                        return false;
                    }
                    if (!checkBlockUnit(x + 1, y + 1)) {
                        return false;
                    }
                    return checkBlockUnit(x + 2, y + 1);
                }
                case 1: {
                    if (!checkBlockUnit(x + 1, y)) {
                        return false;
                    }
                    if (!checkBlockUnit(x + 1, y + 1)) {
                        return false;
                    }
                    if (!checkBlockUnit(x, y + 1)) {
                        return false;
                    }
                    return checkBlockUnit(x, y + 2);


                }
            }
            break;
        }
        case 6: {
            switch (r % 2) {
                case 0: {
                    if (!checkBlockUnit(x, y + 1)) {
                        return false;
                    }
                    if (!checkBlockUnit(x + 1, y + 1)) {
                        return false;
                    }
                    if (!checkBlockUnit(x + 1, y)) {
                        return false;
                    }
                    return checkBlockUnit(x + 2, y);
                }
                case 1: {
                    if (!checkBlockUnit(x, y)) {
                        return false;
                    }
                    if (!checkBlockUnit(x, y + 1)) {
                        return false;
                    }
                    if (!checkBlockUnit(x + 1, y + 1)) {
                        return false;
                    }
                    return checkBlockUnit(x + 1, y + 2);


                }
            }
            break;
        }
    }
}

function setBlockInfo(type, x, y, r) {
    switch (type) {
        case 0: {
            switch (r % 2) {
                case 0: {
                    for (let i = 0; i < 4; i++) {
                        blockMap[x + i][y] = 1;
                    }
                    break;
                }
                case 1: {
                    for (let i = 0; i < 4; i++) {
                        blockMap[x][y + i] = 1;
                    }
                    break;
                }
            }

            break;
        }
        case 1: {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    blockMap[x + i][y + j] = 1;
                }
            }
            break;
        }
        case 2: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + i][y] = 1;
                    }
                    blockMap[x + 1][y + 1] = 1;

                    break;
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x][y + i] = 1;
                    }
                    blockMap[x + 1][y + 1] = 1;

                    break;
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + i][y + 1] = 1;
                    }
                    blockMap[x + 1][y] = 1;

                    break;
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + 1][y + i] = 1;
                    }
                    blockMap[x][y + 1] = 1;

                    break;
                }
            }
            break;
        }
        case 3: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + i][y] = 1;
                    }
                    blockMap[x + 2][y + 1] = 1;

                    break;
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x][y + i] = 1;
                    }
                    blockMap[x + 1][y] = 1;

                    break;
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + i][y + 1] = 1;
                    }
                    blockMap[x][y] = 1;

                    break;
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + 1][y + i] = 1;
                    }
                    blockMap[x][y + 2] = 1;

                    break;
                }
            }
            break;
        }
        case 4: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + i][y] = 1;
                    }
                    blockMap[x][y + 1] = 1;

                    break;
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x][y + i] = 1;
                    }
                    blockMap[x + 1][y + 2] = 1;

                    break;
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + i][y + 1] = 1;
                    }
                    blockMap[x + 2][y] = 1;

                    break;
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        blockMap[x + 1][y + i] = 1;
                    }
                    blockMap[x][y] = 1;

                    break;
                }
            }
            break;
        }
        case 5: {
            switch (r % 2) {
                case 0: {
                    blockMap[x][y] = 1;
                    blockMap[x + 1][y] = 1;
                    blockMap[x + 1][y + 1] = 1;
                    blockMap[x + 2][y + 1] = 1;
                    break;
                }
                case 1: {
                    blockMap[x + 1][y] = 1;
                    blockMap[x + 1][y + 1] = 1;
                    blockMap[x][y + 1] = 1;
                    blockMap[x][y + 2] = 1;
                    break;
                }
            }
            break;
        }
        case 6: {
            switch (r % 2) {
                case 0: {
                    blockMap[x][y + 1] = 1;
                    blockMap[x + 1][y + 1] = 1;
                    blockMap[x + 1][y] = 1;
                    blockMap[x + 2][y] = 1;
                    break;
                }
                case 1: {
                    blockMap[x][y] = 1;
                    blockMap[x][y + 1] = 1;
                    blockMap[x + 1][y + 1] = 1;
                    blockMap[x + 1][y + 2] = 1;
                    break;
                }
            }
            break;
        }
    }
}

function drawCharacter(x, y, z, r, px, py, pz, pr) {
    // moving time : 5 frame
    let duration = 5;
    push();
    let unit = height / (size * 5);
    let sideX = 2 * height / size * sin(60) * 0.45;
    let sideY = height / size * 0.45;
    let offsetX = unit * sin(60) / 2;
    let offsetY = unit * cos(60) / 2;

    if ((x !== px || y !== py || z !== pz || r !== pr) && !movingSignal) {
        movingSignal = true;
        movingStartTime = frameCount;
        footDirection = !footDirection;
    }

    if (x !== px) {
        if (x - px > 0) { // 오른쪽으로 향함
            charDirection = DIRECTION_RIGHT;
        } else {
            charDirection = DIRECTION_LEFT;
        }

        let mx = map(frameCount - movingStartTime, 0, duration, px, x);
        let mangle = map(frameCount - movingStartTime, 0, duration, 0, 60);
        translate(-2 * height / size * sin(60) + sideX / 4, 4 * height / size - sideY / 4 - 1.6 * unit);
        translate(y * offsetX + mx * sideX / 8, y * offsetY - z * unit - mx * sideY / 8);

        // 발
        noFill(); stroke(255); strokeWeight(height / 200);
        push();
        beginShape();
        translate(-0.3 * offsetX, -0.3 * offsetY + 1.6 * unit);
        switch (r) {
            case DIRECTION_LEFT: {
                if (footDirection) rotate(30 - abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
            case DIRECTION_RIGHT: {
                if (footDirection) rotate(-30 + abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
        }
        endShape();
        pop();

        push();
        beginShape();
        translate(0.3 * offsetX, 0.3 * offsetY + 1.6 * unit);
        switch (r) {
            case DIRECTION_LEFT: {
                if (!footDirection) rotate(30 - abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
            case DIRECTION_RIGHT: {
                if (!footDirection) rotate(-30 + abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
        }
        endShape();
        pop();

        // 몸 + 얼굴
        noStroke();
        fill('#FF4081');
        rect(-unit * 0.4, -unit * 0.4, unit * 0.8, unit * 2.2, unit * 0.4, unit * 0.4, unit * 0.4, unit * 0.4);
        fill(255);
        if (r === DIRECTION_LEFT) {
            ellipse(-unit * 0.1, unit * 0.1, unit * 0.5, unit * 0.6);
        }
    } else if (y !== py) {
        if (y - py > 0) { // 우리를 봐야 함
            charDirection = DIRECTION_REAR;
        } else {
            charDirection = DIRECTION_FRONT;
        }

        let my = map(frameCount - movingStartTime, 0, duration, py, y);
        let mangle = map(frameCount - movingStartTime, 0, duration, 0, 60);
        translate(-2 * height / size * sin(60) + sideX / 4, 4 * height / size - sideY / 4 - 1.6 * unit);
        translate(my * offsetX + x * sideX / 8, my * offsetY - z * unit - x * sideY / 8);

        // 발
        noFill(); stroke(255); strokeWeight(height / 200);
        push();
        beginShape();
        translate(-0.3 * offsetX, 0.3 * offsetY + 1.6 * unit);
        switch (r) {
            case DIRECTION_FRONT: {
                if (footDirection) rotate(30 - abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
            case DIRECTION_REAR: {
                if (footDirection) rotate(-30 + abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
        }
        endShape();
        pop();

        push();
        beginShape();
        translate(0.3 * offsetX, -0.3 * offsetY + 1.6 * unit);
        switch (r) {
            case DIRECTION_FRONT: {
                if (!footDirection) rotate(30 - abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
            case DIRECTION_REAR: {
                if (!footDirection) rotate(-30 + abs(mangle - 30));
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
        }
        endShape();
        pop();

        // 몸 + 얼굴
        noStroke();
        fill('#FF4081');
        rect(-unit * 0.4, -unit * 0.4, unit * 0.8, unit * 2.2, unit * 0.4, unit * 0.4, unit * 0.4, unit * 0.4);
        fill(255);
        if (charDirection === DIRECTION_REAR) {
            ellipse(unit * 0.1, unit * 0.1, unit * 0.5, unit * 0.6);
        }
    } else if (z !== pz) {

    } else if (r !== pr) {

    } else {
        translate(-2 * height / size * sin(60) + sideX / 4, 4 * height / size - sideY / 4 - 1.6 * unit);
        translate(y * offsetX + x * sideX / 8, y * offsetY - z * unit - x * sideY / 8);

        // 발
        noFill(); stroke(255); strokeWeight(height / 200);
        push();
        beginShape();
        switch (r) {
            case DIRECTION_FRONT: {
                translate(-0.3 * offsetX, 0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
            case DIRECTION_REAR: {
                translate(-0.3 * offsetX, 0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
            case DIRECTION_LEFT: {
                translate(-0.3 * offsetX, -0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
            case DIRECTION_RIGHT: {
                translate(-0.3 * offsetX, -0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
        }
        endShape();
        pop();

        push();
        beginShape();
        switch (r) {
            case DIRECTION_FRONT: {
                translate(0.3 * offsetX, -0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
            case DIRECTION_REAR: {
                translate(0.3 * offsetX, -0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
            case DIRECTION_LEFT: {
                translate(0.3 * offsetX, 0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(-0.5 * offsetX, 0.4 * unit + 0.5 * offsetY);
                break;
            }
            case DIRECTION_RIGHT: {
                translate(0.3 * offsetX, 0.3 * offsetY + 1.6 * unit);
                vertex(0, 0);
                vertex(0, 0.4 * unit);
                vertex(0.5 * offsetX, 0.4 * unit - 0.5 * offsetY);
                break;
            }
        }
        endShape();
        pop();

        // 몸 + 얼굴
        noStroke();
        fill('#FF4081');
        rect(-unit * 0.4, -unit * 0.4, unit * 0.8, unit * 2.2, unit * 0.4, unit * 0.4, unit * 0.4, unit * 0.4);
        fill(255);
        if (r === DIRECTION_REAR) {
            ellipse(unit * 0.1, unit * 0.1, unit * 0.5, unit * 0.6);
        } else if (r === DIRECTION_LEFT) {
            ellipse(-unit * 0.1, unit * 0.1, unit * 0.5, unit * 0.6);
        }
    }

    if (frameCount - movingStartTime >= duration) {
        preCharX = charX;
        preCharY = charY;
        preCharZ = charZ;
        preCharDirection = charDirection;
        movingSignal = false;
    }

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

function drawBlockCube(type, x, y) {
    push();
    let unit = height / (size * 5);
    let sideX = 2 * height / size * sin(60) * 0.3;
    let sideY = height / size * 0.3;
    let offsetX = unit * sin(60);
    let offsetY = unit * cos(60);
    translate(-2 * height / size * sin(60) + sideX / 2, 4 * height / size - sideY / 2)
    translate(x * offsetX, -y * unit + x * offsetY);

    let frontColor, topColor, sideColor;
    if (type === -1) {
        frontColor = color('#1E1E1E');
        topColor = color('#464646');
        sideColor = color('#505050');
    } else {
        frontColor = blockColors[type].front;
        topColor = blockColors[type].top;
        sideColor = blockColors[type].side;
    }


    // front
    fill(frontColor);
    beginShape();
    vertex(0, 0);
    vertex(0, -unit);
    vertex(offsetX, -unit + offsetY);
    vertex(offsetX, offsetY);
    endShape();

    // top
    fill(topColor);
    beginShape();
    vertex(0, -unit);
    vertex(sideX, -unit - sideY);
    vertex(sideX + offsetX, -unit - sideY + offsetY);
    vertex(offsetX, -unit + offsetY);
    endShape();

    // side
    fill(sideColor);
    beginShape();
    vertex(offsetX, -unit + offsetY);
    vertex(offsetX + sideX, -unit + offsetY - sideY);
    vertex(offsetX + sideX, offsetY - sideY);
    vertex(offsetX, offsetY);
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
    let sideX = 2 * height / size * sin(60) * 0.3;
    let sideY = height / size * 0.3;
    let offsetX = unit * sin(60);
    let offsetY = unit * cos(60);
    translate(-2 * height / size * sin(60) + sideX / 2, 4 * height / size - sideY / 2)
    translate(x * offsetX, -y * unit + x * offsetY);
    switch (type) {
        case 0: { // I형
            noStroke();
            switch (r % 2) {
                case 0: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(4 * offsetX, -unit + 4 * offsetY);
                    vertex(4 * offsetX, 4 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -unit);
                    vertex(sideX, -unit - sideY);
                    vertex(4 * offsetX + sideX, unit - sideY);
                    vertex(4 * offsetX, unit);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(4 * offsetX, unit);
                    vertex(4 * offsetX + sideX, unit - sideY);
                    vertex(4 * offsetX + sideX, 4 * offsetY - sideY);
                    vertex(4 * offsetX, 4 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -4 * unit);
                    vertex(offsetX, -4 * unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -4 * unit);
                    vertex(sideX, -4 * unit - sideY);
                    vertex(sideX + offsetX, -4 * unit - sideY + offsetY);
                    vertex(offsetX, -4 * unit + offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -4 * unit + offsetY);
                    vertex(offsetX + sideX, -4 * unit + offsetY - sideY);
                    vertex(offsetX + sideX, offsetY - sideY);
                    vertex(offsetX, offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 1: { // o형
            noStroke();
            fill(blockColors[type].front);
            beginShape();
            vertex(0, 0);
            vertex(0, -2 * unit);
            vertex(2 * offsetX, -2 * unit + 2 * offsetY);
            vertex(2 * offsetX, 2 * offsetY);
            endShape();

            fill(blockColors[type].top);
            beginShape();
            vertex(0, - 2 * unit);
            vertex(sideX, -2 * unit - sideY);
            vertex(2 * offsetX + sideX, -unit - sideY);
            vertex(2 * offsetX, -unit);
            endShape();

            fill(blockColors[type].side);
            beginShape();
            vertex(2 * offsetX, -unit);
            vertex(2 * offsetX + sideX, -unit - sideY);
            vertex(2 * offsetX + sideX, unit - sideY);
            vertex(2 * offsetX, 2 * offsetY);
            endShape();
            break;
        }
        case 2: { // T형
            noStroke();
            switch (r) {
                case 0: {
                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -unit);
                    vertex(sideX, -unit - sideY);
                    vertex(sideX + offsetX, -unit - sideY + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    endShape();

                    beginShape();
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    endShape();


                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, -1 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -1 * unit + 2 * offsetY);
                    endShape();

                    beginShape();
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, 3 * offsetY - sideY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(offsetX + sideX, offsetY - sideY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -3 * unit);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -3 * unit);
                    vertex(sideX, -3 * unit - sideY);
                    vertex(sideX + offsetX, -3 * unit - sideY + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX + sideX, -3 * unit + offsetY - sideY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    break;
                }
                case 2: {
                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + 3 * offsetX, -2 * unit - sideY + 3 * offsetY);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    endShape();



                    break;
                }
                case 3: {
                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + offsetX, -2 * unit - sideY + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX + sideX, -3 * unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 3: { // L형
            noStroke();
            switch (r) {
                case 0: {
                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -unit);
                    vertex(sideX, -unit - sideY);
                    vertex(sideX + 2 * offsetX, -unit - sideY + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, - 2 * unit + 2 * offsetY);
                    vertex(3 * offsetX, - 2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(2 * offsetX, - 2 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, - 2 * unit + 2 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, - 2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, - 2 * unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(3 * offsetX, - 2 * unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, - 2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, 3 * offsetY - sideY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -3 * unit);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -3 * unit);
                    vertex(sideX, -3 * unit - sideY);
                    vertex(sideX + offsetX, -3 * unit - sideY + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX + sideX, -3 * unit + offsetY - sideY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
                case 2: {
                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(offsetX + sideX, offsetY - sideY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -2 * unit);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + 3 * offsetX, -2 * unit - sideY + 3 * offsetY);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, -2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    endShape();

                    break;
                }
                case 3: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(0, -3 * unit);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -3 * unit);
                    vertex(sideX, -3 * unit - sideY);
                    vertex(sideX + 2 * offsetX, -3 * unit - sideY + 2 * offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 4: { // J형
            noStroke();
            switch (r) {
                case 0: {
                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + offsetX, -2 * unit - sideY + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -2 * unit);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, 3 * offsetY - sideY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(offsetX + sideX, offsetY - sideY);
                    vertex(offsetX, offsetY);
                    endShape();


                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -3 * unit);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -3 * unit);
                    vertex(sideX, -3 * unit - sideY);
                    vertex(sideX + 2 * offsetX, -3 * unit - sideY + 2 * offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    endShape();

                    break;
                }
                case 2: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + 3 * offsetX, -2 * unit - sideY + 3 * offsetY);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, 3 * offsetY - sideY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 3: {
                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -unit);
                    vertex(sideX, -unit - sideY);
                    vertex(sideX + offsetX, -unit - sideY + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX + sideX, -3 * unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 5: { // S형
            noStroke();
            switch (r % 2) {
                case 0: {
                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -unit);
                    vertex(sideX, -unit - sideY);
                    vertex(sideX + offsetX, -unit - sideY + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(3 * offsetX + sideX, -2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -2 * unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -3 * unit);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -3 * unit);
                    vertex(sideX, -3 * unit - sideY);
                    vertex(sideX + offsetX, -3 * unit - sideY + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX + sideX, -3 * unit + offsetY - sideY);
                    vertex(offsetX + sideX, -2 * unit + offsetY - sideY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    beginShape();
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, 2 * offsetY - sideY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 6: { // S형
            noStroke();
            switch (r % 2) {
                case 0: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + 2 * offsetX, -2 * unit - sideY + 2 * offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    endShape();

                    beginShape();
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -2 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    beginShape();
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX + sideX, -unit + 3 * offsetY - sideY);
                    vertex(3 * offsetX + sideX, 3 * offsetY - sideY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    fill(blockColors[type].top);
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(sideX, -2 * unit - sideY);
                    vertex(sideX + offsetX, -2 * unit - sideY + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX + sideX, -unit + offsetY - sideY);
                    vertex(offsetX + sideX, offsetY - sideY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -2 * unit);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    fill(blockColors[type].top);
                    beginShape();
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX + sideX, -3 * unit + offsetY - sideY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    endShape();

                    fill(blockColors[type].side);
                    beginShape();
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX + sideX, -3 * unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX + sideX, -unit + 2 * offsetY - sideY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }

    }
    pop();
}

function getBlockCor(type, x, y, r) {
    let result = [];
    switch (type) {
        case 0: {
            switch (r % 2) {
                case 0: {
                    for (let i = 0; i < 4; i++) {
                        result.push({ x : x + i, y : y });
                    }
                    break;
                }
                case 1: {
                    for (let i = 0; i < 4; i++) {
                        result.push({ x : x, y : y + i });
                    }
                    break;
                }
            }

            break;
        }
        case 1: {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    result.push({ x : x + i, y : y + j});
                }
            }
            break;
        }
        case 2: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + i, y : y});
                    }
                    result.push({ x : x + 1, y : y + 1});

                    break;
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x, y : y + i});
                    }
                    result.push({ x : x + 1, y : y + 1});

                    break;
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + i, y : y + 1});
                    }
                    result.push({ x : x + 1, y : y});

                    break;
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + 1, y : y + i});
                    }
                    result.push({ x : x, y : y + 1});

                    break;
                }
            }
            break;
        }
        case 3: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + i, y : y});
                    }
                    result.push({ x : x + 2, y : y + 1});

                    break;
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x, y : y + i});
                    }
                    result.push({ x : x + 1, y : y});

                    break;
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + i, y : y + 1});
                    }
                    result.push({ x : x, y : y});

                    break;
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + 1, y : y + i});
                    }
                    result.push({ x : x, y : y + 2});

                    break;
                }
            }
            break;
        }
        case 4: {
            switch (r) {
                case 0: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + i, y : y});
                    }
                    result.push({ x : x, y : y + 1});

                    break;
                }
                case 1: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x, y : y + i});
                    }
                    result.push({ x : x + 1, y : y + 2});

                    break;
                }
                case 2: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + i, y : y + 1});
                    }
                    result.push({ x : x + 2, y : y});

                    break;
                }
                case 3: {
                    for (let i = 0; i < 3; i++) {
                        result.push({ x : x + 1, y : y + i});
                    }
                    result.push({ x : x, y : y});

                    break;
                }
            }
            break;
        }
        case 5: {
            switch (r % 2) {
                case 0: {
                    result.push({ x : x, y : y});
                    result.push({ x : x + 1, y : y});
                    result.push({ x : x + 1, y : y + 1});
                    result.push({ x : x + 2, y : y + 1});
                    break;
                }
                case 1: {
                    result.push({ x : x + 1, y : y});
                    result.push({ x : x + 1, y : y + 1});
                    result.push({ x : x, y : y + 1});
                    result.push({ x : x, y : y + 2});
                    break;
                }
            }
            break;
        }
        case 6: {
            switch (r % 2) {
                case 0: {
                    result.push({ x : x, y : y + 1});
                    result.push({ x : x + 1, y : y + 1});
                    result.push({ x : x + 1, y : y});
                    result.push({ x : x + 2, y : y});
                    break;
                }
                case 1: {
                    result.push({ x : x, y : y});
                    result.push({ x : x, y : y + 1});
                    result.push({ x : x + 1, y : y + 1});
                    result.push({ x : x + 1, y : y + 2});
                    break;
                }
            }
            break;
        }
    }
    return result;
}

function drawBlockFront(type, x, y, r) {
    push();
    let unit = height / (size * 5);
    let sideX = 2 * height / size * sin(60) * 0.3;
    let sideY = height / size * 0.3;
    let offsetX = unit * sin(60);
    let offsetY = unit * cos(60);
    translate(-2 * height / size * sin(60) + sideX / 2, 4 * height / size - sideY / 2)
    translate(x * offsetX, -y * unit + x * offsetY);
    noStroke();
    fill(blockColors[type].front);
    switch (type) {
        case 0: { // I형
            switch (r) {
                case 0: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(4 * offsetX, -unit + 4 * offsetY);
                    vertex(4 * offsetX, 4 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -4 * unit);
                    vertex(offsetX, -4 * unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 1: { // o형
            fill(blockColors[type].front);
            beginShape();
            vertex(0, 0);
            vertex(0, -2 * unit);
            vertex(2 * offsetX, -2 * unit + 2 * offsetY);
            vertex(2 * offsetX, 2 * offsetY);
            endShape();

            break;
        }
        case 2: { // T형
            switch (r) {
                case 0: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -3 * unit);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    break;
                }
                case 2: {
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    break;
                }
                case 3: {
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 3: { // L형
            switch (r) {
                case 0: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, - 2 * unit + 2 * offsetY);
                    vertex(3 * offsetX, - 2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -3 * unit);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
                case 2: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -2 * unit);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    break;
                }
                case 3: {
                    beginShape();
                    vertex(0, -2 * unit);
                    vertex(0, -3 * unit);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 4: { // J형
            switch (r) {
                case 0: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -2 * unit);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -3 * unit);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    break;
                }
                case 2: {
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    endShape();

                    break;
                }
                case 3: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 5: { // S형
            switch (r % 2) {
                case 0: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -unit);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(3 * offsetX, -2 * unit + 3 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -3 * unit);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, 2 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }
        case 6: { // S형
            switch (r % 2) {
                case 0: {
                    fill(blockColors[type].front);
                    beginShape();
                    vertex(0, -unit);
                    vertex(0, -2 * unit);
                    vertex(2 * offsetX, -2 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(3 * offsetX, -unit + 3 * offsetY);
                    vertex(3 * offsetX, 3 * offsetY);
                    vertex(offsetX, offsetY);
                    vertex(offsetX, -unit + offsetY);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(0, 0);
                    vertex(0, -2 * unit);
                    vertex(offsetX, -2 * unit + offsetY);
                    vertex(offsetX, -3 * unit + offsetY);
                    vertex(2 * offsetX, -3 * unit + 2 * offsetY);
                    vertex(2 * offsetX, -unit + 2 * offsetY);
                    vertex(offsetX, -unit + offsetY);
                    vertex(offsetX, offsetY);
                    endShape();

                    break;
                }
            }

            break;
        }

    }
    pop();
}

function splash(opacity) {
    noStroke();
    for (let i = 0; i < width / 6 * 4; i += 5) {
        let c = lerpColor(color('#FF4081'), color('#7C4DFF'), i / (width / 6 * 4))
        c.setAlpha(opacity);
        fill(c);
        rect(width / 6 + i, height / 4, 6, height / 4 * 2);
    }

    fill(255, opacity);
    textFont(pixelFont);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("TETRIS RPG", width / 2, height / 2 - 30);
    textSize(25);
    text("INTRO TO CREATIVE COMPUTING FINAL PROJECT", width / 2, height / 2 + 20);
    text("BY @IENGROUND of SOGANG ART%TECHNOLOGY", width / 2, height / 2 + 40);

    text("Click to Start!", width / 2, height / 2 + 80);
}

function drawNextBlock(x, y, nextBlock, nextRotate) {
    let unitX = 2 * height / size * sin(60) * 0.45 / 6;
    let unitY = 2 * height / size * cos(60) * 0.45 / 6;
    let unitZ = 2 * height / size * 0.45 / 6;

    push();
    noStroke();
    translate(x, y);
    fill(blockColors[nextBlock].side);
    switch (nextBlock) {
        case 0: {
            switch (nextRotate % 2) {
                case 0: {
                    beginShape();
                    vertex(unitX, -unitY - 3 * unitZ);
                    vertex(5 * unitX, -5 * unitY - 3 * unitZ);
                    vertex(5 * unitX, -5 * unitY - 2 * unitZ);
                    vertex(unitX, -unitY - 2 * unitZ);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - 5 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 5 * unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    endShape();

                    break;
                }
            }
            break;
        }
        case 1: {
            beginShape();
            vertex(2 * unitX, -2 * unitY - 2 * unitZ);
            vertex(4 * unitX, -4 * unitY - 2 * unitZ);
            vertex(4 * unitX, -4 * unitY - 4 * unitZ);
            vertex(2 * unitX, -2 * unitY - 4 * unitZ);
            endShape();

            break;
        }
        case 2: {
            switch (nextRotate) {
                case 0: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    vertex(unitX, -unitY - 3 * unitZ);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    endShape();

                    break;
                }
                case 2: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ);
                    vertex(unitX, -unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - 2 * unitZ);
                    endShape();

                    break;
                }
                case 3: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - 2 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    endShape();

                    break;
                }
            }
            break;
        }
        case 3: {
            switch (nextRotate) {
                case 0: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - unitZ);
                    vertex(unitX, -unitY - unitZ);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    vertex(4 * unitX, -4 * unitY - unitZ);
                    endShape();

                    break;
                }
                case 2: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ);
                    vertex(unitX, -unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 2 * unitZ);
                    endShape();

                    break;
                }
                case 3: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    endShape();

                    break;
                }
            }
            break;
        }
        case 4: {
            switch (nextRotate) {
                case 0: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ);
                    vertex(unitX, -unitY - 4 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    endShape();

                    break;
                }
                case 2: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ);
                    vertex(unitX, -unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    endShape();

                    break;
                }
                case 3: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - unitZ);
                    endShape();

                    break;
                }
            }
            break;
        }
        case 5: {
            switch (nextRotate % 2) {
                case 0: {
                    beginShape();
                    vertex(unitX, -unitY - 2 * unitZ)
                    vertex(unitX, -unitY - 3 * unitZ)
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ)
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ)
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ)
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ)
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ)
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ)
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - 2 * unitZ)
                    vertex(2 * unitX, -2 * unitY - 4 * unitZ)
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ)
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ)
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ)
                    vertex(4 * unitX, -4 * unitY - unitZ)
                    vertex(3 * unitX, -3 * unitY - unitZ)
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ)
                    endShape();

                    break;
                }
            }
        }
        case 6: {
            switch (nextRotate % 2) {
                case 0: {
                    beginShape();
                    vertex(unitX, -unitY - 3 * unitZ);
                    vertex(unitX, -unitY - 4 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 3 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 2 * unitZ);
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    endShape();

                    break;
                }
                case 1: {
                    beginShape();
                    vertex(2 * unitX, -2 * unitY - unitZ);
                    vertex(2 * unitX, -2 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 3 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 4 * unitZ);
                    vertex(4 * unitX, -4 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - 2 * unitZ);
                    vertex(3 * unitX, -3 * unitY - unitZ);
                    endShape();

                    break;
                }
            }

            break;
        }
    }
    pop();
}

function mouseClicked() {
    if (!gameStart) {
        gameStart = true;
        gameStartTime = frameCount;
    }

    let copy = Array.from(Array(20), () => Array(10).fill(0));
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            copy[19 - i][j] = blockMap[j][i];
        }
    }

    print(copy);


}

function getRandomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function keyPressed(key) {
    print(key.code);
    switch (key.code) {
        case "ArrowLeft": {
            if (charX > 0) {
                charX--;
            }
            break;
        }
        case "ArrowRight": {
            if (charX < 6) {
                charX++;
            }
            break;
        }
        case "ArrowDown": {
            if (charY < 18) {
                charY++;
            }
            break;
        }
        case "ArrowUp": {
            if (charY > 0) {
                charY--;
            }
            break;
        }
        case "Space": {
            charZ++;
            break;
        }
        case "KeyA": {
            testBlock = (testBlock + 6) % 7;
            break;
        }
        case "KeyD": {
            testBlock = (testBlock + 1) % 7;
            break;
        }
        case "KeyS": {
            testRotate = (testRotate + 3) % 4;
            break;
        }
        case "KeyW": {
            testRotate = (testRotate + 1) % 4;
            break;
        }
    }
    print(charX, charY, charZ);
}