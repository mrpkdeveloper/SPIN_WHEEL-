let config = {
    width: 1270,
    height: 550,
    scene: {
        preload: preload,
        create: create,
    }
}

let prizes_config = {
    count: 12,
    prize_names: ["3000 Credits", "35% Off", "Hard Luck", "70% OFF", "Swagpack", "100% OFF", "Netflix", "50% Off", "Amazon Voucher", "2 Extra Spin", "CB Tshirt", "CB Book"]
}

var game = new Phaser.Game(config)

function preload() {
    //load an image
    this.load.image('background', "assets/back.jpg")
    this.load.image('wheel', "assets/wheel.png")
    this.load.image('pin', "assets/pin.png")
    this.load.image('stand', "assets/stand.png")
    this.load.image('button', "assets/button.png")
    this.load.audio('music', "assets/music.ogg")
    this.load.audio('coin', "assets/coin.ogg")
    this.load.audio('result', "assets/world.wav")
    this.load.image('play_again', "assets/play_again2.png")
    // this.load.image('logo', "assets/spin-n-win-logo.png")

}
function create() {
    // console.log("in create")
    let W = game.config.width
    let H = game.config.height

    //this statement creates image on page
    //background
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setPosition(W / 2, H / 2);
    this.background.setScale(0.20);
    this.background.setTint(999999);

    //lets create the stand
    let stand = this.add.sprite(W / 2 + 240, H / 2 + 250, 'stand');
    stand.setScale(0.25);

    //lets create a pin
    let pin = this.add.sprite(W / 2 + 240, H / 2 - 250, "pin");
    pin.setScale(0.25);
    pin.depth = 1;

    //wheel
    this.wheel = this.add.sprite(W / 2 + 240, H / 2, "wheel")
    this.wheel.setScale(0.25)


    //sound
    this.soundwheel = this.sound.add("music")
    this.coin = this.sound.add("coin")
    this.result = this.sound.add("result")

    //button
    this.button = this.add.sprite(W / 2 - 290, H / 2, 'button').setInteractive({ useHandCursor: true });
    this.button.setScale(1.5)
    this.button.on('pointerover', pointerover, this);

    function pointerover() {
        // console.log("over")
        this.button.setTint(99999);
        this.coin.play();
    }

    this.button.on('pointerout', function (pointer) { /* Do something when the mouse exits. */
        // console.log("out")
        this.clearTint();

    });
    this.button.on('pointerdown', spinwheel, this); // Start game on click.
    tween = this.tweens.add({
        targets: this.button,
        x: W / 2 - 270,
        // ease: "Cubic.easeOut",
        // duration: 1000,
        ease: 'Power1',
        duration: 1000,
        yoyo: true,
        callbackScope: this,
        onComplete: function () { console.log("complete") }
    });

    //for text diplayed
    font_style = {
        font: "bold 45px Arial",
        align: "center",
        color: "white",
        padding: 5,
        // backgroundColor: '#ff00ff'
    }

    font_style2 = {
        font: "bold 60px Arial",
        anchor: 0.5,
        align: "center",
        color: "white",
        padding: 8,
        // backgroundColor: 'white',
        height: 10,
        width: 50
    }

    this.game_text = this.add.text(150, 20, "Welcome to Spin & Win", font_style);
    this.result_text = this.add.text(W / 2, H / 2 - 120, "", font_style2).setOrigin(0.5)
    this.result_text.setVisible(false)

    //play again btn
    this.play_again = this.add.sprite(W / 2, H / 2 + 100, 'play_again').setInteractive({ useHandCursor: true })
    this.play_again.setScale(1)
    this.play_again.setVisible(false)


}








function spinwheel() {
    this.result_text.setVisible(false)
    this.result_text.setText("");
    var musicconfig = {
        mute: false,
        volume: 1,
        rate: 1,
        loop: false,
        delay: 0
    }
    this.soundwheel.play(musicconfig);

    let rounds = Phaser.Math.Between(2, 4);
    let degrees = Phaser.Math.Between(0, 11) * 30;

    let total_angle = rounds * 360 + degrees;
    console.log(total_angle);

    let idx = prizes_config.count - 1 - Math.floor(degrees / (360 / prizes_config.count));
    // this.button.setVisible(false);
    this.button.removeInteractive();

    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function () {
            this.result.play()
            this.result_text.setText("You won " + prizes_config.prize_names[idx]);
            this.result_text.setVisible(true)
            this.result_text.setScale(1.5)
            this.play_again.setVisible(true)
            this.wheel.setTint(999999);
            this.button.setTint(999999);
            this.game_text.setTint(999999);
            this.play_again.on('pointerover', function (event) { /* Do something when the mouse enters */
                console.log("over")
                this.setTint(999999);
            });
            this.play_again.on('pointerout', function (pointer) { /* Do something when the mouse exits. */
                console.log("out")
                this.clearTint();

            });
            this.play_again.on('pointerdown', after_spin, this);

        }
    });

}


function after_spin() {
    console.log("button clicked")
    this.result_text.setVisible(false)
    this.play_again.setVisible(false)
    this.button.clearTint();
    this.wheel.clearTint();
    this.game_text.clearTint();
    this.button.setInteractive({ useHandCursor: true });
}