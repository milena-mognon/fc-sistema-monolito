import { UseCaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import {
  PaymentFacadeInterface,
  ProcessPaymentFacadeInputDto,
  ProcessPaymentFacadeOutputDto,
} from "./payment.facade.dto";

export interface PaymentFacadeProps {
  processPaymentUseCase: UseCaseInterface;
}
export class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface;

  constructor({ processPaymentUseCase }: PaymentFacadeProps) {
    this._processPaymentUseCase = processPaymentUseCase;
  }
  process(
    input: ProcessPaymentFacadeInputDto
  ): Promise<ProcessPaymentFacadeOutputDto> {
    return this._processPaymentUseCase.execute(input);
  }
}
