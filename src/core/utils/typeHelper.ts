export interface TypeWithArgs<T, A extends any[]> extends Function { new(...args: A): T}
