import { DynamoDB } from 'aws-sdk';
import { parseDynamoTable } from '@specialblend/parse-dynamo-table';

interface ExampleProduct {
    name: string;
    price: number;
}

async function example() {
    const dynamo = new DynamoDB();
    const query = {
        TableName: 'example-products',
    };
    const response = await dynamo.scan(query).promise();
    const { ScannedCount, Items } = response;
    console.log(`scanned ${ScannedCount} products`);
    const products = parseDynamoTable<ExampleProduct>(Items);
    products.map((product: ExampleProduct, index: number) => {
        const { name, price } = product;
        console.log('ExampleProduct', index, name, price);
    });
}
