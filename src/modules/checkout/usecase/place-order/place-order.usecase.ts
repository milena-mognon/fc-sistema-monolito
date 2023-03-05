import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { ClientAdmFacdeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facede.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { Product } from "../../domain/product.entity";
import {
  PlaceOrderInputDTO,
  PlaceOrderOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacdeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;

  constructor(
    clientFacade: ClientAdmFacdeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
  }

  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    // buscar o cliente. Caso não encontre -> client not fount
    const client = await this._clientFacade.find({ id: input.clientId });

    if (!client) {
      throw new Error("Client not found");
    }

    // valida se todos os productos passados são validos. Ex. verifica estoque
    await this.validateProducts(input);

    // recuperar os productos

    // criar o objeto do client -> New Client

    // criar o objeto da order (client, products)

    // processar o pagamento -> paumentFacade.process(orderId, amount)

    // caso pagamento seja aprovado -> Gerar Invoice (fatura)

    // mudar o status da order para approved

    // retornar dto

    //
    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }

  private async validateProducts(input: PlaceOrderInputDTO): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No Products selected");
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      });

      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        );
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };

    return new Product(productProps);
  }
}
