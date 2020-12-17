input.onButtonPressed(Button.A, function () {
    // basic.rotateTo(DAL.MICROBIT_DISPLAY_ROTATION_90)
    // DAL.MICROBIT_DISPLAY_ROTATION_180
    basic.showNumber(5)
    OLED.bitmap(OLED.bitmapImage,2,6);
})
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    OLED.clear()
    OLED.writeStringNewLine("OLED demonstration")
    while (!(input.buttonIsPressed(Button.A))) {
        OLED.writeBigNumber(
        3,
        0,
        input.temperature(),
        true
        )
        OLED.progressBar(
        Math.map(input.acceleration(Dimension.X), -900, 900, 0, 120),
        7,
        0,
        120
        )
        basic.pause(50)
    }
})
input.onButtonPressed(Button.B, function () {
    OLED.writeStringNewLine("@pdbperks")
    OLED.writeStringNewLine("hacker")
})
OLED.init(128, 64)
OLED.writeStringNewLine("OLED demonstration")
OLED.writeStringNewLine("Press a button")
OLED.bigChar(3,50,"+")
OLED.bitmapImage = hex`
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
0000000000030F070107FFFFFFFFFFC7
0707070303070707070707070F1F1F7F
FF1E1000000000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
000000000000000000F0FFFFFFFFFFF0
000000008080C0C0C0C0C1C0E2FEFEFC
F8F00000000000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
000000000000000000FFFFFFFFFFFFFF
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
FFFF0000000000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
0000000000000000079FFFFFCFCFCFCF
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
FFFFFC3C1E0000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
0000000000000000F8FFFFFFFFFFFFFF
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
FF7F0100000000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000018383838F8F9FD
FDFDF9F8F9F133BFFFFFFFFFFFFFFFE7
C3000000000000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
0000000000000000000000C0C0808000
00000000000000000000000000000103
81E1FCFCFFFFFFFFFFFFFFFFFFFF1F3F
CF830000000000000000000000000000

00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
000000000000000000000001070FFF7F
3E1E000000000000C0F8FCFCFEFEFEFF
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFCFC
FFFFFFFCF80000000000000000000000`
