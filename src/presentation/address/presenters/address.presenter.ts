import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/domain/entities/address.entity';

export class AddressPresenter {
  @ApiProperty({ example: '7ce225ea-906c-4ebf-818a-172124c99531' })
  id: string;

  @ApiProperty({ example: '87060-100' })
  postalCode: string;

  @ApiProperty({ example: 'PR' })
  state: string;

  @ApiProperty({ example: 'Maringá' })
  city: string;

  @ApiProperty({ example: 'Zona 05' })
  neighborhood: string;

  @ApiProperty({ example: 'Rua dos Alecrins' })
  street: string;

  @ApiProperty({ example: '555' })
  number: string;

  @ApiProperty({ example: -23.5441134 })
  lat: number;

  @ApiProperty({ example: -23.5441134 })
  long: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    id,
    postalCode,
    state,
    city,
    neighborhood,
    street,
    number,
    lat,
    long,
    createdAt,
    updatedAt,
  }: Address) {
    this.id = id;
    this.postalCode = postalCode;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.street = street;
    this.number = number;
    this.lat = lat;
    this.long = long;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
