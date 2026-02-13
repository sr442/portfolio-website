import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { page, country, device } = JSON.parse(event.body);
        // In a real scenario, country/device might come from headers (CloudFront)
        // event.headers['CloudFront-Viewer-Country']

        const command = new PutCommand({
            TableName: process.env.TABLE_NAME || "VisitorEvents",
            Item: {
                event_id: randomUUID(),
                timestamp: new Date().toISOString(),
                page: page || "unknown",
                country: country || event.headers['cloudfront-viewer-country'] || "unknown",
                device: device || event.headers['user-agent'] || "unknown",
                ip: event.requestContext?.http?.sourceIp || "unknown",
            },
        });

        await docClient.send(command);

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error(error);
        // Don't fail the request visibly for analytics errors
        return {
            statusCode: 200, // Still return 200 to client
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ success: false }),
        };
    }
};
