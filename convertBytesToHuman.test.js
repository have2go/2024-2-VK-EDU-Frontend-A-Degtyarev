/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from "./convertBytesToHuman";

test("Возвращает false для неправильного типа данных", () => {
    expect(convertBytesToHuman({})).toBe(false);
    expect(convertBytesToHuman([])).toBe(false);
    expect(convertBytesToHuman("")).toBe(false);
    expect(convertBytesToHuman(true)).toBe(false);
    expect(convertBytesToHuman(Symbol("#"))).toBe(false);
    expect(convertBytesToHuman(1234567890123456789012345678901234567890n)).toBe(false);
    expect(convertBytesToHuman(null)).toBe(false);
    expect(convertBytesToHuman(undefined)).toBe(false);
    expect(convertBytesToHuman(Infinity)).toBe(false);
    expect(convertBytesToHuman(() => {})).toBe(false);
    expect(convertBytesToHuman(NaN)).toBe(false);
});

test("Возвращает корректное значение для чисел", () => {
    expect(convertBytesToHuman(1024)).toBe("1 KB");
    expect(convertBytesToHuman(1048576)).toBe("1 MB");
    expect(convertBytesToHuman(1073741824)).toBe("1 GB");
    expect(convertBytesToHuman(1099511627776)).toBe("1 TB");
    expect(convertBytesToHuman(123)).toBe("123 B");
    expect(convertBytesToHuman(0)).toBe("0 B");
    expect(convertBytesToHuman(15323)).toBe("14.96 KB");
    expect(convertBytesToHuman(1070000000)).toBe("1020.43 MB");
    expect(convertBytesToHuman(1073741825)).toBe("1.00 GB");
});

test("Возвращает false для некорректных чисел", () => {
    expect(convertBytesToHuman(-1)).toBe(false);
    expect(convertBytesToHuman(12367.7805)).toBe(false);
});
