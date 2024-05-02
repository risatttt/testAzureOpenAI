const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ;
const azureApiKey = process.env["AZURE_OPENAI_API_KEY"] ;
const deploymentId = process.env["DEPLOY_ID"];

const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
    { role: "user", content: "Do other Azure AI services support this too" },
];

async function main() {
    console.log("== Chat Completions Sample ==");

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const result = await client.getChatCompletions(deploymentId, messages);

    for (const choice of result.choices) {
        console.log(choice.message);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

module.exports = { main };