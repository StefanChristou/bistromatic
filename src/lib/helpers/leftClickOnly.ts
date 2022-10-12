export default function leftClickOnly(func: Function): Function {
    return function (event: MouseEvent): void {
        if (event.button === 0) {
            func(event);
        }
    }
}