import { BaseError } from "./BaseError";


export class MissingName extends BaseError {
    constructor() {
        super(422, "Favor digitar o nome de usuário")
    }
}

export class MissingEmail extends BaseError {
    constructor() {
        super(22, "Favor digitar o e-mail do usuário")
    }
}

export class MissingPassword extends BaseError {
    constructor() {
        super(422, "Favor digitar a senha do usuário")
    }
}

export class InvalidEmail extends BaseError {
    constructor() {
        super(422, 'E-mail incorreto, o email precisa ter o formato "nome@email.com".')
    }
}

export class InvalidPassword extends BaseError {
    constructor() {
        super(409, 'Senha inválida, ela deve conter ao menos 6 caracteres.')
    }
}

export class WrongEmail extends BaseError {
    constructor() {
        super(404, "Email não encontrado!")
    }
}

export class WrongPassword extends BaseError {
    constructor() {
        super(404, "Senha incorreta!")
    }
}

export class MissingToken extends BaseError {
    constructor() {
        super(422, "Favor informar o token do usuário")
    }
}

export class WrongToken extends BaseError {
    constructor() {
        super(404, "Token do usuário incorreto!")
    }
}