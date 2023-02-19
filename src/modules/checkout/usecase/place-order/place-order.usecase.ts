import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import {
  PlaceOrderInputDTO,
  PlaceOrderOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor() {}

  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    // buscar o cliente. Caso não encontre -> client not fount

    // valida se todos os productos passados são validos. Ex. verifica estoque

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
}
