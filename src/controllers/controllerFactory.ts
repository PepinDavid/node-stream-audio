export type TControllerConstructor<TController, TArgs extends unknown[]> = new (...args: TArgs) => TController;

export class ControllerFactory {
    private static controllerRegistry: Map<string, unknown> = new Map();

    public static registerController<TController, TArgs extends unknown[]>(controllerClass: TControllerConstructor<TController, TArgs>): void {
        const name = controllerClass.name;
        
        if (!this.controllerRegistry.has(name)) {
            this.controllerRegistry.set(name, controllerClass);
        }
    }

    public static createInstance<TController>(controllerName: string, ...args: unknown[]): TController {
        const controllerConstructor = this.controllerRegistry.get(controllerName) as TControllerConstructor<TController, unknown[]>;
        
        if (!controllerConstructor) {
            throw new Error(`Controller ${controllerName} is not registered`);
        }

        return args ? new controllerConstructor(...args) : new controllerConstructor();
    }
}
