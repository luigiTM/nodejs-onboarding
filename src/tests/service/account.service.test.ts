import { AccountService } from "../../services/account.service";
import { AccountServiceImpl } from "../../services/impl/account.service.impl";
import { AccountRepositoryImpl } from "../../repositories/impl/account.repository.impl";
import sinon, { SinonMock } from "sinon";
import { DatabaseConnector } from "../../db/database.connector";
import { KnexConnector } from "../../db/knex/knex.connector";
import { Knex } from "knex";
import chai, { expect } from "chai";
import { AccountRepository } from "../../repositories/account.repository";
import { UpdateError } from "../../errors/update.error";
import chaiAsPromised from "chai-as-promised";

describe("Account Service Tests", () => {
  chai.use(chaiAsPromised);
  let databaseConnector: DatabaseConnector<Knex>;
  let repository: AccountRepository;
  let repositoryMock: SinonMock;
  let accountService: AccountService;
  before(() => {
    databaseConnector = sinon.createStubInstance(KnexConnector);
    repository = new AccountRepositoryImpl(databaseConnector);
    accountService = new AccountServiceImpl(repository);
  });
  beforeEach(() => {
    repositoryMock = sinon.mock(repository);
  });
  afterEach(() => {
    repositoryMock.restore();
  });
  describe("Create account", () => {
    it("Should create a new account", async () => {
      repositoryMock
        .expects("insert")
        .once()
        .resolves({ id: "1", user: { id: "1" }, currency: { acronym: "BRL" }, balance: 0 });
      const createdAccount = await accountService.create({ userId: "1", currencyId: 1, balance: 0 });
      expect(createdAccount).to.deep.equal({
        id: "1",
        userId: "1",
        currency: "BRL",
        balance: 0,
      });
      repositoryMock.verify();
    });
  });
  describe("Return account by id", () => {
    it("Should return account by Id", async () => {
      repositoryMock
        .expects("getById")
        .withArgs("1")
        .once()
        .resolves({ id: "1", user: { id: "1" }, currency: { acronym: "BRL" }, balance: 0 });
      const account = await accountService.getById("1");
      expect(account).to.deep.equal({ id: "1", userId: "1", currency: "BRL", balance: 0 });
      repositoryMock.verify();
    });
    it("Should return undefined when account not found", async () => {
      repositoryMock.expects("getById").withArgs("1").once().resolves(undefined);
      const account = await accountService.getById("1");
      expect(account).to.equal(undefined);
      repositoryMock.verify();
    });
  });
  describe("Return accounts by user id", () => {
    it("Should return accounts by user Id", async () => {
      repositoryMock
        .expects("getAccountsByUser")
        .withArgs("1")
        .once()
        .resolves([
          { id: "1", user: { id: "1" }, currency: { acronym: "BRL" }, balance: 0 },
          { id: "2", user: { id: "1" }, currency: { acronym: "USD" }, balance: 0 },
        ]);
      const accountsByUser = await accountService.getAccounts("1");
      expect(accountsByUser).to.deep.equal([
        { id: "1", userId: "1", currency: "BRL", balance: 0 },
        { id: "2", userId: "1", currency: "USD", balance: 0 },
      ]);
      repositoryMock.verify();
    });
    it("Should return empty array for user without accounts", async () => {
      repositoryMock.expects("getAccountsByUser").withArgs("999").once().resolves([]);
      const accountsByUser = await accountService.getAccounts("999");
      expect(accountsByUser).to.deep.equal([]);
      repositoryMock.verify();
    });
  });
  describe("Update account balance", () => {
    it("Should update account balance", async () => {
      repositoryMock.expects("updateAccountBalance").withArgs("1", 10).once().resolves(1);
      await accountService.updateAccountBalance("1", 10);
      repositoryMock.verify();
    });
    it("Should return error when no column is updated", async () => {
      repositoryMock.expects("updateAccountBalance").withArgs("1", 10).once().resolves(0);
      await expect(accountService.updateAccountBalance("1", 10)).to.be.rejectedWith(UpdateError, "Invalid number for updated rows: 0");
      repositoryMock.verify();
    });
    it("Should return error when more than one column is updated", async () => {
      repositoryMock.expects("updateAccountBalance").withArgs("1", 10).once().resolves(2);
      await expect(accountService.updateAccountBalance("1", 10)).to.be.rejectedWith(UpdateError, "Invalid number for updated rows: 2");
      repositoryMock.verify();
    });
  });
});
