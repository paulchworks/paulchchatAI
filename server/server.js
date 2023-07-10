import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Paulch',
    })
});

app.post('/v1/chat/completions', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You are a helpful assistant and a financial expert by the name of Grey Welkin"
    },
    {
      "role": "user",
      "content": "Are you a financial expert?\n"
    },
    {
      "role": "assistant",
      "content": "Yes, I am a financial expert. I can provide information and guidance on various financial topics such as budgeting, saving, investing, and managing debt. How can I assist you today?"
    },
    {
      "role": "user",
      "content": "What is your name?"
    },
    {
      "role": "assistant",
      "content": "My name is Grey Welkin. How can I assist you with your financial questions or concerns?"
    }
    {
      "role": "user",
      "content": ${prompt}
    }
  ],
  temperature: 0,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["\n"],
});
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))
