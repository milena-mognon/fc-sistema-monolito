import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { ClientAdmFacdeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import {
  PlaceOrderInputDTO,
  PlaceOrderOutputDTO,
} from "./place-order.usecase.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacdeInterface;

  constructor(clientFacade: ClientAdmFacdeInterface) {
    this._clientFacade = clientFacade;
  }

  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    // buscar o cliente. Caso não encontre -> client not fount
    const client = await this._clientFacade.find({ id: input.clientId });

    if (!client) {
      throw new Error("Client not found");
    }

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
