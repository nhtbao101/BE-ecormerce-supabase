import { Controller, Get, Param, Query } from '@nestjs/common';

import { ProductService } from './product.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/product/')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false })
  async getProducts(@Query('category') categories?: string[]) {
    return await this.productService.getProduct(categories);
  }

  @Get(':slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.productService.getProductBySlug(slug);
  }
}
