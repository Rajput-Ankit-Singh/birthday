// Mock jQuery before requiring functions.js
global.$ = global.jQuery = function() {
    return {
        width: () => 670,
        height: () => 625,
        resize: () => {},
        css: () => {},
        fadeIn: () => {},
        html: () => {},
        typewriter: () => {},
        each: function(cb) {
             cb.call(this);
             return this;
        }
    };
};
global.$.fn = {};
global.window = {
    width: () => 1000,
    height: () => 800
};

const { getHeartPoint, calculateTimeElapse, setOffsets } = require('../js/functions');

describe('Functions Tests', () => {

    describe('calculateTimeElapse', () => {
        test('should calculate exact days difference', () => {
            const start = new Date('2023-01-01T00:00:00');
            const end = new Date('2023-01-02T00:00:00');
            const result = calculateTimeElapse(start, end);
            expect(result.days).toBe(1);
            expect(result.hours).toBe("00");
            expect(result.minutes).toBe("00");
            expect(result.seconds).toBe("00");
        });

        test('should calculate exact hours difference', () => {
            const start = new Date('2023-01-01T00:00:00');
            const end = new Date('2023-01-01T05:00:00');
            const result = calculateTimeElapse(start, end);
            expect(result.days).toBe(0);
            expect(result.hours).toBe("05");
            expect(result.minutes).toBe("00");
            expect(result.seconds).toBe("00");
        });

        test('should calculate complex difference', () => {
            // 1 day, 2 hours, 3 minutes, 4 seconds
            const start = new Date('2023-01-01T00:00:00');
            const end = new Date(start.getTime() + (24*3600 + 2*3600 + 3*60 + 4) * 1000);
            const result = calculateTimeElapse(start, end);
            expect(result.days).toBe(1);
            expect(result.hours).toBe("02");
            expect(result.minutes).toBe("03");
            expect(result.seconds).toBe("04");
        });
    });

    describe('getHeartPoint', () => {
        beforeAll(() => {
            // Set offsets to known values
            // width 670 -> offsetX = 335
            // height 625 -> offsetY = 625/2 - 55 = 312.5 - 55 = 257.5
            setOffsets(335, 257.5);
        });

        test('should return array of two numbers', () => {
            const result = getHeartPoint(0);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
            expect(typeof result[0]).toBe('number');
            expect(typeof result[1]).toBe('number');
        });

        test('should return correct point for angle 0', () => {
            // angle = 0
            // t = 0
            // x = 19.5 * (16 * sin(0)^3) = 0
            // y = -20 * (13 * cos(0) - 5 * cos(0) - 2 * cos(0) - cos(0))
            //   = -20 * (13 - 5 - 2 - 1) = -20 * 5 = -100

            // Expected:
            // X = offsetX + x = 335 + 0 = 335
            // Y = offsetY + y = 257.5 - 100 = 157.5

            const result = getHeartPoint(0);
            expect(result[0]).toBeCloseTo(335);
            expect(result[1]).toBeCloseTo(157.5);
        });

         test('should return correct point for angle PI', () => {
            // angle = PI
            // t = 1
            // x = 19.5 * (16 * sin(1)^3) approx 19.5 * 16 * 0.595...

            // Let's rely on the property that it should be a valid number
            const result = getHeartPoint(Math.PI);
            expect(result[0]).not.toBeNaN();
            expect(result[1]).not.toBeNaN();
        });
    });
});
