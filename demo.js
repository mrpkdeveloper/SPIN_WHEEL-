var StateMain = {
    preload: function () {
        game.load.image("closeButton", "assets/pin.png");
        game.load.image("boxBack", "assets/back.jpg");
        game.load.image("testButton", "assets/button.png");
    },
    create: function () {
        //create a test button to launch the message box
        var buttonTest = game.add.sprite(game.width / 2, game.height / 2, "testButton");
        buttonTest.anchor.set(0.5, 0.5);
        buttonTest.inputEnabled = true;
        buttonTest.events.onInputDown.add(this.testMessageBox, this);
    },
    testMessageBox() {
        //call this line of code when you want to show the message box
        //message, width and height
        this.showMessageBox("HELLO THERE! Put Some Text Here!", game.width * .7, game.height * .5);
    },
    //
    //w=width
    //h=height
    //
    showMessageBox(text, w = 300, h = 300) {
        //just in case the message box already exists
        //destroy it
        if (this.msgBox) {
            this.msgBox.destroy();
        }
        //make a group to hold all the elements
        var msgBox = game.add.group();
        //make the back of the message box
        var back = game.add.sprite(0, 0, "boxBack");
        //make the close button
        var closeButton = game.add.sprite(0, 0, "closeButton");
        //make a text field
        var text1 = game.add.text(0, 0, text);
        //set the textfeild to wrap if the text is too long
        text1.wordWrap = true;
        //make the width of the wrap 90% of the width 
        //of the message box
        text1.wordWrapWidth = w * .9;
        //
        //
        //set the width and height passed
        //in the parameters
        back.width = w;
        back.height = h;
        //
        //
        //
        //add the elements to the group
        msgBox.add(back);
        msgBox.add(closeButton);
        msgBox.add(text1);
        //
        //set the close button
        //in the center horizontally
        //and near the bottom of the box vertically
        closeButton.x = back.width / 2 - closeButton.width / 2;
        closeButton.y = back.height - closeButton.height;
        //enable the button for input
        closeButton.inputEnabled = true;
        //add a listener to destroy the box when the button is pressed
        closeButton.events.onInputDown.add(this.hideBox, this);
        //
        //
        //set the message box in the center of the screen
        msgBox.x = game.width / 2 - msgBox.width / 2;
        msgBox.y = game.height / 2 - msgBox.height / 2;
        //
        //set the text in the middle of the message box
        text1.x = back.width / 2 - text1.width / 2;
        text1.y = back.height / 2 - text1.height / 2;
        //make a state reference to the messsage box
        this.msgBox = msgBox;
    },
    hideBox() {
        //destroy the box when the button is pressed
        this.msgBox.destroy();
    },
    update: function () { }
}

var game = new Phaser.Game(StateMain)