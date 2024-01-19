export type Handler<T> = (
  objectStore: IDBObjectStore,
  resolve: (value: DOMException | T | PromiseLike<DOMException | T>) => void,
  reject: (reason?: any) => void
) => void;
