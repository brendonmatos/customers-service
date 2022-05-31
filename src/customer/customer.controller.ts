import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../infra/exception.filter';
import { AuthGuard } from './auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.save({
      id: undefined,
      name: createCustomerDto.name,
      document: createCustomerDto.document,
    });
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.save({
      id,
      name: updateCustomerDto.name,
      document: updateCustomerDto.document,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
