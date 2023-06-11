"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postScreenshot = void 0;
var _tesseract = _interopRequireDefault(require("tesseract.js"));
var _openai = require("openai");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */

const configuration = new _openai.Configuration({
  apiKey: process && process.env && process.env.OPENAPIKEY || "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",
  organization: 'org-N2BiNPIAhFE564r8WaUXETn1'
});
const openai = new _openai.OpenAIApi(configuration);
const postScreenshot = (req, res, next) => {
  const {
    imageData
  } = req.body;

  // Perform OCR using Tesseract.js
  _tesseract.default.recognize(Buffer.from(imageData, 'base64')).then(async result => {
    await openai.createCompletion({
      model: 'text-davinci-003',
      // eslint-disable-next-line no-template-curly-in-string
      prompt: `'understand the following jumbled tinder bio -> ${result.data.text} return 5 suggestion with respect to the bio and 5 outside of that scope '`
    }).then(response => {
      res.send({
        response
      });
    }).catch(error => {
      res.send({
        error: error.message
      });
    });
  }).catch(error => {
    res.status(500).json({
      error: error.message
    });
  });
};
exports.postScreenshot = postScreenshot;