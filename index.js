import 'dotenv/config';
import { Agent, run } from '@openai/agents'

const helloAgent = new Agent({
    name: 'Hello Agent',
    instructions: 'Always respond in haiku form.',
});

run(helloAgent, 'My name is Rehan')
.then(result => {
    console.log(result.finalOutput)
})