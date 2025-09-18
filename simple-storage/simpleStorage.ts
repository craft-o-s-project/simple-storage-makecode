/**
 * Simple persistent storage for micro:bit V2
 */
//% color="#378273" icon="\uf0ce"
namespace simpleStorage {

    let storage = new MicroBitStorage();

    //% block="save number $value as key $key"
    //% value.shadow=math_number
    export function saveNumber(key: string, value: number): void {
        storage.put(key, pins.createBufferFromArray([value & 0xFF, (value >> 8) & 0xFF, (value >> 16) & 0xFF, (value >> 24) & 0xFF]));
    }

    //% block="read number from key $key"
    export function readNumber(key: string): number {
        let buf = storage.get(key);
        if (!buf) return 0;
        return buf[0] | (buf[1] << 8) | (buf[2] << 16) | (buf[3] << 24);
    }

    //% block="save string $value as key $key"
    export function saveString(key: string, value: string): void {
        storage.put(key, pins.createBufferFromUTF8String(value));
    }

    //% block="read string from key $key"
    export function readString(key: string): string {
        let buf = storage.get(key);
        return buf ? buf.toString() : "";
    }
}
