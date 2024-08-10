import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ICreateShippingUseCase } from 'src/domain/usecases/shipping/createShipping.usecase';
import { CreateShippingDto } from './dtos/create-shipping.dto';
import { CreatedShippingPresenter } from './presenters/created-shipping.presenter';

@Controller('shippings')
@ApiTags('Shippings')
export class ShippingController {
  constructor(
    @Inject(ICreateShippingUseCase)
    private readonly createShippingUseCase: ICreateShippingUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedShippingPresenter })
  async create(
    @Body() data: CreateShippingDto,
  ): Promise<CreatedShippingPresenter> {
    const createShippingResponse =
      await this.createShippingUseCase.execute(data);
    return new CreatedShippingPresenter(createShippingResponse);
  }
}
