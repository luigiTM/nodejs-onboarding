export interface DatabaseConnector<T> {
  connector: T;
  getConnector(): T;
}
