import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMsg } from '../../constants/error-message';

import ProductRepository from '../../repository/product.repository';
import { In } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProduct(categories?: string[]) {
    const condition = categories
      ? {
          categoryId: In(
            categories
              .map((category: string) => +category)
              .filter((cate) => !isNaN(cate)),
          ),
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
