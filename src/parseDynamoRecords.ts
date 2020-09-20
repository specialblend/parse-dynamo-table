import {
    AttributeMap,
    AttributeValue,
    MapAttributeValue,
    NumberSetAttributeValue,
    BinaryAttributeValue,
    NumberAttributeValue,
    StringAttributeValue,
    StringSetAttributeValue
} from 'aws-sdk/clients/dynamodb';

type AttributeKeyName = 'N' | 'BOOL' | 'S' | 'SS' | 'NS' | 'L' | 'NULL' | 'B' | 'BS' | 'M'

const parseKeyName = (data: AttributeValue): AttributeKeyName => {
    const [k] = Object.keys(data);
    return <AttributeKeyName>k;
};

function parseNumber(data: AttributeValue): number {
    return Number(<NumberAttributeValue>data.N);
}

function parseNumberList(data: AttributeValue): number[] {
    return (<NumberSetAttributeValue>data.NS).map(Number);
}

function parseBoolean(data: AttributeValue): boolean {
    return Boolean(<string><unknown>data.BOOL === 'true');
}

function parseString(data: AttributeValue): string {
    return String(<StringAttributeValue>data.S);
}

function parseStringList(data: AttributeValue): string[] {
    return (<StringSetAttributeValue>data.SS).map(String);
}

function parseNull(data: AttributeValue): null {
    return null;
}

function parseBinary(data: AttributeValue) {
    return <BinaryAttributeValue>data.B;
}

function parseBinaryString(data: AttributeValue) {
    return data.BS;
}

function parseMap<TRecord extends MapAttributeValue>(data: AttributeValue): MapAttributeValue {
    return <MapAttributeValue>data.M
}

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
        return data.L?.map(parseKey);
    }
    const parser = types[key];
    return parser(data);
}

export function parseDynamoRecord<TRecord extends Record<keyof TItem, any>, TItem extends AttributeMap>(item: TItem): TRecord {
    const entries: [string, AttributeValue][] = Object.entries<AttributeValue>(item);
    const parsedEntries = entries.map(
        function parseEntry([key, value]: [keyof TItem, AttributeValue], index: number): [keyof TItem, any] {
            return [key, parseKey(value)];
        }
    );
    return <TRecord>Object.fromEntries(parsedEntries);
}

export default function parseDynamoRecords<TRecord extends Record<keyof TItem, any>, TItem extends AttributeMap>(items: TItem[]): TRecord[] {
    return items.map(function mapDynamoRecord(record) {
        return parseDynamoRecord(record);
    });
}
