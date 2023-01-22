import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import {
  FindAllProductsInputDTO,
  FindAllProductsOutputDTO,
} from "./find-all-products.dto";

export class FindAllProductsUseCase implements UseCaseInterface {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(
    input: FindAllProductsInputDTO
  ): Promise<FindAllProductsOutputDTO> {
    const products = await this._productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
