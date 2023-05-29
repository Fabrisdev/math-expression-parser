const COMMAND_PREFIX = '.'

const commands = new Map<string, () => void>()
    .set(`${COMMAND_PREFIX}clear`, () => console.clear())
    .set(`${COMMAND_PREFIX}exit`, () => process.exit(0))
    .set(`${COMMAND_PREFIX}help`, () => showHelp())

export default commands

export function showHelp(){
    console.log(`
    Available commands:
    -> .clear: Clears the screen
    -> .exit: Exists the program
    -> .help: Shows this page
    `)
}

export function isACommand(expression: string){
    return expression.startsWith('.')
}

export function commandExists(command: string){
    const isAValidCommand = commands.get(command)
    return !!isAValidCommand
}

export function executeCommand(command: string){
    const commandFunction = commands.get(command)
    if(commandFunction) commandFunction()
}