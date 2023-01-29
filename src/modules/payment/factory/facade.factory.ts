import { PaymentFacade } from "../facade/payment.facade";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";

export class PaymentFacadeFactory {
  static create() {
    const transactionRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository
    );

    const transactionFacade = new PaymentFacade({
      processPaymentUseCase: processPaymentUseCase,
    });

    return transactionFacade;
  }
}
