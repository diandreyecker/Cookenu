import { BaseError } from "./BaseError";

export class MissingTitle extends BaseError {
    constructor() {
        super(422, "Favor informar um titulo para a receita.")
    }
}

export class MissingDescription extends BaseError {
    constructor() {
        super(422, "Favor informar uma descrição para a receita.")
    }
}

export class InvalidToken extends BaseError {
    constructor() {
        super(400, "Usuário não autorizado.")
    }
}