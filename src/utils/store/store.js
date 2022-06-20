"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreEvents = void 0;
const event_bus_1 = require("../event-bus/event-bus");
const merge_1 = require("../mydash/merge");
var StoreEvents;
(function (StoreEvents) {
    StoreEvents["UpdatedUser"] = "updatedUser";
    StoreEvents["UpdatedChats"] = "updatedChats";
    StoreEvents["UpdatedMessages"] = "updatedMessages";
})(StoreEvents = exports.StoreEvents || (exports.StoreEvents = {}));
class Store extends event_bus_1.EventBus {
    state = {};
    getState() {
        return this.state;
    }
    set(path, value) {
        const result = path.split('.').reduceRight((acc, key) => ({
            [key]: acc,
        }), value);
        this.state = (0, merge_1.merge)(this.state, result);
        this.emit(StoreEvents.UpdatedUser);
    }
    ;
    reset() {
        this.state = {};
        this.emit(StoreEvents.UpdatedUser);
        this.emit(StoreEvents.UpdatedChats);
        this.emit(StoreEvents.UpdatedMessages);
    }
    ;
}
exports.default = new Store();
//# sourceMappingURL=store.js.map