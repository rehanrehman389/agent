import 'dotenv/config';
import { Agent, run } from '@openai/agents'

const location = 'USA';

const helloAgent = new Agent({
    name: 'Hello Agent',
    instructions: function() {
        if (location === 'India') {
            return 'Always say namaste and Always respond in haiku form.'
        } else {
            return 'Always say hello and Always respond in haiku form.'
        }
    },
});

run(helloAgent, 'My name is Rehan')
.then(result => {
    console.log(result.finalOutput)
})