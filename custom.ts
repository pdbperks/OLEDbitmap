declare interface Math {
    floor(x: number): number;
}


//% color=#27b0ba icon="\uf26c"
namespace OLED {
    export let bigfont: Buffer;
    export let font: Buffer;
    export let bitmapImage: Buffer;

    const SSD1306_SETCONTRAST = 0x81
    const SSD1306_SETCOLUMNADRESS = 0x21
    const SSD1306_SETPAGEADRESS = 0x22
    const SSD1306_DISPLAYALLON_RESUME = 0xA4
    const SSD1306_DISPLAYALLON = 0xA5
    const SSD1306_NORMALDISPLAY = 0xA6
    const SSD1306_INVERTDISPLAY = 0xA7
    const SSD1306_DISPLAYOFF = 0xAE
    const SSD1306_DISPLAYON = 0xAF
    const SSD1306_SETDISPLAYOFFSET = 0xD3
    const SSD1306_SETCOMPINS = 0xDA
    const SSD1306_SETVCOMDETECT = 0xDB
    const SSD1306_SETDISPLAYCLOCKDIV = 0xD5
    const SSD1306_SETPRECHARGE = 0xD9
    const SSD1306_SETMULTIPLEX = 0xA8
    const SSD1306_SETLOWCOLUMN = 0x00
    const SSD1306_SETHIGHCOLUMN = 0x10
    const SSD1306_SETSTARTLINE = 0x40
    const SSD1306_MEMORYMODE = 0x20
    const SSD1306_COMSCANINC = 0xC0
    const SSD1306_COMSCANDEC = 0xC8
    const SSD1306_SEGREMAP = 0xA0
    const SSD1306_CHARGEPUMP = 0x8D
    const chipAdress = 0x3C
    const xOffset = 0
    const yOffset = 0

    let charX = 0
    let charY = 0
    let displayWidth = 128
    let displayHeight = 64 / 8
    let screenSize = 0
    //let font: Array<Array<number>>
    let loadStarted: boolean;
    let loadPercent: number;
    function command(cmd: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x00
        buf[1] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }
    function sendData(cmd: number){
        let buf = pins.createBuffer(2)
        buf[0] = 0x40
        buf[1] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)      
    }
    function setColumnAddress(start: number, end: number){
        command(SSD1306_SETCOLUMNADRESS);
        command(start);
        command(end);
    }
    function setPageAddress(start: number, end: number){       
        command(SSD1306_SETPAGEADRESS)
        command(start);
        command(end);
    }
    //% block="clear OLED display"
    //% weight=3
    export function clear() {
        loadStarted = false
        loadPercent = 0
        setPageAddress(0x00,(displayHeight - 1));
        setColumnAddress(0x00, displayWidth - 1);
        let data = pins.createBuffer(17);
        data[0] = 0x40; // Data Mode
        for (let i = 1; i < 17; i++) {
            data[i] = 0x00
        }
        // send display buffer in 16 byte chunks
        for (let i = 0; i < screenSize; i += 16) {
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        charX = xOffset
        charY = yOffset
    }
        //% block="show OLED bitmap: $bitmap||page $start_page to $end_page column $start_col to $end_col"
         //% start_page.min=0 start_page.max=7
        //% end_page.min=0 end_page.max=7 end_page.defl=7
    //% start_col.min=0 start_col.max=120  
    //% end_col.min=0 end_col.max=120  end_col.defl=127
    //% weight=3
    export function bitmap(bitmap: Buffer, 
            start_page = 0, end_page = 7,
            start_col = 0, end_col = 127){
        //loadStarted = false
        //loadPercent = 0
        setPageAddress(start_page,end_page);
        setColumnAddress(start_col, end_col);
        //let data = pins.createBuffer(2);
        //let count = (displayWidth) * (displayHeight);
        let count = (end_page+1 - start_page)*(end_col+1 - start_col);
let data = pins.createBuffer(2);
        for (let i = 0; i < count; i ++) {
            data[0] = 0x40; // Data Mode
            data[1] = bitmap.getNumber(NumberFormat.Int8LE, i);
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        charX = xOffset
        charY = yOffset
    }

    //% block="show (without newline) string $str"
    //% weight=6
    export function writeString(str: string) {
        for (let i = 0; i < str.length; i++) {
            if (charX > displayWidth - 6) {
                newLine()
            }
            drawChar(charX, charY, str.charAt(i))
            charX += 6
        }
    }
    //% block="show (without newline) number $n"
    //% weight=5
    export function writeNum(n: number) {
        let numString = n.toString()
        writeString(numString)
    }
    //% block="show string $str"
    //% weight=8
    export function writeStringNewLine(str: string) {
        writeString(str)
        newLine()
    }
    //% block="show number $n"
    //% weight=7
    export function writeNumNewLine(n: number) {
        writeNum(n)
        newLine()
    }
    //% block="insert newline"
    //% weight=4
    export function newLine() {
        charY++
        charX = xOffset
    }
    function drawChar(x: number, y: number, c: string) {
        setPageAddress(y, y +1);
        setColumnAddress(x, x +5);
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let i = 0; i < 6; i++) {
            if (i === 5) {
                line[1] = 0x00
            } else {
                let charIndex = c.charCodeAt(0)-32
                let charNumber = font.getNumber(NumberFormat.UInt8BE, 5 * charIndex + i)
                line[1] = charNumber

            }
            pins.i2cWriteBuffer(chipAdress, line, false)
        }

    }
    function drawShape(pixels: Array<Array<number>>) {
        let x1 = displayWidth
        let y1 = displayHeight * 8
        let x2 = 0
        let y2 = 0
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[i][0] < x1) {
                x1 = pixels[i][0]
            }
            if (pixels[i][0] > x2) {
                x2 = pixels[i][0]
            }
            if (pixels[i][1] < y1) {
                y1 = pixels[i][1]
            }
            if (pixels[i][1] > y2) {
                y2 = pixels[i][1]
            }
        }
        let page1 = Math.floor(y1 / 8)
        let page2 = Math.floor(y2 / 8)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let x = x1; x <= x2; x++) {
            for (let page = page1; page <= page2; page++) {
                line[1] = 0x00
                for (let i = 0; i < pixels.length; i++) {
                    if (pixels[i][0] === x) {
                        if (Math.floor(pixels[i][1] / 8) === page) {
                            line[1] |= Math.pow(2, (pixels[i][1] % 8))
                        }
                    }
                }
                if (line[1] !== 0x00) {
                    command(SSD1306_SETCOLUMNADRESS)
                    command(x)
                    command(x + 1)
                    command(SSD1306_SETPAGEADRESS)
                    command(page)
                    command(page + 1)
                    //line[1] |= pins.i2cReadBuffer(chipAdress, 2)[1]
                    pins.i2cWriteBuffer(chipAdress, line, false)
                }
            }
        }
    }

    //% block="draw line from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=20
    //% y1.defl=20
    //% weight=1
    export function drawLine(x0: number, y0: number, x1: number, y1: number) {
        let pixels: Array<Array<number>> = []
        let kx: number, ky: number, c: number, i: number, xx: number, yy: number, dx: number, dy: number;
        let targetX = x1
        let targetY = y1
        x1 -= x0; kx = 0; if (x1 > 0) kx = +1; if (x1 < 0) { kx = -1; x1 = -x1; } x1++;
        y1 -= y0; ky = 0; if (y1 > 0) ky = +1; if (y1 < 0) { ky = -1; y1 = -y1; } y1++;
        if (x1 >= y1) {
            c = x1
            for (i = 0; i < x1; i++ , x0 += kx) {
                pixels.push([x0, y0])
                c -= y1; if (c <= 0) { if (i != x1 - 1) pixels.push([x0 + kx, y0]); c += x1; y0 += ky; if (i != x1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        } else {
            c = y1
            for (i = 0; i < y1; i++ , y0 += ky) {
                pixels.push([x0, y0])
                c -= x1; if (c <= 0) { if (i != y1 - 1) pixels.push([x0, y0 + ky]); c += y1; x0 += kx; if (i != y1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        }
        drawShape(pixels)
    }

     const PRG_MAX_SCALE  =   100
    const PRG_LEFT_EDGE  = 0xFF
    const PRG_RIGHT_EDGE = 0xFF
    const PRG_ACTIVE    =  0xBD
    const PRG_NOT_ACTIVE = 0x81
    //% block="progressBar: value $percent page $page col $col|| Width $wide bar $bar"
    //% percent.min=0 percent.max=100
    //% page.min=0 page.max=7
    //% col.min=0 col.max=50
    //% wide.min=10 wide.max=128
    //% bar.shadow="toggleOnOff"
    //% weight=3
    export function progressBar(percent: number, page = 0, col = 0, wide = 100, bar: boolean){
    let i: number, scale_value: number;
    setPageAddress(page,page);
    setColumnAddress(col, displayWidth - 1);
    scale_value = percent % wide;
sendData(PRG_LEFT_EDGE);
for (i = 0; i < scale_value; i++ ) {
if (bar) sendData(PRG_ACTIVE);
else sendData(PRG_NOT_ACTIVE)
    }
sendData(PRG_ACTIVE);    
 for (i = scale_value; i < wide; i++ ) {
sendData(PRG_NOT_ACTIVE);
    }  
    sendData(PRG_RIGHT_EDGE);     
    }

    //% block="progressBarV: value $percent page $page col $col|| Height $high"
    //% percent.min=0 percent.max=64
    //% page.min=0 page.max=7
    //% col.min=0 col.max=120
    //% high.min=10 high.max=128
    //% bar.shadow="toggleOnOff"
    //% weight=3
 export function progressBarV(percent: number, page = 0, col = 0, high = 40){
     let i: number, scale_value: number, h: number;
    let blocksV = Math.floor(high/8)
    scale_value = percent % (high);
    let blockVCount = 0;
    let barV = scale_value%8;    
    setPageAddress(page,page+blocksV);
    setColumnAddress(col, col + 8);

  sendData(PRG_LEFT_EDGE);
for (i = 0; i < 7; i++ ) {
if (percent== blockVCount + barV){
    sendData(0x01 | (1<<barV))
    }
else {sendData(0x01)};
   }
    sendData(PRG_RIGHT_EDGE);
blockVCount+=8
 for (h = 0; h < blocksV-2; h++ ) {  

   sendData(PRG_LEFT_EDGE);
for (i = 0; i < 7; i++ ) {
if (percent== blockVCount + barV){
    sendData(0x00 | (1<<barV))
    }
else sendData(0x00);
    }
    sendData(PRG_RIGHT_EDGE);
    blockVCount+=8
     } 

sendData(PRG_LEFT_EDGE);    
 for (i = 0; i < 7; i++ ) {
//sendData(0x80);
if (percent== blockVCount + barV) sendData(0x80 | (1<<barV));
else sendData(0x80); 
    }  
    sendData(PRG_RIGHT_EDGE);  
 }

    //% block="draw rectangle from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=20
    //% y1.defl=20
    //% weight=0
    export function drawRectangle(x0: number, y0: number, x1: number, y1: number) {
        drawLine(x0, y0, x1, y0)
        drawLine(x0, y1, x1, y1)
        drawLine(x0, y0, x0, y1)
        drawLine(x1, y0, x1, y1)
    }
    //% block="initialize OLED with width $width height $height"
    //% width.defl=128
    //% height.defl=64
    //% weight=9
    export function init(width: number, height: number) {
        command(SSD1306_DISPLAYOFF);
        command(SSD1306_SETDISPLAYCLOCKDIV);
        command(0x80);                                  // the suggested ratio 0x80
        command(SSD1306_SETMULTIPLEX);
        command(0x3F);
        command(SSD1306_SETDISPLAYOFFSET);
        command(0x0);                                   // no offset
        command(SSD1306_SETSTARTLINE | 0x0);            // line #0
        command(SSD1306_CHARGEPUMP);
        command(0x14);
        command(SSD1306_MEMORYMODE);
        command(0x00);                                  // 0x0 act like ks0108
        command(SSD1306_SEGREMAP | 0x1);
        command(SSD1306_COMSCANDEC);
        command(SSD1306_SETCOMPINS);
        command(0x12);
        command(SSD1306_SETCONTRAST);
        command(0xCF);
        command(SSD1306_SETPRECHARGE);
        command(0xF1);
        command(SSD1306_SETVCOMDETECT);
        command(0x40);
        command(0xc0);                                  //flip the display
        command(0xa0);                                  //flip the display
        command(SSD1306_DISPLAYALLON_RESUME);
        command(SSD1306_NORMALDISPLAY);
        command(SSD1306_DISPLAYON);
        displayWidth = width
        displayHeight = height / 8
        screenSize = displayWidth * displayHeight
        charX = xOffset
        charY = yOffset

        loadStarted = false
        loadPercent = 0
        clear()
    }
       font = hex`
    0000000000
    00005F0000
    0007000700
    147F147F14
    242A7F2A12
    2313086462
    3649562050
    0008070300
    001C224100
    0041221C00
    2A1C7F1C2A
    08083E0808
    0080703000
    0808080808
    0000606000
    2010080402
    3E5149453E
    00427F4000
    7249494946
    2141494D33
    1814127F10
    2745454539
    3C4A494931
    4121110907
    3649494936
    464949291E
    0000140000
    0040340000
    0008142241
    1414141414
    0041221408
    0201590906
    3E415D594E
    7C1211127C
    7F49494936
    3E41414122
    7F4141413E
    7F49494941
    7F09090901
    3E41415173
    7F0808087F
    00417F4100
    2040413F01
    7F08142241
    7F40404040
    7F021C027F
    7F0408107F
    3E4141413E
    7F09090906
    3E4151215E
    7F09192946
    2649494932
    03017F0103
    3F4040403F
    1F2040201F
    3F4038403F
    6314081463
    0304780403
    6159494D43
    007F414141
    0204081020
    004141417F
    0402010204
    4040404040
    0003070800
    2054547840
    7F28444438
    3844444428
    384444287F
    3854545418
    00087E0902
    18A4A49C78
    7F08040478
    00447D4000
    2040403D00
    7F10284400
    00417F4000
    7C04780478
    7C08040478
    3844444438
    FC18242418
    18242418FC
    7C08040408
    4854545424
    04043F4424
    3C4040207C
    1C2040201C
    3C4030403C
    4428102844
    4C9090907C
    4464544C44
    0008364100
    0000770000
    0041360800
    0201020402
    3C2623263C
    1EA1A16112
    3A4040207A
    3854545559
    2155557941
    2154547841
    2155547840
    2054557940
    0C1E527212
    3955555559
    3954545459
    3955545458
    0000457C41
    0002457D42
    0001457C40
    F0292429F0
    F0282528F0
    7C54554500
    2054547C54
    7C0A097F49
    3249494932
    3248484832
    324A484830
    3A4141217A
    3A42402078
    009DA0A07D
    3944444439
    3D4040403D
    3C24FF2424
    487E494366
    2B2FFC2F2B
    FF0929F620
    C0887E0903`

export function bigchar(){
bitmap(bigfont,2,5,10,22);

}


    export function bigChar(page: number, col: number,  c: string) {
        setPageAddress(page, page +3);
        setColumnAddress(col, col +12);
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let i = 0; i < 40; i++) {
            if (i === 39) {
                line[1] = 0x00
            } else {
                let charIndex = c.charCodeAt(0)-42
                let charNumber = bigfont.getNumber(NumberFormat.UInt8BE, 39 * charIndex + i)
                line[1] = charNumber

            }
            pins.i2cWriteBuffer(chipAdress, line, false)
        }
    }
    
    //% block="writeBigNumber at $page$col number$bigNum|| °c$temp "
    //% page.min=0 page.max=7
    //% col.min=0 col.max=100
    //% temp.shadow="toggleOnOff"
    //% inlineInputMode=inline
    //% weight=5
    export function writeBigNumber(page: number, col: number,  bigNum: number, temp = false){
        let str = Math.round(bigNum).toString();   
        for (let i = 0; i < str.length; i++) {
            bigChar(page,col,str[i])
            col+=18
    }
    if (temp) bigChar(page,col,"*") 
    }
/**/ 
//first char =43 +, page =  3, col = 13
//% block="bigfont"
    bigfont = hex`
7CBA8282BA7C00000000000000     
0000000000E0D0303030100000      
00000000003F5F606060400000      																											     																											
																											   																										
00000000000000000000000000
000010383838ffff3838381000
00000000000003030000000000 

00000000000000000000000000
00000000000000000000000000
00000000009078381000000000 

00000000000000000000000000
00001038383838383838381000
00000000000000000000000000 

00000000000000000000000000
00000000000000000000000000
000000000040e0e04000000000 

000002060e0e0e0e0e0e060200
00001038383838383838381000
000080c0e0e0e0e0e0e0c08000 

00fcfaf60e0e0e0e0e0ef6fafc
00efc78300000000000083c7ef
007fbfdfe0e0e0e0e0e0dfbf7f

00000000000000000000f0f8fc
0000000000000000000083c7ef
000000000000000000001f3f7f 

000002060e0e0e0e0e0ef6fafc
00e0d0b83838383838383b170f
007fbfdfe0e0e0e0e0e0c08000  

000002060e0e0e0e0e0ef6fafc
00001038383838383838bbd7ef
000080c0e0e0e0e0e0e0dfbf7f 

00fcf8f0000000000000f0f8fc
000f173b383838383838bbd7ef
000000000000000000001f3f7f  

00fcfaf60e0e0e0e0e0e060200
000f173b383838383838b8d0e0
000080c0e0e0e0e0e0e0dfbf7f  

00fcfaf60e0e0e0e0e0e060200
00efd7bb383838383838b8d0e0
007fbfdfe0e0e0e0e0e0dfbf7f 

000002060e0e0e0e0e0ef6fafc
0000000000000000000083c7ef
000000000000000000001f3f7f 

00fcfaf60e0e0e0e0e0ef6fafc
00efd7bb383838383838bbd7ef
007fbfdfe0e0e0e0e0e0dfbf7f  

00fcfaf60e0e0e0e0e0ef6fafc
000f173b383838383838bbd7ef
000080c0e0e0e0e0e0e0dfbf7f  

000000000080c0c08000000000
00000000000001010000000000 
0000000000040e0e0400000000
`
}
