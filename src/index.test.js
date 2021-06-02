import { parseDynamoRecord, parseDynamoRecords } from './index';

const $number = {
    N: '1234',
};

const $booleanTrue = {
    BOOL: 'true',
};

const $booleanFalse = {
    BOOL: 'false',
};

const $string = {
    S: 'test.string.value',
};

const $stringList = {
    SS: ['test.string.value.0', 'test.string.value.1', 'test.string.value.2'],
};

const $numberList = {
    NS: ['1234', '5678', '9012'],
};

const $list = {
    L: [$number, $booleanTrue, $booleanFalse, $string],
};

const $null = {
    NULL: '',
};

const $binary = {
    B: Buffer.from('foo bar'),
};

const $binaryString = {
    BS: Buffer.from('test.binary.string.value').toString('base64'),
};

const $map = {
    M: {
        foo: 'bar',
        baz: 'faz',
    },
};

describe('parseDynamoRecord', () => {
    test('is Function', () => {
        expect(parseDynamoRecord).toBeFunction();
    });
    describe('when called', () => {
        test('returns expected data', () => {
            const $record = {
                fooNumber: $number,
                fooBooleanTrue: $booleanTrue,
                fooBooleanFalse: $booleanFalse,
                fooString: $string,
                fooStringList: $stringList,
                fooNumberList: $numberList,
                fooList: $list,
                fooNull: $null,
                fooBinary: $binary,
                fooBinaryString: $binaryString,
                fooMap: $map,
            };
            const $result = parseDynamoRecord($record);
            expect($result).toMatchObject({
                fooNumber: Number($number.N),
                fooBooleanTrue: true,
                fooBooleanFalse: false,
                fooString: $string.S,
                fooStringList: $stringList.SS,
                fooNumberList: $numberList.NS.map(Number),
                fooList: [Number($number.N), true, false, $string.S],
                fooNull: null,
                fooBinary: $binary.B,
                fooBinaryString: $binaryString.BS,
                fooMap: $map.M,
            });
        });
    });
});

describe('parseDynamoRecords', () => {
    test('is Function', () => {
        expect(parseDynamoRecords).toBeFunction();
    });
    describe('when called', () => {
        test('returns expected data', () => {
            const $records = [
                {
                    fooNumber: $number,
                    fooBooleanTrue: $booleanTrue,
                    fooBooleanFalse: $booleanFalse,
                    fooString: $string,
                    fooStringList: $stringList,
                    fooNumberList: $numberList,
                    fooList: $list,
                    fooNull: $null,
                    fooBinary: $binary,
                    fooBinaryString: $binaryString,
                    fooMap: $map,
                },
                {
                    barNumber: $number,
                    barBooleanTrue: $booleanTrue,
                    barBooleanFalse: $booleanFalse,
                    barString: $string,
                    barStringList: $stringList,
                    barNumberList: $numberList,
                    barList: $list,
                    barNull: $null,
                    barBinary: $binary,
                    barBinaryString: $binaryString,
                    barMap: $map,
                },
                {
                    bazNumber: $number,
                    bazBooleanTrue: $booleanTrue,
                    bazBooleanFalse: $booleanFalse,
                    bazString: $string,
                    bazStringList: $stringList,
                    bazNumberList: $numberList,
                    bazList: $list,
                    bazNull: $null,
                    bazBinary: $binary,
                    bazBinaryString: $binaryString,
                    bazMap: $map,
                },
            ];
            const $result = parseDynamoRecords($records);
            expect($result).toMatchObject([
                {
                    fooNumber: Number($number.N),
                    fooBooleanTrue: true,
                    fooBooleanFalse: false,
                    fooString: $string.S,
                    fooStringList: $stringList.SS,
                    fooNumberList: $numberList.NS.map(Number),
                    fooList: [Number($number.N), true, false, $string.S],
                    fooNull: null,
                    fooBinary: $binary.B,
                    fooBinaryString: $binaryString.BS,
                    fooMap: $map.M,
                },
                {
                    barNumber: Number($number.N),
                    barBooleanTrue: true,
                    barBooleanFalse: false,
                    barString: $string.S,
                    barStringList: $stringList.SS,
                    barNumberList: $numberList.NS.map(Number),
                    barList: [Number($number.N), true, false, $string.S],
                    barNull: null,
                    barBinary: $binary.B,
                    barBinaryString: $binaryString.BS,
                    barMap: $map.M,
                },
                {
                    bazNumber: Number($number.N),
                    bazBooleanTrue: true,
                    bazBooleanFalse: false,
                    bazString: $string.S,
                    bazStringList: $stringList.SS,
                    bazNumberList: $numberList.NS.map(Number),
                    bazList: [Number($number.N), true, false, $string.S],
                    bazNull: null,
                    bazBinary: $binary.B,
                    bazBinaryString: $binaryString.BS,
                    bazMap: $map.M,
                },
            ]);
        });
    });
});
