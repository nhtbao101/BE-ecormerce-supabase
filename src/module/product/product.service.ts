import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import ProductRepository from 'src/repository/product.repository';
import { ErrorMsg } from 'src/constants/error-message';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProduct(query: { categoryId?: number; productName: string }) {
    console.log('query getProduct', query);
    const condition = query
      ? {
          ...(query.categoryId && {
            categoryId: query.categoryId,
          }),
          name: ILike(`%${query.productName}%`),
        }
      : {};

    const prd = await this.productRepository.find({
      where: condition,
      relations: {
        images: true,
      },
      order: {
        images: {
          id: 'ASC',
        },
      },
    });
    return prd;
  }

  async getProductBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        images: true,
      },
      order: {
        images: {
          id: 'ASC',
        },
      },
    });

    if (!product) {
      throw new HttpException(ErrorMsg.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  getProductByCategory;
}
