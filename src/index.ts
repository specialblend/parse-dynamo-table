import { AttributeMap, AttributeValue } from 'aws-sdk/clients/dynamodb';
import { always, equals, head, identity, keys, map, mapObjIndexed, values } from 'ramda';

type AttributeKeyName = 'N' | 'BOOL' | 'S' | 'SS' | 'NS' | 'L' | 'NULL' | 'B' | 'BS' | 'M'

const parseKeyName = (data: AttributeValue): AttributeKeyName => {
    const [k] = keys(data);
    return k;
};

const parseValue = (data: AttributeValue): any => head(values<AttributeValue, AttributeKeyName>(data));
const parseNumber = (x: any): number => Number(x);
const parseBoolean = equals('true');
const parseString = (x: any): string => String(x);
const parseStringList = map(parseString);
const parseNumberList = map(parseNumber);
const parseNull = always(null);
const parseBinary = identity;
const parseBinaryString = identity;
const parseMap = identity;

const types = {
    N: parseNumber,
    BOOL: parseBoolean,
    S: parseString,
    SS: parseStringList,
    NS: parseNumberList,
    NULL: parseNull,
    B: parseBinary,
    BS: parseBinaryString,
    M: parseMap,
};

function parseKey(data: AttributeValue): any {
    const key = parseKeyName(data);
    if (key === 'L') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return data.L.map(parseKey);
    }
    const parser = types[key];
    const value = parseValue(data);
    return parser(value);
}

export function parseDynamoRecord(item: AttributeMap): Record<string, any> {
    return mapObjIndexed<AttributeValue, any, any>(parseKey, item);
}

export default function parseDynamoRecords(items: AttributeMap[]): Record<string, any>[] {
    return map(parseDynamoRecord, items);
}
