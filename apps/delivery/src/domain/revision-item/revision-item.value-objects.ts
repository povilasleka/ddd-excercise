export class PlaybackPosition {
    private constructor(private readonly milliseconds: number) {
        if (milliseconds < 0) {
            throw new Error("Playback position cannot be negative");
        }
    }

    static fromSeconds(seconds: number): PlaybackPosition {
        return new PlaybackPosition(seconds * 1000);
    }

    static fromMilliseconds(ms: number): PlaybackPosition {
        return new PlaybackPosition(ms);
    }

    toSeconds(): number {
        return this.milliseconds / 1000;
    }

    toMilliseconds(): number {
        return this.milliseconds;
    }

    isAfter(other: PlaybackPosition): boolean {
        return this.milliseconds > other.milliseconds;
    }

    isBefore(other: PlaybackPosition): boolean {
        return this.milliseconds < other.milliseconds;
    }

    toFormatted(): string {
        const totalSeconds = Math.floor(this.milliseconds / 1000);
        const hh = Math.floor(totalSeconds / 3600);
        const mm = Math.floor((totalSeconds % 3600) / 60);
        const ss = totalSeconds % 60;

        const hhStr = hh > 0 ? `${String(hh).padStart(2, "0")}:` : "";
        return `${hhStr}${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    }
}