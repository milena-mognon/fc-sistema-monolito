import { UseCaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
  ProductAdmFacadeInterface,
} from "./product-adm.facede.interface";

export interface UseCasesProps {
  addProductUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}
export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addProductUseCase = usecasesProps.addProductUseCase;
    this._checkStockUseCase = usecasesProps.checkStockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    // caso o dto do caso de uso for diferente do dto da facade, é necessário converter o dto da facade para o dto do cado se uso
    return this._addProductUseCase.execute(input);
  }

  async checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO> {
    return this._checkStockUseCase.execute(input);
  }
}
