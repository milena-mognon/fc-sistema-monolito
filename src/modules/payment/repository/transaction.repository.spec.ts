import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import { Transaction } from "../domain/transaction.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { TransactionRepository } from "./transaction.repository";

describe("Transaction Reporitory unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a trabsaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });

    transaction.process();

    const repository = new TransactionRepository();

    const output = await repository.save(transaction);

    console.log(output);

    // expect(output.transactionId).toBe(transaction.id.id);
    expect(output.id.id).toBe(transaction.id.id);
    expect(output.amount).toBe(transaction.amount);
    expect(output.status).toBe("approved");
    expect(output.orderId).toBe(transaction.orderId);
  });
});
