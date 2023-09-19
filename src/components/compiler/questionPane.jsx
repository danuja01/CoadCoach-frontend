const question =
  "<p>Maria plays college basketball and wants to go pro. Each season she maintains a record of her play. She tabulates the number of times she breaks her season record for " +
  '    <span style="font-family: inherit;">most points</span> and ' +
  '    <span style="font-family: inherit;">least points</span> in a game. Points scored in the first game establish her record for the season, and she begins counting from there.</p>' +
  "<p>" +
  '    <span style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Example</span>' +
  "</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-size: 18px;">Scores are in the same order as the games played. She tabulates her results as follows:</strong>' +
  "</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  '<pre spellcheck="false">Count Game Score Minimum Maximum Min Max 0 12 12 12 0 0 1 24 12 24 0 1 2 10 10 24 1 1 3 24 10 24 1 1' +
  "</pre>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>Given the scores for a season, determine the number of times Maria breaks her records for " +
  '    <span style="font-family: inherit;">most</span> and ' +
  '    <span style="font-family: inherit;">least</span> points scored during the season.</p>' +
  "<p>" +
  '    <span style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Function Description</span>' +
  "</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-size: large;">Complete the </strong>' +
  '    <strong style="font-family: inherit; font-size: large;">breakingRecords</strong>' +
  '    <strong style="font-size: large;"> function in the editor below.</strong>' +
  "</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  "    <strong>breakingRecords has the following parameter(s):</strong>" +
  "</p>" +
  "<ul>" +
  "    <li>" +
  '        <span style="font-family: inherit;">int scores[n]:</span> points scored per game</li>' +
  "</ul>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Returns</strong>' +
  "</p>" +
  "<ul>" +
  "    <li>" +
  '        <span style="font-family: inherit;">int[2]:</span> An array with the numbers of times she broke her records. Index  is for breaking ' +
  '        <span style="font-family: inherit;">most points</span> records, and index  is for breaking ' +
  '        <span style="font-family: inherit;">least points</span> records.</li>' +
  "</ul>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Input Format,</strong>' +
  "</p>" +
  "<p>The first line contains an integer , the number of games.</p>" +
  "<p>The second line contains  space-separated integers describing the respective values of .</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Sample Input 0</strong>' +
  "</p>" +
  '<pre spellcheck="false">9 10 5 20 20 4 5 2 25 1' +
  "</pre>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Sample Output 0</strong>' +
  "</p>" +
  '<pre spellcheck="false">2 4' +
  "</pre>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Explanation 0</strong>' +
  "</p>" +
  "<p>The diagram below depicts the number of times Maria broke her best and worst records throughout the season:</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <span style="font-size: 18px; font-family: inherit;">' +
  '        <img src="https://s3.amazonaws.com/hr-assets/0/1487360234-6bca5c518d-breakingbest3.png" alt="image">' +
  "    </span>" +
  "</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>She broke her best record twice (after games  and ) and her worst record four times (after games , , , and ), so we print " +
  '    <code style="font-family: var(--font-family-input); color: var(--color-text-medium-dark, #39424e);">2 4</code> as our answer. Note that she ' +
  '    <span style="font-family: inherit;">did not</span> break her record for best score during game , as her score during that game was ' +
  '    <span style="font-family: inherit;">not</span> strictly greater than her best record at the time.</p>' +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Sample Input 1,</strong>' +
  "</p>" +
  '<pre spellcheck="false">10 3 4 21 36 10 28 35 5 24 42' +
  "</pre>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Sample Output 1,</strong>' +
  "</p>" +
  '<pre spellcheck="false">4 0' +
  "</pre>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <strong style="font-family: inherit; color: var(--color-text-dark, #0e141e);">Explanation 1</strong>' +
  "</p>" +
  "<p>The diagram below depicts the number of times Maria broke her best and worst records throughout the season:</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<p>" +
  '    <span style="font-size: 18px; font-family: inherit;">' +
  '        <img src="https://s3.amazonaws.com/hr-assets/0/1487360375-aee4388234-breakingbest5.png" alt="image">' +
  "    </span>" +
  "</p>" +
  "<p>" +
  "    <br>" +
  "</p>" +
  "<ul>" +
  "    <li>She broke her best record four times (after games , , , and ) and her worst record zero times (no score during the season was lower than the one she earned during her first game), so we print " +
  '        <code style="font-family: var(--font-family-input); color: var(--color-text-medium-dark, #39424e);">4 0</code> as our answer.</li>' +
  "</ul>";

const QuestionPane = () => {
  return (
    <div id="question-pane" className="px-6 py-5 w-full">
      <div dangerouslySetInnerHTML={{ __html: question }} />
    </div>
  );
};

export default QuestionPane;
