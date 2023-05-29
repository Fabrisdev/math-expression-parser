import readlineSync from 'readline-sync'
import { runExpression } from './expression'

do{
    try{
        const expression = readlineSync.question("> ")
        runExpression(expression)
    }catch(error){
        console.error(error)
    }
}while(true)