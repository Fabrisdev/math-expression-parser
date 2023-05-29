import { InvalidCharacterInformation, createInvalidCharacterError } from './errors'
import { isACommand, executeCommand, commandExists, showHelp } from './commands'

export const ALLOWED_CHARACTERS = "0123456789+-/*."

export function runExpression(expression: string){
    if(isACommand(expression)) return searchAndExecuteCommand(expression)
    console.log(parseExpression(expression))
}

function searchAndExecuteCommand(expression: string){
    if(!commandExists(expression)) return showHelp()
    executeCommand(expression)
} 

function usesAllowedCharacters(expression: string){
    type InvalidExpressionInformation = {
        isInvalid?: InvalidCharacterInformation,
        allowedCharacters: string
    }

    for(let i = 0; i < expression.length; i++){
        const currentCharacter = expression[i]
        if(!ALLOWED_CHARACTERS.includes(currentCharacter)) return <InvalidExpressionInformation>{
            isInvalid: {
                invalidCharacter: currentCharacter,
                characterPosition: i,
                fullExpression: expression
            }
        }
    }
    return <InvalidExpressionInformation>{
        allowedCharacters: ALLOWED_CHARACTERS 
    }
}

function parseExpression(expression: string){
    const isUsingAllowedCharacters = usesAllowedCharacters(expression)
    if(isUsingAllowedCharacters.isInvalid) 
        throw new (createInvalidCharacterError({
            invalidCharacter: isUsingAllowedCharacters.isInvalid.invalidCharacter,
            characterPosition: isUsingAllowedCharacters.isInvalid.characterPosition,
            fullExpression: isUsingAllowedCharacters.isInvalid.fullExpression
        }))
    //below is wip
    if(!expression.includes('+')) return Number(expression)

    const expressionSplitted = expression.split('+')
    
    const firstNumber = Number(expressionSplitted[0])
    const secondNumber = Number(expressionSplitted[1])
    return firstNumber + secondNumber
}