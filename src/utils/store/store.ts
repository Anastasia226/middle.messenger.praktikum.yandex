import { EventBus } from "../event-bus/event-bus";

export enum StoreEvents {
    Updated = 'updated',
}

interface Indexed {
    [key: string]: Record<string, unknown>
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        //  set(this.state, path, value); later..
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();