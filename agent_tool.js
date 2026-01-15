import { Agent, run, tool } from '@openai/agents'
import {z} from 'zod'
import axios from 'axios'

const getWeatherTool = tool({
     name: 'getWeather',
     description: 'returns the current weather info for the given city',
     parameters: z.object({
        city: z.string().describe('the city name')
     }),
     execute: async function({city}) {
        const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`
        const response = await axios.get(url, { responseType: 'text' })
        console.log(response.data)
        return `the weather of ${city} is ${response.data}`
     }
})

//SAMPLE ANOTHER TOOL

// const sendEmailTool = tool({
//     name: 'sendEmail',
//     description: 'sends an email to the given email address',
//     parameters: z.object({
//         to: z.string().describe('the email address of the recipient'),
//         subject: z.string().describe('the subject of the email'),
//         body: z.string().describe('the body of the email')
//     }),
//     execute: async function({to, subject, body}) {
//         console.log(`sending email to ${to} with subject ${subject} and body ${body}`)
//         return `email sent to ${to}`
//     }
// })

// tools: [getWeatherTool, sendEmailTool],

const agent = new Agent({
    name: 'Weather Agent',
    instructions:`
        you are an expert weather agent that helps user 
        to tell weather report
    `,
    tools: [getWeatherTool],
})

async function main(query = '') {
    const result = await run(agent, query)
    console.log(result.finalOutput)
}

main('what is the weather in Mumbai?')