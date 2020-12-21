quiet fork from https://github.com/tinkertanker/pxt-oled-ssd1306  
This fork adds bitmap support.   
It also provides large LCD style number font. Simple horizontal and vertical progress bar/level meter.
https://www.hobbytronics.co.uk/bmp-lcd-converter Remove 0x and commas throughout the generated data.

clear()  
bitmap(bitmap: Buffer, start_page = 0, end_page = 7, start_col = 0, end_col = 127)  
cursorTo(page: number, col: number)  
writeString(str: string)  
writeNum(n: number)  
writeStringNewLine(str: string)  
writeNumNewLine(n: number)  
newLine()  
progressBar(percent: number, page = 0, col = 0, wide = 100, bar: boolean)  
progressBarV(percent: number, page = 0, col = 0, high = 40)  
init(width: number, height: number)  
bigChar(page: number, col: number,  c: string)  
writeBigNumber(page: number, col: number,  bigNum: number, temp = false)  

> Open this page at [https://pdbperks.github.io/oledbitmap/](https://pdbperks.github.io/oledbitmap/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/pdbperks/oledbitmap** and import



