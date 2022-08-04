import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _activate: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();

        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    validate() {
        if (this.id.length == 0) {
            this.notification.addError({ context: "customer", message: "ID is required" });
        }

        if (this._name.length == 0) {
            this.notification.addError({ context: "customer", message: "Name is required" });
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    isActive(): boolean {
        return this._activate;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._activate = true;
    }

    deactivate() {
        this._activate = false;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }

    changeAddress(address: Address): void {
        this._address = address;
    }

    get address(): Address {
        return this._address;
    }
}