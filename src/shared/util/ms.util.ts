const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

export type NormalizedUnit =
    | 'y'
    | 'yr'
    | 'yrs'
    | 'year'
    | 'years'
    | 'w'
    | 'week'
    | 'weeks'
    | 'd'
    | 'day'
    | 'days'
    | 'h'
    | 'hr'
    | 'hrs'
    | 'hour'
    | 'hours'
    | 'm'
    | 'min'
    | 'mins'
    | 'minute'
    | 'minutes'
    | 's'
    | 'sec'
    | 'secs'
    | 'second'
    | 'seconds'
    | 'ms'
    | 'msec'
    | 'msecs'
    | 'millisecond'
    | 'milliseconds';

export function ms(str: string): number {
    if (str.length === 0 || str.length > 100) {
        throw new Error(
            'Value provided to ms() must be a string with length between 1 and 99.',
        );
    }

    const match =
        /^(?<value>-?(?:\d+)?\.?\d+)\s*(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            str,
        );

    if (!match?.groups) return NaN;

    const n = Number(match.groups.value);
    const unit = (match.groups.unit ?? 'ms').toLowerCase() as NormalizedUnit;

    switch (unit) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;

        case 'weeks':
        case 'week':
        case 'w':
            return n * w;

        case 'days':
        case 'day':
        case 'd':
            return n * d;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;

        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;

        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;

        default:
            return NaN;
    }
}
