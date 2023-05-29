import { ALLOWED_CHARACTERS } from "./expression"

function createExpressionErrorFactory(name: string){
    return class ExpressionError extends Error{
        constructor(message: string){
            super(message)
            this.name = name
        }
    }
}

export type InvalidCharacterInformation = {
    invalidCharacter: string,
    characterPosition: number,
    fullExpression: string
}

export function createInvalidCharacterError({ invalidCharacter, characterPosition, fullExpression }: InvalidCharacterInformation){
    return class ExpressionError extends Error{
        constructor(){
            let message = `
    ${fullExpression}
    `
            for(let i = 0; i < characterPosition; i++){
                message += " "
            }
            message += "^"
            message += 
            `
    The character ${invalidCharacter} is not allowed. 
    Allowed characters are: ${ALLOWED_CHARACTERS.split('').join(', ')}
            `
            super(message)
            this.name = "InvalidCharacterError"
        }
    }
}
