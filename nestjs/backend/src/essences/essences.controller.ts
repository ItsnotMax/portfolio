import { Controller, Get } from '@nestjs/common';

@Controller('essences')
export class EssencesController {
  @Get()
  getAllEssences() {
    const essences = [
      { slug: 'Не выбрано' },
      { leads: 'Сделка' },
      { contacts: 'Контакт' },
      { companies: 'Компания' },
    ];
    return essences;
  }
}
