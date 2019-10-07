import { Language, Operation } from "./index";
 
export class OperationData {
    constructor(
        private operation: Operation,
        private reference: string,
        private language: Language,
        private secure3D: boolean,
        private urlOk?: string,
        private urlKo?: string,
        private hash?: string,
        private amount?: number,
        private concept?: string,
        private currency?: string,
        private scoring?: number,
        private idUser?: number,
        private tokenUser?: string,
        private startDate?: number,
        private endDate?: number,
        private periodicity?: string
    ) {}

    /**
     * Geters
     */

    public getOperation(): Operation {
        return this.operation;
    }
    public getReference(): string {
        return this.reference;
    }
    public getLanguage(): Language  {
        return this.language;
    }
    public getHash(): string {
        return this.hash ? this.hash : "";
    }
    public getUrlOk(): string {
        return this.urlOk ? this.urlOk : "";
    }
    public getUrlKo(): string {
        return this.urlKo ? this.urlKo : "";
    }
    public getSecure3D(): boolean {
        return this.secure3D ? this.secure3D : false;
    }
    public getAmount(): number | 0 {
        return this.amount ? this.amount : 0;
    }
    public getConcept(): string {
        return this.concept ? this.concept : "";
    }
    public getCurrency(): string | null {
        return this.currency ? this.currency : null;
    }
    public getScoring(): number | 0 {
        return this.scoring ? this.scoring : 0;
    }
    public getIdUser(): number | null {
        return this.idUser ? this.idUser : null;
    }
    public getTokenUser(): string | null {
        return this.tokenUser ? this.tokenUser : null;
    }
    public getStartDate(): number | null {
        return this.startDate ? this.startDate : null;
    }
    public getEndDate(): number | null {
        return this.endDate ? this.endDate : null;
    }
    public getPeriodicity(): string | null {
        return this.periodicity ? this.periodicity : null;
    }

    /**
     * Seters
     */

    public setOperation(operation: Operation) {
        this.operation = operation;
    }
    public setLanguage(language: Language) {
        this.language = language;
    }
    public setHash(hash: string) {
        this.hash = hash;
    }
    public setUrlOk(url: string) {
        this.urlOk = url;
    }
    public setUrlKo(url: string) {
        this.urlKo = url;
    }
    public setReference(reference: string) {
        this.reference= reference;
    }
    public setSecure3D(secure3D: boolean) {
        this.secure3D = secure3D;
    }
    public setAmount(amount: number) {
        this.amount = amount;
    }
    public setConcept(concept: string) {
        this.concept = concept;
    }
    public setCurrency(currency: string) {
        this.currency = currency;
    }
    public setScoring(scoring: number) {
        this.scoring = scoring;
    }
    public setIdUser(idUser: number) {
        this.idUser = idUser;
    }
    public setTokenUser(tokenUser: string) {
        this.tokenUser = tokenUser;
    }
    public setStartDate(startDate: number) {
        this.startDate = startDate;
    }
    public setEndDate(endDate: number) {
        this.endDate = endDate;
    }
    public setPeriodicity(periodicity: string) {
        this.periodicity = periodicity;
    }
}