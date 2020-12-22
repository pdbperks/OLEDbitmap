quiet fork from https://github.com/tinkertanker/pxt-oled-ssd1306  
This fork adds bitmap support.   
It also provides large LCD style number font, simple horizontal and vertical progress bar/level meter. 
Line drawing commands are not included.

### Exported Commands  
init(width: number, height: number)  
flipScreen(left = false, down = false)  
bitmap(bitmap: Buffer, start_page = 0, end_page = 7, start_col = 0, end_col = 127)  
clear()  
cursorTo(page: number, col: number)  
newLine()  
writeString(str: string)  
writeNum(n: number)  
writeStringNewLine(str: string)  
writeNumNewLine(n: number)  
writeBigNumber(page: number, col: number,  bigNum: number, oC = false)  
progressBar(percent: number, page = 0, col = 0, wide = 100, bar: boolean)  
progressBarV(percent: number, page = 0, col = 0, high = 40)  
 
I have used the program BMP-LCD to create the bitmap files. It is available at https://www.hobbytronics.co.uk/bmp-lcd-converter  
I have stored the generated data as hex Buffers. You need to move to javascript mode in the makeCode editor and I have stored them in the test.ts although they could be stored in main.ts or custom.ts files. Remove 0x and commas throughout the generated data. The program only handles 168 x 64 pixel images but an alternative program LCD_assistant http://en.radzio.dxp.pl/bitmap_converter/  will allow a range of image sizes.
I am making this code public although I still hope to make further tweaks to code and documentation. 

### Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/pdbperks/oledbitmap** and import



