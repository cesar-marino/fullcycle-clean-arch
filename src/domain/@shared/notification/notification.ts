export type NotificationErrorProps = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    messages(context?: string): string {
        let message = '';
        this.errors.forEach((error) => {
            if (context === undefined || context === error.context) {
                message += `${error.context}: ${error.message},`;
            }
        });

        return message;
    }
}