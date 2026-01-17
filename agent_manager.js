import 'dotenv/config'
import { Agent, run, tool } from '@openai/agents'
import { z } from 'zod'

const fetchAvailablePlans = tool({
    name: 'fetch_available_plans',
    description: 'fetches the available plans for internet',
    parameters: z.object({}),
    execute: async function() {
        return [
            { plan_id: '1', print_inr: 499, speed: '25Mbps' }, 
            { plan_id: '2', print_inr: 999, speed: '50Mbps' },
            { plan_id: '3', print_inr: 1599, speed: '100Mbps' }
        ]
    }
})

const salesAgent = new Agent({
    name: 'Sales Agent',
    instructions: `
        You are an expert sales agent for an internet braodband company.
        Talk to the user and help them with what they need.
    `,
    tools: [fetchAvailablePlans]

})

async function runAgent(query = '') {
    const result = await run(salesAgent, query)
    console.log(result.finalOutput)
}

runAgent('i had a plan 499. i need a refund right now. my cus id is 428638')