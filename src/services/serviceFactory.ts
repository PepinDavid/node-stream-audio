export type TServiceConstructor<TService, TArgs extends unknown[]> = new (...args: TArgs) => TService;

export class ServiceFactoryRegistry {
    private static serviceRegistry: Map<string, unknown> = new Map();
    private static serviceInstance: Map<string, unknown> = new Map();

    public static registerService<TService, TArgs extends unknown[]>(serviceClass: TServiceConstructor<TService, TArgs>): void {
        const name = serviceClass.name;
        
        if (!this.serviceRegistry.has(name)) {
            this.serviceRegistry.set(name, serviceClass);
        }
    }

    public static createInstance<TService>(serviceName: string, ...args: unknown[]): TService {
        const serviceConstructor = this.serviceRegistry.get(serviceName) as TServiceConstructor<TService, unknown[]>;
        
        if (!serviceConstructor) {
            throw new Error(`Service ${serviceName} is not registered`);
        }

        if (this.serviceInstance.has(serviceName)) {
            return this.serviceInstance.get(serviceName) as TService;
        }

        const serviceInstance: TService = args ? new serviceConstructor(...args) : new serviceConstructor();

        this.serviceInstance.set(serviceName, serviceInstance);

        return serviceInstance;
    }
}