import { Controller, HttpService } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}
}