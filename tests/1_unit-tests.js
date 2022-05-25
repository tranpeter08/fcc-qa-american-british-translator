const chai = require('chai');
const assert = chai.assert;
const locale = {
  a2b: 'american-to-british',
  b2a: 'british-to-american',
};

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  test('Translate Mangoes are my favorite fruit. to British English', (done) => {
    const translor = new Translator();
    const text = 'Mangoes are my favorite fruit.';
    const answer =
      'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate I ate yogurt for breakfast. to British English', (done) => {
    const translor = new Translator();
    const text = 'I ate yogurt for breakfast.';
    const answer =
      'I ate <span class="highlight">yoghurt</span> for breakfast.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test(`Translate We had a party at my friend's condo. to British English`, (done) => {
    const translor = new Translator();
    const text = `We had a party at my friend's condo.`;
    const answer = `We had a party at my friend's <span class="highlight">flat</span>.`;
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate Can you toss this in the trashcan for me? to British English', (done) => {
    const translor = new Translator();
    const text = 'Can you toss this in the trashcan for me?';
    const answer =
      'Can you toss this in the <span class="highlight">bin</span> for me?';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test(`Translate The parking lot was full. to British English`, (done) => {
    const translor = new Translator();
    const text = 'The parking lot was full.';
    const answer = 'The <span class="highlight">car park</span> was full.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate Like a high tech Rube Goldberg machine. to British English', (done) => {
    const translor = new Translator();
    const text = 'Like a high tech Rube Goldberg machine.';
    const answer =
      'Like a high tech <span class="highlight">Heath Robinson device</span>.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate To play hooky means to skip class or work. to British English', (done) => {
    const translor = new Translator();
    const text = 'To play hooky means to skip class or work.';
    const answer =
      'To <span class="highlight">bunk off</span> means to skip class or work.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate No Mr. Bond, I expect you to die. to British English', (done) => {
    const translor = new Translator();
    const text = 'No Mr. Bond, I expect you to die.';
    const answer =
      'No <span class="highlight">mr</span> Bond, I expect you to die.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate Dr. Grosh will see you now. to British English', (done) => {
    const translor = new Translator();
    const text = 'Dr. Grosh will see you now.';
    const answer = '<span class="highlight">Dr</span> Grosh will see you now.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate Lunch is at 12:15 today. to British English', (done) => {
    const translor = new Translator();
    const text = 'Lunch is at 12:15 today.';
    const answer = 'Lunch is at <span class="highlight">12.15</span> today.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Translate We watched the footie match for a while. to American English', (done) => {
    const translor = new Translator();
    const text = 'We watched the footie match for a while.';
    const answer =
      'We watched the <span class="highlight">soccer</span> match for a while.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Translate Paracetamol takes up to an hour to work. to American English', (done) => {
    const translor = new Translator();
    const text = 'Paracetamol takes up to an hour to work.';
    const answer =
      '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Translate First, caramelise the onions. to American English', (done) => {
    const translor = new Translator();
    const text = 'First, caramelise the onions.';
    const answer =
      'First, <span class="highlight">caramelize</span> the onions.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Translate I spent the bank holiday at the funfair. to American English', (done) => {
    const translor = new Translator();
    const text = 'I spent the bank holiday at the funfair.';
    const answer =
      'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Translate I had a bicky then went to the chippy. to American English', (done) => {
    const translor = new Translator();
    const text = 'I had a bicky then went to the chippy.';
    const answer =
      'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test(`Translate I've just got bits and bobs in my bum bag. to American English`, (done) => {
    const translor = new Translator();
    const text = `I've just got bits and bobs in my bum bag.`;
    const answer = `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`;
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Translate The car boot sale at Boxted Airfield was called off. to American English', (done) => {
    const translor = new Translator();
    const text = 'The car boot sale at Boxted Airfield was called off.';
    const answer =
      'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Translate Have you met Mrs Kalyani? to American English', (done) => {
    const translor = new Translator();
    const text = 'Have you met Mrs Kalyani?';
    const answer = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test(`Translate Prof Joyner of King's College, London. to American English`, (done) => {
    const translor = new Translator();
    const text = `Prof Joyner of King's College, London.`;
    const answer = `<span class="highlight">Prof.</span> Joyner of King's College, London.`;
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test(`Translate Tea time is usually around 4 or 4.30. to American English`, (done) => {
    const translor = new Translator();
    const text = 'Tea time is usually around 4 or 4.30.';
    const answer =
      'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
    const translor = new Translator();
    const text = 'Mangoes are my favorite fruit.';
    const answer =
      'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Highlight translation in I ate yogurt for breakfast.', (done) => {
    const translor = new Translator();
    const text = 'I ate yogurt for breakfast.';
    const answer =
      'I ate <span class="highlight">yoghurt</span> for breakfast.';
    const result = translor.translate(text, locale.a2b);
    assert.equal(result, answer);
    done();
  });

  test('Highlight translation in We watched the footie match for a while.', (done) => {
    const translor = new Translator();
    const text = 'We watched the footie match for a while.';
    const answer =
      'We watched the <span class="highlight">soccer</span> match for a while.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });

  test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
    const translor = new Translator();
    const text = 'Paracetamol takes up to an hour to work.';
    const answer =
      '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    const result = translor.translate(text, locale.b2a);
    assert.equal(result, answer);
    done();
  });
});
