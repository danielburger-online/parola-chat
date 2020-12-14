require('dotenv').config();
const uuid = require("uuid")
const { SessionsClient } = require('@google-cloud/dialogflow-cx');

const projectId = process.env.DF_PROJECTID;
const agentId = process.env.DF_AGENTID;
const languageCode = process.env.DF_LANGCODE;
const location = process.env.DF_LOCATION;

const query = 'Wie geht es dir?'; // TODO Embed into REST API routes
const client = new SessionsClient();

async function detectIntentText() {
  const sessionId = uuid.v4();
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  console.info(sessionPath);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  console.log(`User Query: ${query}`);
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(`Current Page: ${response.queryResult.currentPage.displayName}`);
}

detectIntentText();
// [END dialogflow_cx_detect_intent_text]

// main(...process.argv.slice(2));
// process.on('unhandledRejection', err => {
//   console.error(err.message);
//   process.exitCode = 1;
//});