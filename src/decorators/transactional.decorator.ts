import { TransactionManager } from "../db/transaction.manager";

export function Transactional() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const knexConnector: KnexConnector = this.knexConnector; // Pega a conexão do serviço
      if (!knexConnector) {
        throw new Error("KnexConnector is not available in this service.");
      }

      return await TransactionManager.run(knexConnector.getConnector(), async () => {
        return await originalMethod.apply(this, args); // Executa o método original dentro da transação
      });
    };

    return descriptor;
  };
}
