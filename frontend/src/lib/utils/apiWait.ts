export const wait = (ms: number, signal: AbortSignal) =>
    new Promise<void>((resolve, reject) => {
        if (signal.aborted) return reject(new DOMException("Aborted", "AbortError"));

        const timer = setTimeout(resolve, ms);
        signal.addEventListener(
            "abort",
            () => {
                clearTimeout(timer);
                reject(new DOMException("Aborted", "AbortError"));
            },
            { once: true },
        );
    });
