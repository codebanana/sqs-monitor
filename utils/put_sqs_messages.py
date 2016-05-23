import boto3

client = boto3.client('sqs')

response = client.send_message(
    QueueUrl='https://sqs.us-east-1.amazonaws.com/766021230235/test-queue',
    MessageBody='Simple Test Message',
    )

print(response)
