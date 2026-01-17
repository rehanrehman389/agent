import 'dotenv/config'
import { Agent, run, tool } from '@openai/agents'
import { z } from 'zod'
import fs from 'node:fs/promises'

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

const processRefund = tool({
    name: 'issue_refund',
    description: 'issues refund to the customer',
    parameters: z.object({
        customer_id: z.string().describe('the customer id of the customer'),
        reason: z.string().describe('the reason for the refund')
    }),
    execute: async function({ customer_id, reason}) {
        await fs.appendFile('./refunds.txt', `Refund for Customer having ID ${customer_id} for ${reason}`, 'utf-8')
        return { refundIssued: true };
        // return `refund issued to customer ${customer_id} for reason ${reason}`
    }
})

const refundAgent = new Agent({
    name: 'Refund Agent',
    instructions: 'Your are expert in issuing refunds to the customer',
    tools: [processRefund]
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

runAgent('i had a plan 499. i need a refund right now. my cus id is 428638 because i am shifting to a new place')