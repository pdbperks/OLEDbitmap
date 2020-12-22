input.onButtonPressed(Button.A, function () {
    // basic.rotateTo(DAL.MICROBIT_DISPLAY_ROTATION_90)
    // DAL.MICROBIT_DISPLAY_ROTATION_180
    basic.showNumber(5)
    OLED.clear()
    OLED.bitmap(
    OLED.bitmapImage,
    0,
    7,
    0,
    127
    )
})
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    OLED.clear()
    OLED.writeStringNewLine("OLED demonstration")
    OLED.bitmap(
    OLED.bitmapHead55x56,
    1,
    7,
    60,
    114
    )
    while (!(input.buttonIsPressed(Button.A))) {
        OLED.writeBigNumber(3, 0, input.temperature(), true)
        OLED.progressBar(
        Math.map(input.acceleration(Dimension.X), -900, 900, 0, 50),
        7,
        0,
        50,
        false
        )
        OLED.progressBarV(
        Math.map(input.acceleration(Dimension.Y), -900, 900, 0, 56),
        0,
        119,
        56
        )
        basic.pause(50)
    }
})
// OLED.writeStringNewLine("@pdbperks")
input.onButtonPressed(Button.B, function () {
    OLED.clear()
    OLED.bitmap(
    OLED.bitmapImage2,
    0,
    7,
    0,
    127
    )
    OLED.cursorTo(7, 70)
    OLED.writeStringNewLine("@pdbperks")
})
OLED.init(128, 64)
OLED.setDisplayFlip(true, true)
// bitmapHolder = "OLED.bigfont"
OLED.writeStringNewLine("OLED demonstration")
OLED.writeStringNewLine("Press a button")
OLED.bigChar(3,50,"+")
