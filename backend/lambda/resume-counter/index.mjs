import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME || "ResumeMetrics",
            Key: {
                metric_type: "downloads",
            },
            UpdateExpression: "ADD #count :inc",
            ExpressionAttributeNames: {
                "#count": "count",
            },
            ExpressionAttributeValues: {
                ":inc": 1,
            },
            ReturnValues: "UPDATED_NEW",
        });

        const response = await docClient.send(command);

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                success: true,
                total_downloads: response.Attributes?.count
            }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Error tracking download" }),
        };
    }
};
