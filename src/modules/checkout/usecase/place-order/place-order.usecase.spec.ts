import { PlaceOrderUseCase } from "./place-order.usecase";
import { PlaceOrderInputDTO } from "./place-order.usecase.dto";

describe("Place Order usecase unit test", () => {
  describe("execute method", () => {
    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDTO = {
        clientId: "0",
        products: [],
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      );
    });

    it("should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      const mockValidateProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No Products selected"));

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDTO = {
        clientId: "1",
        products: [],
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("No Products selected")
      );
      expect(mockValidateProduct).toHaveBeenCalledTimes(1);
    });
  });
});
