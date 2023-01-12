export default function leftClickOnly(
	func: (event: MouseEvent) => void
): (event: MouseEvent) => void {
	return function (event: MouseEvent): void {
		if (event.button === 0) {
			func(event);
		}
	};
}
