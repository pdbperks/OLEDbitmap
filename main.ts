input.onButtonPressed(Button.A, function () {
    OLED.bitmap()
})
input.onButtonPressed(Button.AB, function () {
    OLED.clear()
    OLED.writeStringNewLine("OLED demonstration")
})
input.onButtonPressed(Button.B, function () {
    OLED.writeStringNewLine("@pdbperks")
    OLED.writeStringNewLine("hacker")
})
OLED.init(128, 64)
OLED.writeStringNewLine("OLED demonstration")
OLED.writeStringNewLine("Press a button")
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