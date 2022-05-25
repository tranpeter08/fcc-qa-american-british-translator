'use strict';
const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate').post((req, res) => {
    try {
      const requiredFields = ['text', 'locale'];

      for (const field of requiredFields) {
        if (!(field in req.body)) {
          throw { type: 'API_ERROR', message: 'Required field(s) missing' };
        }
      }

      const { locale, text } = req.body;
      const translation = translator.translate(text, locale);

      res.json({ text, translation });
    } catch (error) {
      console.log(error);
      if (error.type) {
        res.send({ error: error.message });
      }

      res.send('server error');
    }
  });
};
