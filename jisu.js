let mic, level, img, img1, img2, img3, img4, img5, keyimg1, keyimg2, keyimg3, keyimg4;
let player_name;
let fs;
let cnt = 0;
let inp1, inp2;
let b = false;
let g1 = 1;
let g2 = 1;
let g3 = 1;
let g4 = 1;
let mode = 'start';
const max_particles = 100;
let wave_particles = [];
let letters = ['o', 'c', 'e', 'a', 'n', 's', 'u', 'r', 'f'];
let bg_particles = [], ver = 0, bar = 200, bg = 100, bb = 200, br = 100;
let shark_x = [];
let shark_y = [];
let shark_v = [];
let shark_direction = [];
let fft;

function preload() {
    img = loadImage('game1_char.png');
    img1 = loadImage("surfer1.png");
    img2 = loadImage("surfer2.png");
    img3 = loadImage("surfer3.png");
    img4 = loadImage("shark.png");
    img5 = loadImage("shark2.png");
    keyimg1 = loadImage('key1.png');
    keyimg2 = loadImage('key2.png');
    keyimg3 = loadImage('key3.png');
    keyimg4 = loadImage('key4.png');
}

class ptc {
    constructor(x, y, sz, c) {
        this.x = x;
        this.y = y;
        this.sz = sz;
        this.c = c;
    }

    render() {
        noStroke();
        fill(this.c);
        ellipse(this.x, this.y, this.sz, this.sz);
    }

    render2() {
        noStroke();
        fill(this.c);
        let r = random(4, 21);
        triangle(this.x, this.y - r, this.x - (r / 2) * pow(3, 0.5), this.y + (r / 2), this.x + (r / 2) * pow(3, 0.5), this.y + (r / 2));
        triangle(this.x, this.y + r, this.x - (r / 2) * pow(3, 0.5), this.y - (r / 2), this.x + (r / 2) * pow(3, 0.5), this.y - (r / 2));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    for (let i = 0; i < 70; i++) {
        bg_particles[i] = new S();
    }
    let a1 = textWidth('Do you want to join me?');
    inp1 = createInput('');
    inp1.position(width / 3 * 2, height / 8 * 3 - inp1.height);
    inp1.size(170);
    inp1.hide();

    let xChoice = [0, width];
    let directionChoice = [1, -1];
    for (let i = 0; i < 5; i++) {
        let choice = Math.floor(Math.random() * 2);
        shark_y.push(getRandomInt(0, height));
        shark_direction.push(directionChoice[choice]);
        shark_x.push(xChoice[choice]);

        shark_v.push(getRandomInt(1, 3));
    }

}

function mousePressed() {
    textSize(32);
    // textFont
    let tWidth = textWidth("WELCOME TO CREATIVE COMPUTING WORLD");
    if (mouseX >= (width - tWidth) / 2 && mouseX <= (width + tWidth) / 2 && mouseY >= (height - 32) / 2 && mouseY <= (height + 32) / 2 && (mode === 'start')) {
        mode = 'game1';
        inp1.show();
        g1 = 2;
        b = true;
    }

    let nameTextWidth = textWidth("Do you want to join me?");
    textSize(16);
    let enterTextWidth = textWidth("Enter");
    if (mouseX >= (width / 3 * 2 + nameTextWidth / 2 - 8 - enterTextWidth) && mouseX <= (width / 3 * 2 + nameTextWidth / 2 - 8) && mouseY >= (height / 8 * 3 + 20 - 8) && mouseY <= (height / 8 * 3 + 20 + 8) && (mode === 'game1')) {
        player_name = inp1.value();
        fs = 1;
        VER();

    }
    let yesTextWidth = textWidth("Yes");
    if (mouseX >= (width / 3 * 2 - yesTextWidth - 10) && mouseX <= (width / 3 * 2 - 10) && mouseY >= (height / 8 * 5 - 16) && mouseY <= (height / 8 * 5 + 16) && (mode === 'game1')) {
        mode = 'game2';
        inp1.hide();
        g2 = 2;
    }
    let noTextWidth = textWidth("No");
    if (mouseX >= (width / 3 * 2 + yesTextWidth + 10 - noTextWidth) && mouseX <= (width / 3 * 2 + yesTextWidth + 10) && mouseY >= (height / 8 * 5 - 16) && mouseY <= (height / 8 * 5 + 16) && (mode === 'game1')) {
        b = false;
        mode = 'start';
        inp1.hide();
    }
}

function draw() {
    switch (mode) {
        case 'start' :
            if (!b) {
                background(0);
                fft.analyze();
                let center = fft.getCentroid();
                level = mic.getLevel();
                noStroke();
                let colorR = random(30, level * 50000);
                let colorG = random(30, level * 50000);
                let colorB = random(30, level * 50000);
                fill(colorR, colorG, colorB);
                textSize(32);
                textAlign(CENTER);
                text('WELCOME TO CREATIVE COMPUTING WORLD', width / 2, height / 2);
                fill(255);
                textSize(20);
                text('click to start!', width / 2, height / 2 + 32);
            }
            break;

        case 'game1' :
            if (g1 === 2) {
                background(255);
                background(br + mouseX / 5, bg + mouseX / 5, bb + mouseX / 3);
                for (let j = 0; j < 70; j++) {
                    bg_particles[j].show();
                    bg_particles[j].update();
                }
                randomSeed(0);
                strokeWeight(2.5);
                if (ver === 0) {
                    stroke(200, 200, 255, 100);
                }
                if (ver === 1) {
                    stroke(255, 220, 220, 100);
                }
                let x, y;
                let delta = map(mouseX, 0, windowWidth, 70, 200);
                for (y = 0; y < windowHeight + delta; y += delta) {
                    for (x = 0; x < windowWidth + delta * 2; x += delta) {
                        noFill();
                    }
                }
                //게임 설명
                fill(255);
                noStroke();
                textSize(32);
                textAlign(LEFT);
                text('STAGE1: CONVERSATION ABOUT YOU', 10, 42);
                //말풍선1
                let q1Width = textWidth('What is your name?');
                let q2Width = textWidth('Do you want to join me?');
                noStroke();
                image(img, -5, height / 6, width / 3 - q1Width / 2 - 38, width / 3 - q1Width / 2 - 38);
                fill(255, 255, 255, 100);
                drawBubble(width / 3, height / 4, q2Width + 20, 64);
                textSize(32);
                textAlign(LEFT);
                fill(0);
                text('What is your name?', width / 3 - q2Width / 2, height / 4);
                //대답하는 말풍선1 & 입력칸
                noStroke();
                fill(255, 255, 255, 100);
                drawBubble(width / 3 * 2, height / 8 * 3, q2Width + 20, 64);
                textSize(32);
                textAlign(LEFT);
                fill(0);
                text('My name is', width / 3 * 2 - q2Width / 2, height / 8 * 3);
                textAlign(RIGHT);
                textSize(16);
                text('Enter', width / 3 * 2 + q2Width / 2 - 8, height / 8 * 3 + 20);
                //말풍선2
                noStroke();
                fill(255, 255, 255, 100);
                textSize(32);
                textAlign(LEFT);
                noStroke();
                drawBubble(width / 3, height / 2, q2Width + 20, 64);
                image(img, -5, height / 12 * 5, width / 3 - q1Width / 2 - 38, width / 3 - q1Width / 2 - 38);
                fill(0);
                text('Do you want to join me?', width / 3 - q2Width / 2, height / 2);
                //대답하는 말풍선2 & 입력칸
                noStroke();
                let a3 = textWidth('Yes');
                fill(255, 255, 255, 100);
                drawBubble(width / 3 * 2, height / 8 * 5, q2Width + 20, 64);
                textSize(32);
                textAlign(LEFT);
                fill(0);
                text('Yes', width / 3 * 2 - a3 - 10, height / 8 * 5);
                textAlign(RIGHT);
                text('No', width / 3 * 2 + a3 + 10, height / 8 * 5);
            }
            break;
        case 'game2' :
            if (g2 === 2) {
                background(255);
                image(img, -40, 10, 400, 400);
                textSize(70);
                textAlign(RIGHT);
                let ptext = textWidth('press');
                text('press', width / 2 - ptext / 2, 200);
                text('press', width / 2 - ptext / 2, 350);
                text('press', width / 2 - ptext / 2, 500);
                text('press', width / 2 - ptext / 2, 650);
                textAlign(LEFT);
                image(keyimg1, width / 2 - 500, -300);
                text('for ver1', width / 2 + ptext / 2, 200);
                image(keyimg2, width / 2 - 500, -150);
                text('for ver2', width / 2 + ptext / 2, 350);
                image(keyimg3, width / 2 - 500, 0);
                text('for ver3', width / 2 + ptext / 2, 500);
                image(keyimg4, width / 2 - 500, 150);
                text('for ver4', width / 2 + ptext / 2, 650);
                g2 = 3;
            }
            if (g2 === 3) {
                if (keyIsPressed) {
                    if (key === '1') {
                        mode_1();
                        if (mouseIsPressed) {
                            bubbles();
                        }
                        textSize(30);
                        fill(255);
                    } else if (key === '2') {
                        mode_2();
                        if (mouseIsPressed) {
                            stars();
                        }
                        textSize(30);
                        fill(255);
                    } else if (key === '3') {
                        mode_3();
                        if (mouseIsPressed) {
                            texts();
                        }
                        textSize(30);
                        fill(255);
                    } else if (key === '4') {
                        mode_4();
                        if (mouseIsPressed) {
                            if (mouseX > 0 && mouseX < windowWidth / 3) {
                                bubbles();
                            } else if (mouseX > windowWidth / 3 && mouseX < windowWidth / 3 * 2) {
                                stars();
                            } else {
                                texts();
                            }
                        }
                        textSize(30);
                        fill(255);
                        stroke(random(0, 255), random(0, 255), random(0, 255));
                    }
                    sharkMovement();
                    for (let i = 0; i < 5; i++) {
                        if (dist(mouseX, mouseY, shark_x[i], shark_y[i]) <= 50) {
                            mode = 'game3';
                            g3 = 2;
                        }
                    }
                }
            }
            break;

        case 'game3' :

            break;
        //case 'game4' :
        //case 'next' :
    }

}

function S() {
    this.x = random(0, width);
    this.y = random(0, -height);
    this.xx = random(0, width);
    this.yy = random(0, -height);
    this.xxx = random(0, width);
    this.yyy = random(0, -height);
    this.show = function () {
        if (ver === 1) {
            noStroke();
            fill(255);
            ellipse(this.x, this.y, random(1, 10), random(1, 10));
            if (mouseX < windowWidth / 1.5) {
                fill(255, 100, 100);
                ellipse(this.xx, this.yy, random(1, 10), random(1, 10));
            }
            if (mouseX < windowWidth / 3) {
                fill(255, 70, 70);
                ellipse(this.xxx, this.yyy, random(1, 20), random(1, 20));
            }
        }

        if (ver === 0) {
            noStroke();
            let red = random(150, 255);
            let green = random(150, 255);
            let blue = random(150, 255);
            let w1 = random(5, 100);
            let w2 = random(5, 100);
            let w3 = random(5, 100);
            let w4 = random(5, 100);
            let w5 = random(5, 100);
            let w6 = random(5, 100);
            let w7 = random(5, 100);
            let w8 = random(5, 100);
            let w = random(30, 200);
            if (mouseX < windowWidth / 4) {
                fill(255, 220, 0);
                ellipse(this.xx, this.yy, 4, 4);
                triangle(this.xx - 2, this.yy, this.xx + 2, this.yy, this.xx, this.yy + 6);
                triangle(this.xx - 2, this.yy, this.xx + 2, this.yy, this.xx, this.yy - 6);
                triangle(this.xx - 1, this.yy + 1, this.xx - 1, this.yy - 1, this.xx - 4, this.yy);
                triangle(this.xx + 1, this.yy + 1, this.xx + 1, this.yy - 1, this.xx + 4, this.yy);
            }
            if (mouseX < windowWidth / 2.5) {
                fill(red, green, blue);
                ellipse(this.xxx, this.yyy, 5, 5);
                ellipse(this.xxx + w, this.yyy + w, 5, 5);
                ellipse(this.xxx - w, this.yyy - w, 5, 5);
            }
            fill(255);
            ellipse(this.x, this.y, 4, 4);
            triangle(this.x - 2, this.y, this.x + 2, this.y, this.x, this.y + 6);
            triangle(this.x - 2, this.y, this.x + 2, this.y, this.x, this.y - 6);
            triangle(this.x - 2, this.y + 1, this.x - 2, this.y - 1, this.x - 6, this.y);
            triangle(this.x + 2, this.y + 1, this.x + 2, this.y - 1, this.x + 6, this.y);

            for (let v = 0; v < 3; v++) {
                ellipse(this.x + w1, this.y + w5, 2, 2);
                ellipse(this.x + w2, this.y - w6, 2, 2);
                ellipse(this.x - w3, this.y - w7, 2, 2);
                ellipse(this.x - w4, this.y + w8, 2, 2);
            }
        }
    }
    this.update = function () {
        this.speed = random(2, 8);
        this.gravity = 1.05;
        this.x = this.x;
        this.y = this.y + this.speed * this.gravity;
        this.xx = this.xx;
        this.yy = this.yy + this.speed * this.gravity;
        this.xxx = this.xxx;
        this.yyy = this.yyy + this.speed * this.gravity;

        if (this.y > height) {
            this.y = random(0, -height);
        }
        if (this.x > width) {
            if (this.y < height) {
                this.x = 0;
            } else {
                this.x = random(0, width);
            }
        }

        if (this.yy > height) {
            this.yy = random(0, -height);
        }
        if (this.xx > width) {
            if (this.yy < height) {
                this.xx = 0;
            } else {
                this.xx = random(0, width);
            }
        }

        if (this.yyy > height) {
            this.yyy = random(0, -height);
        }
        if (this.xxx > width) {
            if (this.yyy < height) {
                this.xxx = 0;
            } else {
                this.xxx = random(0, width);
            }
        }
    }

}

function VER() {
    if (fs === 1) {
        br = 200;
        bg = 100;
        bb = 100;
        ver = 1;
    }
    if (fs === 0) {
        br = 100;
        bg = 100;
        bb = 200;
        ver = 0;
    }
}

function drawBubble(x, y, w, h) {
    rect(x - w / 2, y - h / 2, w, h);
    if (x < width / 2) {
        triangle(x - w / 2 - 48, y - h / 2, x - w / 2, y - h / 2, x - w / 2, y - h / 4);
    } else {
        triangle(x + w / 2 + 48, y - h / 2, x + w / 2, y - h / 2, x + w / 2, y - h / 4);
    }
}

function mode_1() {
    if (mouseX > 0) {
        image(img1, mouseX - 50, mouseY - 50);
    }
    colorMode(RGB);
    background(36, 222, 203, 50);
    colorMode(HSL);
    for (let i = 0; i < max_particles; i++) {
        wave_particles[i] = new ptc(random(mouseX, windowWidth), random(mouseY + 120, windowHeight / 2), random(3, 30), color(182, 77, random(50, 150)));
    }
    for (let i = 0; i < max_particles; i++) {
        wave_particles[i].render();
    }
}

function mode_2() {
    if (mouseX > 0) {
        image(img2, mouseX - 50, mouseY - 50);
    }
    colorMode(RGB);
    background(30, 85, 185, 50);
    colorMode(HSL);
    for (let i = 0; i < max_particles; i++) {
        wave_particles[i] = new ptc(random(-windowWidth, mouseX), random(-windowHeight / 2, mouseY + 120), random(10, 30), color(random(20, 80), random(50, 100), random(50, 100)));
    }
    for (let i = 0; i < max_particles; i++) {
        wave_particles[i].render2();
    }
}

function mode_3() {
    if (mouseX > 0) {
        image(img3, mouseX - 50, mouseY - 50);
    }
    colorMode(RGB);
    background(233, 175, 254, 50);
    colorMode(HSL);
    for (let j = 0; j < max_particles; j++) {
        for (let i = 0; i < 8; i++) {
            textSize(12);
            fill(random(0, 255), random(0, 255), random(0, 255));
            text(letters[i], random(mouseX - windowWidth, windowWidth), random(mouseY + 120, windowHeight / 2));
        }
    }

}

function mode_4() {
    if (mouseX > 0 && mouseX < windowWidth / 3) {
        image(img1, mouseX - 50, mouseY - 50);
    } else if (mouseX > windowWidth / 3 && mouseX < windowWidth / 3 * 2) {
        image(img2, mouseX - 50, mouseY - 50);
    } else {
        image(img3, mouseX - 50, mouseY - 50);
    }
    colorMode(RGB);
    background(255, 255, 255, 50);
    c1 = random(100, 255);
    c2 = random(100, 255);
    for (let i = 0; i < width; i++) {
        stroke(155 + i / 9, c1, c2, 50);
        line(i, 0, i, height);
    }
    colorMode(HSL);
    if (mouseX > 0 && mouseX < windowWidth / 3) {
        for (let i = 0; i < max_particles; i++) {
            wave_particles[i] = new ptc(random(mouseX, windowWidth), random(mouseY + 120, windowHeight / 2), random(3, 30), color(182, 77, random(50, 150)));
        }
        for (let i = 0; i < max_particles; i++) {
            wave_particles[i].render();
        }
    } else if (mouseX > windowWidth / 3 && mouseX < windowWidth / 3 * 2) {
        for (let i = 0; i < max_particles; i++) {
            wave_particles[i] = new ptc(random(-windowWidth, mouseX), random(-windowHeight / 2, mouseY + 120), random(10, 30), color(random(20, 80), random(50, 100), random(50, 100)));
        }
        for (let i = 0; i < max_particles; i++) {
            wave_particles[i].render2();
        }
    } else {
        for (let j = 0; j < max_particles; j++) {
            for (let i = 0; i < 8; i++) {
                textSize(12);
                fill(random(0, 255), random(0, 255), random(0, 255));
                text(letters[i], random(mouseX - windowWidth, windowWidth), random(mouseY + 120, windowHeight / 2));
            }
        }
    }
}

function bubbles() {
    let sizes = random(1, 5);
    for (let i = 0; i < 50; i++) {
        let x3 = random(0, width);
        let y3 = random(0, height);
        fill(255, 255, 255);
        noStroke();
        ellipse(x3, y3, sizes, sizes);
    }
}

function stars() {
    let sizes = random(1, 5);
    for (let i = 0; i < 50; i++) {
        let x3 = random(0, width);
        let y3 = random(0, height);
        colorMode(RGB);
        fill(255, 255, 0);
        noStroke();
        ellipse(x3, y3, sizes, sizes);
    }
}

function texts() {
    for (let i = 0; i < 25; i++) {
        let x3 = random(0, width);
        let y3 = random(0, height);
        colorMode(RGB);
        fill(255);
        textSize(random(5, 15));
        text('surf', x3, y3);
    }
    for (let i = 0; i < 25; i++) {
        let x3 = random(0, width);
        let y3 = random(0, height);
        colorMode(RGB);
        fill(random(10, 100), random(10, 100), 255);
        textSize(random(5, 15));
        text('words', x3, y3);
    }

}

function getRandomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function sharkMovement() {
    for (let i = 0; i < 5; i++) {
        shark_x[i] += (shark_v[i] * shark_direction[i]);
        if (shark_x[i] < 0 || shark_x[i] > width) {
            shark_direction[i] = -shark_direction[i];
            shark_y[i] -= 20;
        }
        if (shark_direction[i] === -1) {
            image(img5, shark_x[i], shark_y[i], 100, 100);
        } else {
            image(img4, shark_x[i], shark_y[i], 100, 100);
        }
    }
}