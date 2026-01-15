import { Agent, run, tool } from '@openai/agents'
import {z} from 'zod'

const getWeatherTool = tool({
     name: 'getWeather',
     description: 'returns the current weather info for the given city',
     parameters: z.object({
        city: z.string().describe('the city name')
     }),
     execute: async function({city}) {
        //TODO: replace with api call
        return `the weather of ${city} is 12 with some wind`
     }
})

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

main('what is stock market condition in New York?')