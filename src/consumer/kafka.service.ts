import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  constructor() {}
  private kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private admin: any;

  private producer: Producer = this.kafka.producer();
  private consumers: Consumer[] = [];

  async createTopic(
    topicName: string,
    partitions: number,
    replicationFactor: number,
  ) {
    try {
      await this.admin.createTopics({
        topics: [
          {
            topic: topicName,
            numPartitions: partitions,
            replicationFactor: replicationFactor,
          },
        ],
      });
      console.log(
        `Topic "${topicName}" created with ${partitions} partitions and a replication factor of ${replicationFactor}.`,
      );
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  }
  async onModuleInit() {
    this.admin = this.kafka.admin();
    await this.admin.connect();
    await this.createTopic('booking-topic', 3, 2);
  }

  async sendMessage(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async createConsumer(
    groupId: string,
    topics: string[],
    messageHandler: (message: any) => void,
  ) {
    const consumer = this.kafka.consumer({ groupId });
    this.consumers.push(consumer);
    await consumer.connect();
    await consumer.subscribe({ topics });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const parsedMessage = JSON.parse(message.value.toString());
        messageHandler(parsedMessage);
        console.log(`hi topic is ${topic} and partition is ${partition} `);
      },
    });
  }
  async onModuleDestroy() {
    try {
      await this.producer.disconnect();
      for (const consumer of this.consumers) {
        await consumer.disconnect();
      }
    } catch (error) {
      console.error('Error during module destruction:', error);
    }
  }
}
