import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { Transaction } from "../../domain/transaction.entity";
import { PaymentGateway } from "../../gateway/payment.gateway";
import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
} from "./process-payment.usecase.dto";

export class ProcessPaymentUseCase implements UseCaseInterface {
  private _transactionRepository: PaymentGateway;

  constructor(transactionRepository: PaymentGateway) {
    this._transactionRepository = transactionRepository;
  }

  async execute(
    input: ProcessPaymentInputDto
  ): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.process();

    const persistTransaction = await this._transactionRepository.save(
      transaction
    );

    return {
      transactionId: persistTransaction.id.id,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      orderId: persistTransaction.orderId,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}
