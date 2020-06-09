import btoa from 'btoa';

import parseDynamoTable from './index';

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
    L: [
        $number, $booleanTrue, $booleanFalse, $string,
    ],
};

const $null = {
    NULL: '',
};

const $binary = {
    B: Buffer.from('foo bar'),
};

const $binaryString = {
    BS: btoa('test.binary.string.value'),
};

const $map = {
    M: {
        foo: 'bar',
        baz: 'faz',
    },
};

describe('parseDynamoTable', () => {
    test('is Function', () => {
        expect(parseDynamoTable).toBeFunction();
    });
    describe('when called', () => {
        test('returns expected data', () => {
            const $items = [
                { fooNumber: $number },
                { fooBooleanTrue: $booleanTrue },
                { fooBooleanFalse: $booleanFalse },
                { fooString: $string },
                { fooStringList: $stringList },
                { fooNumberList: $numberList },
                { fooList: $list },
                { fooNull: $null },
                { fooBinary: $binary },
                { fooBinaryString: $binaryString },
                { fooMap: $map },
            ];
            const $result = parseDynamoTable($items);
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
