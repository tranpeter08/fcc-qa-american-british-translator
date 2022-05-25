const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const ENDPOINT = '/api/translate';
const INVALID_LOCALE_MESSAGE = 'Invalid value for locale field';
const MISSING_REQUIRED_FIELDS_MESSAGE = 'Required field(s) missing';
const EMPTY_TEXT_MESSAGE = 'No text to translate';
const NO_TRANSLATION_MESSAGE = 'Everything looks good to me!';

suite('Functional Tests', () => {
  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    const text = 'Tylenol takes up to an hour to work';
    const answer =
      '<span class="highlight">Paracetamol</span> takes up to an hour to work';
    const locale = 'american-to-british';
    const expectedFields = ['text', 'translation'];

    chai
      .request(server)
      .post(ENDPOINT)
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        for (const exptectedField of expectedFields) {
          assert.property(res.body, exptectedField);
        }

        assert.equal(res.body.translation, answer);
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    const text = `Let's go to the chippy.`;
    const locale = 'british-to-americans';

    chai
      .request(server)
      .post(ENDPOINT)
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, INVALID_LOCALE_MESSAGE);
        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', (done) => {
    const locale = 'british-to-american';

    chai
      .request(server)
      .post(ENDPOINT)
      .send({ locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, MISSING_REQUIRED_FIELDS_MESSAGE);
        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: 'test' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, MISSING_REQUIRED_FIELDS_MESSAGE);
        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', (done) => {
    const locale = 'british-to-american';

    chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: '', locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, EMPTY_TEXT_MESSAGE);
        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    const text = 'Have a good day!';
    const locale = 'american-to-british';
    const expectedFields = ['text', 'translation'];

    chai
      .request(server)
      .post(ENDPOINT)
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.status, 200);
        for (const exptectedField of expectedFields) {
          assert.property(res.body, exptectedField);
        }

        assert.equal(res.body.translation, NO_TRANSLATION_MESSAGE);
        done();
      });
  });
});
