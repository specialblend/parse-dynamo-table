import { DynamoDB } from 'aws-sdk';
import { parseDynamoTable } from '@specialblend/parse-dynamo-table';

interface ExampleProduct {
    name: string;
    price: number;
}

async function exampleParseRecords() {
    const dynamo = new DynamoDB();
    const query = {
        TableName: 'example-products',
    };
    const response = await dynamo.scan(query).promise();
    const { ScannedCount, Items } = response;
    console.log(`scanned ${ScannedCount} products`);
    if (Items) {
        const products = parseDynamoTable<ExampleProduct>(Items);
        products.map((product: ExampleProduct, index: number) => {
            const { name, price } = product;
            console.log('ExampleProduct', index, name, price);
        });
    }
}

async function exampleParseTable() {
    const dynamo = new DynamoDB();
    const query = {
        TableName: 'example-products',
    };
    const response = await dynamo.scan(query).promise();
    const products = parseDynamoTable<ExampleProduct>(response);
    products.map((product: ExampleProduct, index: number) => {
        const { name, price } = product;
        console.log('ExampleProduct', index, name, price);
    });
}
