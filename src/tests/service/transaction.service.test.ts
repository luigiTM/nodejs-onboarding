import chaiAsPromised from "chai-as-promised";
import chai, { expect } from "chai";
import { DatabaseConnector } from "../../db/database.connector";
import { Knex } from "knex";
import { TransactionRepository } from "../../repositories/transaction.repository";
import { SinonMock, SinonStub } from "sinon";
import { TransactionService } from "../../services/transaction.service";
import { KnexConnector } from "../../db/knex/knex.connector";
import { TransactionRepositoryImpl } from "../../repositories/impl/transaction.repository.impl";
import { TransactionServiceImpl } from "../../services/impl/transaction.service.impl";
import { AccountService } from "../../services/account.service";
import { ConversionService } from "../../services/conversion.service";
import { FeeService } from "../../services/fee.service";
import { AccountServiceImpl } from "../../services/impl/account.service.impl";
import sinon from "sinon";
import { ConversionServiceImpl } from "../../services/impl/conversion.service.impl";
import { FeeServiceImpl } from "../../services/impl/fee.service.impl";
import { describe } from "mocha";
import { UserDto } from "../../dtos/user/user.dto";
import { CreateTransactionDto } from "../../dtos/transaction/create-transaction.dto";
import { TransactionManager } from "../../db/transaction.manager";
import { DataNotFoundError } from "../../errors/data-not-found.error";
import { UnauthorizedError } from "../../errors/user/unauthorized.error";
import { InsufficientBalanceError } from "../../errors/insufficient-balance.error";

describe("Transaction service test", () => {
  chai.use(chaiAsPromised);
  let databaseConnector: DatabaseConnector<Knex>;
  let transactionRepository: TransactionRepository;
  let transactionRepositoryMock: SinonMock;
  let accountService: AccountService;
  let conversionService: ConversionService;
  let feeService: FeeService;
  let transactionService: TransactionService;
  before(() => {
    databaseConnector = sinon.createStubInstance(KnexConnector);
    transactionRepository = new TransactionRepositoryImpl(databaseConnector);
    accountService = sinon.createStubInstance(AccountServiceImpl);
    conversionService = sinon.createStubInstance(ConversionServiceImpl);
    feeService = sinon.createStubInstance(FeeServiceImpl);
    transactionService = new TransactionServiceImpl(transactionRepository, accountService, conversionService, feeService);
  });
  beforeEach(() => {
    transactionRepositoryMock = sinon.mock(transactionRepository);
  });
  afterEach(() => {
    transactionRepositoryMock.restore();
  });
  describe("Get transaction by id", () => {
    it("Should return transaction by Id", async () => {
      transactionRepositoryMock
        .expects("getById")
        .withArgs("1")
        .once()
        .resolves({ id: "1", sourceAccount: { id: "1" }, destinationAccount: { id: "2" }, amount: 10, description: "Test transaction", createdAt: new Date("2025-03-19T00:00:00") });
      const transaction = await transactionService.getById("1");
      expect(transaction).to.deep.equal({ id: "1", sourceAccount: "1", destinationAccount: "2", amount: 10, description: "Test transaction", createdAt: new Date("2025-03-19T00:00:00") });
      transactionRepositoryMock.verify();
    });
    it("Should return undefined when transaction is not found", async () => {
      transactionRepositoryMock.expects("getById").withArgs("999").once().resolves(undefined);
      const transaction = await transactionService.getById("999");
      expect(transaction).to.equal(undefined);
      transactionRepositoryMock.verify();
    });
  });
  describe("Get transactions by user", () => {
    it("Should return transaction by user id", async () => {
      transactionRepositoryMock
        .expects("getTransactionsByUser")
        .withArgs("1")
        .once()
        .resolves([
          { id: "1", sourceAccount: { id: "1" }, destinationAccount: { id: "2" }, amount: 10, description: "Test transaction 1", createdAt: new Date("2025-03-19T00:00:00") },
          { id: "2", sourceAccount: { id: "1" }, destinationAccount: { id: "2" }, amount: 20, description: "Test transaction 2", createdAt: new Date("2025-03-20T00:00:00") },
        ]);
      const transactions = await transactionService.getTransactionsByUser("1", { page: 0, size: 10 }, [{ sortBy: "created_at", sortOrder: "asc" }], {});
      expect(transactions).to.deep.equal([
        { id: "1", sourceAccount: "1", destinationAccount: "2", amount: 10, description: "Test transaction 1", createdAt: new Date("2025-03-19T00:00:00") },
        { id: "2", sourceAccount: "1", destinationAccount: "2", amount: 20, description: "Test transaction 2", createdAt: new Date("2025-03-20T00:00:00") },
      ]);
    });
    it("Should return empty array by user without transactions", async () => {
      transactionRepositoryMock.expects("getTransactionsByUser").withArgs("999").once().resolves([]);
      const transactions = await transactionService.getTransactionsByUser("999", { page: 0, size: 10 }, [{ sortBy: "created_at", sortOrder: "asc" }], {});
      expect(transactions).to.deep.equal([]);
      transactionRepositoryMock.verify();
    });
  });
  describe("Create transaction", () => {
    before(() => {
      sinon.stub(TransactionManager, "run").callsFake(async (callback) => callback({} as Knex.Transaction));
    });
    it("Should validate and create a new transaction", async () => {
      (accountService.getById as SinonStub)
        .withArgs("1")
        .resolves(
          Promise.resolve({
            id: "1",
            userId: "1",
            currency: "BRL",
            balance: 100,
          }),
        )
        .withArgs("2")
        .resolves(
          Promise.resolve({
            id: "2",
            userId: "1",
            currency: "USD",
            balance: 100,
          }),
        );
      (conversionService.getConversionRate as SinonStub).withArgs("BRL", ["USD"]).resolves(Promise.resolve({ baseCurrency: "BRL", conversionRates: { USD: 1.5 } }));
      transactionRepositoryMock
        .expects("insert")
        .withArgs({ sourceAccountId: "1", destinationAccountId: "2", amount: 10, description: "Test transaction" })
        .once()
        .resolves({ id: "1", sourceAccount: { id: "1" }, destinationAccount: { id: "2" }, amount: 10, description: "Test transaction", createdAt: new Date("2025-03-19T00:00:00") });
      const userDto: UserDto = { id: "1", firstName: "Test", lastName: "Test", email: "test@test.com" };
      const newTransaction: CreateTransactionDto = { sourceAccountId: "1", destinationAccountId: "2", amount: 10, description: "Test transaction" };
      const createdTransaction = await transactionService.validateAndCreate(userDto, newTransaction);
      expect(createdTransaction).to.deep.equal({ id: "1", sourceAccount: "1", destinationAccount: "2", amount: 10, description: "Test transaction", createdAt: new Date("2025-03-19T00:00:00") });
      transactionRepositoryMock.verify();
    });
    it("Should return error for source account not found", async () => {
      (accountService.getById as SinonStub).withArgs("1").resolves(Promise.resolve(undefined));
      const userDto: UserDto = { id: "1", firstName: "Test", lastName: "Test", email: "test@test.com" };
      const newTransaction: CreateTransactionDto = { sourceAccountId: "1", destinationAccountId: "2", amount: 10, description: "Test transaction" };
      await expect(transactionService.validateAndCreate(userDto, newTransaction)).to.be.rejectedWith(DataNotFoundError, "Source account not found");
    });
    it("Should return error for destination account not found", async () => {
      (accountService.getById as SinonStub)
        .withArgs("1")
        .resolves(
          Promise.resolve({
            id: "1",
            userId: "1",
            currency: "BRL",
            balance: 100,
          }),
        )
        .withArgs("2")
        .resolves(undefined);
      const userDto: UserDto = { id: "1", firstName: "Test", lastName: "Test", email: "test@test.com" };
      const newTransaction: CreateTransactionDto = { sourceAccountId: "1", destinationAccountId: "2", amount: 10, description: "Test transaction" };
      await expect(transactionService.validateAndCreate(userDto, newTransaction)).to.be.rejectedWith(DataNotFoundError, "Destination account not found");
    });
    it("Should return error for source account not belonging to user", async () => {
      (accountService.getById as SinonStub)
        .withArgs("1")
        .resolves(
          Promise.resolve({
            id: "1",
            userId: "2",
            currency: "BRL",
            balance: 100,
          }),
        )
        .withArgs("2")
        .resolves({
          id: "2",
          userId: "1",
          currency: "USD",
          balance: 100,
        });
      const userDto: UserDto = { id: "1", firstName: "Test", lastName: "Test", email: "test@test.com" };
      const newTransaction: CreateTransactionDto = { sourceAccountId: "1", destinationAccountId: "2", amount: 10, description: "Test transaction" };
      await expect(transactionService.validateAndCreate(userDto, newTransaction)).to.be.rejectedWith(UnauthorizedError, "Invalid user");
    });
    it("Should return error for source account not having enough balance", async () => {
      (accountService.getById as SinonStub)
        .withArgs("1")
        .resolves(
          Promise.resolve({
            id: "1",
            userId: "1",
            currency: "BRL",
            balance: 100,
          }),
        )
        .withArgs("2")
        .resolves({
          id: "2",
          userId: "1",
          currency: "USD",
          balance: 100,
        });
      const userDto: UserDto = { id: "1", firstName: "Test", lastName: "Test", email: "test@test.com" };
      const newTransaction: CreateTransactionDto = { sourceAccountId: "1", destinationAccountId: "2", amount: 200, description: "Test transaction" };
      await expect(transactionService.validateAndCreate(userDto, newTransaction)).to.be.rejectedWith(InsufficientBalanceError, "Source account does not have sufficient balance for this transaction");
    });
  });
});
