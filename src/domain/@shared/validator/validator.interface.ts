export default interface validatorInterface<T> {
    validate(entity: T): void;
}