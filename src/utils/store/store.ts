import { EventBus } from "../event-bus/event-bus";
import { Indexed } from "../../typings/types";
import { merge } from "../mydash/merge";

export enum StoreEvents {
    UpdatedUser = 'updatedUser',
    UpdatedChats = 'updatedChats',
    UpdatedMessages = 'updatedMessages',
}


class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
            [key]: acc,
        }), value as any);
        this.state = merge(this.state as Indexed, result);
        this.emit(StoreEvents.UpdatedUser);
    };

    public reset() {
        this.state = {};
        this.emit(StoreEvents.UpdatedUser);
    };
}

export default new Store();