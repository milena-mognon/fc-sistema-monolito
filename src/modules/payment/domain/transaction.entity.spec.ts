import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "./transaction.entity";

describe("Transaction Entity unit test", () => {
  it("should create a transaction", () => {
    const input = {
      id: new Id("1"),
      amount: 200,
      orderId: "2",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const transaction = new Transaction(input);

    expect(transaction.id).toBe(input.id);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.status).toBe(input.status);
    expect(transaction.createdAt).toStrictEqual(input.createdAt);
    expect(transaction.updatedAt).toStrictEqual(input.updatedAt);
  });

  it("should throw an error if amount is less than 0", () => {
    const input = {
      id: new Id("1"),
      amount: -10,
      orderId: "2",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => {
      new Transaction(input);
    }).toThrowError("Amount must be greater than 0");
  });

  it("should approve transaction", () => {
    const input = {
      id: new Id("1"),
      amount: 200,
      orderId: "2",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const transaction = new Transaction(input);

    transaction.process();

    expect(transaction.id).toBe(input.id);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.status).toBe("approved");
    expect(transaction.createdAt).toStrictEqual(input.createdAt);
    expect(transaction.updatedAt).toStrictEqual(input.updatedAt);
  });

  it("should decline transaction", () => {
    const input = {
      id: new Id("1"),
      amount: 50,
      orderId: "2",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const transaction = new Transaction(input);

    transaction.process();

    expect(transaction.id).toBe(input.id);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.status).toBe("declined");
    expect(transaction.createdAt).toStrictEqual(input.createdAt);
    expect(transaction.updatedAt).toStrictEqual(input.updatedAt);
  });
});
