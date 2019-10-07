export const Greeter = (name: string) => `Hello ${name}`;


export class BankStore {
    constructor(
        private merchantCode: string,
        private terminal: string,
        private password: string,
        private endpoint: string,
        private endpointurl: string,
    ) {

    }

}
