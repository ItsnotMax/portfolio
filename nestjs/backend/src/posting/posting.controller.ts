import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('posting')
export class PostingController {
  constructor(private configService: ConfigService) {}

  @Post()
  async createEntity(@Body() essence: { [essence: string]: string }) {
    const url = `https://${this.configService.get<string>('BASE_DOMAIN')}/api/v4/${essence.essence}`;

    const topost = {
      add: [
        {
          name: essence.essence,
        },
      ],
    };

    try {
      const response = await axios.post(url, topost, {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>('ACESS_TOKEN')}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        data: response.data._embedded[essence.essence],
      };
    } catch (error) {
      console.error(
        'Error posting data:',
        error.response?.data || error.message,
      );
      return {
        message: 'Ошибка при отправке данных',
        error: error.response?.data || error.message,
      };
    }
  }
}
