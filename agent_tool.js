import { Agent, run, tool } from '@openai/agents'

process.env.OPENAI_TRACING = "false"

const agent = new Agent({
    name: 'Weather Agent',
    instructions:`
        you are an expert weather agent that helps user 
        to tell weather report
    `,
})

async function main(query = '') {
    const result = await run(agent, query)
    console.log(result.finalOutput)
}

main('what is the weather in New York?')