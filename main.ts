#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import{differenceInSeconds} from "date-fns"

console.log(chalk.bold.rgb(204,204,204)(`\n \t\t <<< ======================================================================= >>>\n`));
console.log(chalk.bold.rgb(204,204,204)(chalk.magenta.bold(`\t\t\t     Welcome To \` Amashta Rehmani \` Countdown Timer Program\n`)));
console.log(chalk.bold.rgb(204,204,204)(` \t\t <<< ========================================================================== >>>`));

const res = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of seconds you want",
    validate: (input)=>{
        if(isNaN(input)){
            return "Please enter valid number"
        }else if (input > 60){
            return "seconds must be in 60"
        }else {
            return true;
        }
    }
});

let input = res.userInput
function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime,currentTime);

        if(timeDiff <= 0){
            console.log(chalk.yellow.bold(`\n "Timer has expired"`));
            process.exit()
        }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(chalk.redBright.bold(`\n ${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }),1000)
}
startTime(input)