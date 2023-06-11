/* eslint-disable no-console */
import Tesseract from 'tesseract.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAPIKEY,
  organization: 'org-N2BiNPIAhFE564r8WaUXETn1'
});
const openai = new OpenAIApi(configuration);

export const postScreenshot = (req, res, next) => {
  const { imageData } = req.body;

  // Perform OCR using Tesseract.js
  Tesseract.recognize(Buffer.from(imageData, 'base64'))
    .then(async (result) => {
      await openai.createCompletion({
        model: 'text-davinci-003',
        // eslint-disable-next-line no-template-curly-in-string
        prompt: `'understand the following jumbled tinder bio -> ${result.data.text} return 5 suggestion with respect to the bio and 5 outside of that scope '`
      }).then(
        (response) => {
          res.send({ response });
        }
      ).catch(error => {
        res.send({ error: error.message });
      });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};
