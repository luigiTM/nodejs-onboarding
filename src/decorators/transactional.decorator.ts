import { TransactionManager } from "../db/transaction.manager";

export function Transactional() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      try {
        const res = await TransactionManager.run(async (transaction) => {
          return await originalMethod.apply(this, [...args, transaction]);
        });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    return descriptor;
  };
}
