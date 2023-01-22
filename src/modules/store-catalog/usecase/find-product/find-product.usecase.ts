import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindProductInputDTO, FindProductOutputDTO } from "./find-product.dto";

export class FindProductUseCase implements UseCaseInterface {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const product = await this._productRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
