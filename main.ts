//% weight=0 color=#EC7505 icon="\uf0ad" block="microbiti2cesp32"
namespace microbiti2cesp32 {
      export enum analogpin {
        A0 = 0,
        A1 = 1,
        A2 = 2,
        A3 = 3,
        A4 = 4,
        A5 = 5,
	A33= 33
     }
     
      export enum digitalpin {
        D0 = 0,
        D1 = 1,
        D2 = 2,
        D3 = 3,
        D4 = 4,
        D5 = 5,
        D6 = 6,
        D7 = 7,
        D8 = 8,
        D9 = 9,
        D10 = 10,
        D11 = 11,
        D12 = 12,
        D13 = 13
     }
      
      export enum digitalpin1 {
        D3 = 3,
        D5 = 5,
        D6 = 6,
        D9 = 9,
        D10 = 10,
        D11 = 11
     }
      
      export enum type {
        INPUT = 2,
        OUTPUT = 1
     }
     export enum value {
        HIGH = 1,
        LOW = 0
     }
      
    //% blockId=setpinmode1 block="set esp32 digital pin %pin | for %XY"
    //% weight=101
    export function setpinmode1(pin: digitalpin, XY: type):void {
       sendi2cmessage("pinMode="+pin.toString()+","+XY.toString())    
    }
     
     
    //% blockId=setdigital1 block="set esp32 digital pin  %pin | value to %XY"
    //% weight=100
    export function setdigital1(pin: digitalpin, XY: value):void {
        sendi2cmessage("digitalWrite="+pin.toString()+","+XY.toString())    
    }
    
    //% blockId=setdigital2 block="set esp32 digital pin  %pin | PWM value to %XY"
    //% weight=99
    export function setdigital2(pin: digitalpin1, XY: number):void {
        sendi2cmessage("analogWrite="+pin.toString()+","+XY.toString())    
    }
	
    //% blockId=sendifttt block="send ifttt key %key | event %event | value1 %value1"
    //% weight=50
    export function sendifttt(key: string, event: string, value1: string):void {
        sendi2cmessage("ifttt="+key+","+event+","+value1)    
    }
	
    //% blockId=setdigital3 block="read esp32 digital pin  %pin value"
    //% weight=98
    export function setdigital3(pin: digitalpin):number {
        return parseFloat(receivei2cmessage("digitalRead="+pin.toString()))
    }

    //% blockId=setdigital4 block="read esp32 analog pin  %pin value"
    //% weight=97 
    export function setdigital4(pin: analogpin):number {
        return parseFloat(receivei2cmessage("analogRead="+pin.toString()))
    }   
	
    //% blockId=sendmqtt block="send mqtt topic %topic | message %message "
    //% weight=56 
    export function sendmqtt(topic: string, message: string):void {
        sendi2cmessage("sendmqtt="+topic+","+message)
    }  
			
    function sendi2cmessage(command: string):void {
        for (let index = 0; index <= command.length-1; index++) {
        	pins.i2cWriteNumber(
        	8,
        	command.charCodeAt(index),
        	NumberFormat.Int8LE,
        	false
        	)
        }
        pins.i2cWriteNumber(
	8,
	10,
	NumberFormat.Int8LE,
	false
	)
    } 
    
    function receivei2cmessage(command: string):string {
    let i2cmessage2 = ""
    let aa: number[] = []
    for (let index2 = 0; index2 <= command.length-1; index2++) {
        pins.i2cWriteNumber(
        8,
        command.charCodeAt(index2),
        NumberFormat.Int8LE,
        false
        )
    }
    pins.i2cWriteNumber(
    8,
    10,
    NumberFormat.Int8LE,
    false
    )
    i2cmessage2=""
    for (let index = 0; index <= 118; index++) {
        let dd = pins.i2cReadBuffer(8,952,false)
        let messagecheck2 = dd.getNumber(NumberFormat.Int8LE, index)
        if (messagecheck2 == -1) {
            break;
        }else {
            i2cmessage2 = i2cmessage2 + String.fromCharCode(messagecheck2)
	}
    }
    return i2cmessage2	    
    }
}
