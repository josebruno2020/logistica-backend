import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ICreateShippingUseCase } from 'src/domain/usecases/shipping/createShipping.usecase';
import { IListLastFiveShippingUseCase } from 'src/domain/usecases/shipping/listLastFiveShipping.usecase';
import { CreateShippingDto } from './dtos/create-shipping.dto';
import { CreatedShippingPresenter } from './presenters/created-shipping.presenter';

@Controller('shippings')
@ApiTags('Shippings')
export class ShippingController {
  constructor(
    @Inject(ICreateShippingUseCase)
    private readonly createShippingUseCase: ICreateShippingUseCase,
    @Inject(IListLastFiveShippingUseCase)
    private readonly listLastFiveUseCase: IListLastFiveShippingUseCase,
  ) {}

  @Get('lasts')
  @ApiOkResponse({ type: CreatedShippingPresenter, isArray: true })
  async listLasts(): Promise<CreatedShippingPresenter[]> {
    const shippings = await this.listLastFiveUseCase.execute();
    return shippings.map((shipping) => new CreatedShippingPresenter(shipping));
  }

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
