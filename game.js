let config = {
    width: 1250,
    height: 550,
    scene: {
        preload: preload,
        create: create,
        // update: update
    }
}

let prizes_config = {
    count: 12,
    prize_names: ["3000 Credits", "35% Off", "Hard Luck", "70% OFF", "Swagpack", "100% OFF", "Netflix", "50% Off", "Amazon Voucher", "2 Extra Spin", "CB Tshirt", "CB Book"]
}

var game = new Phaser.Game(config)
var button;

function preload() {
    // console.log("in preload")
    //load an image
    this.load.image('background', "assets/back.jpg")
    this.load.image('wheel', "assets/wheel.png")
    this.load.image('pin', "assets/pin.png")
    this.load.image('stand', "assets/stand.png")
    this.load.image('button', "assets/button.png")

}
function create() {
    // console.log("in create")
    let W = game.config.width
    let H = game.config.height

    //this statement creates image on page
    //background
    let background = this.add.sprite(0, 0, 'background');
    background.setPosition(W / 2, H / 2);
    background.setScale(0.20);
    // background.depth = 1;

    //lets create the stand
    let stand = this.add.sprite(W / 2, H / 2 + 250, 'stand');
    stand.setScale(0.25);

    //lets create a pin
    let pin = this.add.sprite(W / 2, H / 2 - 250, "pin");
    pin.setScale(0.25);
    pin.depth = 1;

    //wheel
    this.wheel = this.add.sprite(W / 2, H / 2, "wheel")
    this.wheel.setScale(0.25)

    //button
    this.button = this.add.sprite(W / 2 + 500, H / 2, 'button').setInteractive();
    this.button.setScale(0.50)
    this.button.on('pointerover', function (event) { /* Do something when the mouse enters */
        console.log("over")
    });
    this.button.on('pointerout', function (event) { /* Do something when the mouse exits. */
        console.log("out")
    });
    this.button.on('pointerdown', spinwheel, this); // Start game on click.

    //for text diplayed
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(10, 10, "Welcome to Spin & Win", font_style);

    //event listener for mouse click
    // this.input.on("pointerdown", spinwheel, this);

}
// function update() {
//     console.log("in update")
//     // this.wheel.angle += 1;
// }

function up() {
    console.log('button up', arguments);
}
function spinwheel() {

    console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");

    let rounds = Phaser.Math.Between(2, 4);
    let degrees = Phaser.Math.Between(0, 11) * 30;

    let total_angle = rounds * 360 + degrees;
    console.log(total_angle);

    let idx = prizes_config.count - 1 - Math.floor(degrees / (360 / prizes_config.count));
    this.button.removeInteractive();

    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function () {
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
            this.button.setInteractive();
        },
    });

}