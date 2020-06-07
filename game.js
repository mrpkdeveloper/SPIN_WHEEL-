let config = {
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let game = new Phaser.Game(config)

function preload() {
    // console.log("in preload")
    //load an image
    this.load.image('background', "assets/back.jpg")
    this.load.image('wheel', "assets/wheel.png")
    // this.load.image('background', "back.jpg")

}
function create() {
    // console.log("in create")
    let w = game.config.width
    let h = game.config.height

    //this statement creates image on page
    //background
    this.add.sprite(0, 0, "background")

    //wheel
    this.wheel = this.add.sprite(w / 2, h / 2, "wheel")
    this.wheel.setScale(0.25)


}
function update() {
    console.log("in update")
}