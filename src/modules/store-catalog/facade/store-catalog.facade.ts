import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase";
import {
  FindAllStoreCatalogFacadeInputDTO,
  FindAllStoreCatalogFacadeOutputDTO,
  FindStoreCatalogFacadeInputDTO,
  FindStoreCatalogFacadeOutputDTO,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findProductUseCase: FindProductUseCase;
  findAllProductsUseCase: FindAllProductsUseCase;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findProductUseCase: FindProductUseCase;
  private _findAllProductsUseCase: FindAllProductsUseCase;

  constructor(props: UseCaseProps) {
    this._findProductUseCase = props.findProductUseCase;
    this._findAllProductsUseCase = props.findAllProductsUseCase;
  }

  async find(
    input: FindStoreCatalogFacadeInputDTO
  ): Promise<FindStoreCatalogFacadeOutputDTO> {
    return await this._findProductUseCase.execute(input);
  }

  async findAll(
    input: FindAllStoreCatalogFacadeInputDTO
  ): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return await this._findAllProductsUseCase.execute(input);
  }
}
