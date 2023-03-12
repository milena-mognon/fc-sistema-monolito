import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { ClientAdmFacdeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/payment.facade.dto";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facede.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { Client } from "../../domain/client.entity";
import { Order } from "../../domain/order.entity";
import { Product } from "../../domain/product.entity";
import { CheckoutGateway } from "../../gateway/checkout.gateway";
import {
  PlaceOrderInputDTO,
  PlaceOrderOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacdeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;
  private _checkoutReposiory: CheckoutGateway;
  private _invoiceFacade: any; // InvoiceFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;

  constructor(
    clientFacade: ClientAdmFacdeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    checkoutReposiory: CheckoutGateway,
    invoiceFacade: any, // InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._checkoutReposiory = checkoutReposiory;
    this._invoiceFacade = invoiceFacade;
    this._paymentFacade = paymentFacade;
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
    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    );

    // criar o objeto do client -> New Client
    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
    });

    // criar o objeto da order (client, products)
    const order = new Order({
      client: myClient,
      products,
    });

    // processar o pagamento -> paumentFacade.process(orderId, amount)
    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total(),
    });
    // caso pagamento seja aprovado -> Gerar Invoice (fatura)
    const invoice =
      payment.status === "approved"
        ? await this._invoiceFacade.create({
            name: client.name,
            // document: client.document,
            // street: client.street,
            // city: client.city,
            // state: client.state,
            // complement: client.complement,
            // zipCode: client.zipCode,
            // number: client.number,
            items: products.map((p) => {
              return {
                id: p.id.id,
                name: p.name,
                price: p.salesPrice,
              };
            }),
          })
        : null;
    // mudar o status da order para approved

    payment.status === "approved" && order.approved();
    this._checkoutReposiory.addOrder(order);
    // retornar dto

    //
    return {
      id: order.id.id,
      invoiceId: payment.status === "approved" ? invoice.id : null,
      status: order.status,
      total: order.total(),
      products: order.products.map((p) => {
        return {
          productId: p.id.id,
        };
      }),
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
