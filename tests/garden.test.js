const { Vector, Garden } = require('../js/garden');

describe('Vector Class', () => {
    test('should initialize correctly', () => {
        const v = new Vector(3, 4);
        expect(v.x).toBe(3);
        expect(v.y).toBe(4);
    });

    test('should rotate correctly', () => {
        const v = new Vector(1, 0);
        v.rotate(Math.PI / 2);
        expect(v.x).toBeCloseTo(0);
        expect(v.y).toBeCloseTo(1);
    });

    test('should multiply correctly', () => {
        const v = new Vector(2, 3);
        v.mult(2);
        expect(v.x).toBe(4);
        expect(v.y).toBe(6);
    });

    test('should clone correctly', () => {
        const v1 = new Vector(1, 2);
        const v2 = v1.clone();
        expect(v2).not.toBe(v1); // Different reference
        expect(v2.x).toBe(v1.x);
        expect(v2.y).toBe(v1.y);
    });

    test('should calculate length correctly', () => {
        const v = new Vector(3, 4);
        expect(v.length()).toBe(5);
    });

    test('should subtract correctly', () => {
        const v1 = new Vector(5, 5);
        const v2 = new Vector(2, 3);
        v1.subtract(v2);
        expect(v1.x).toBe(3);
        expect(v1.y).toBe(2);
    });

    test('should set values correctly', () => {
        const v = new Vector(0, 0);
        v.set(10, 20);
        expect(v.x).toBe(10);
        expect(v.y).toBe(20);
    });
});

describe('Garden Utilities', () => {
    test('random should return value in range', () => {
        const val = Garden.random(1, 10);
        expect(val).toBeGreaterThanOrEqual(1);
        expect(val).toBeLessThan(10); // Since Math.random() is exclusive of 1
    });

    test('randomInt should return integer in range', () => {
        const val = Garden.randomInt(1, 10);
        expect(val).toBeGreaterThanOrEqual(1);
        expect(val).toBeLessThanOrEqual(10);
        expect(Number.isInteger(val)).toBe(true);
    });

    test('degrad should convert degrees to radians', () => {
        expect(Garden.degrad(180)).toBeCloseTo(Math.PI);
    });

    test('raddeg should convert radians to degrees', () => {
        expect(Garden.raddeg(Math.PI)).toBeCloseTo(180);
    });

    test('rgba should format string correctly', () => {
        expect(Garden.rgba(255, 0, 0, 0.5)).toBe('rgba(255,0,0,0.5)');
    });
});
