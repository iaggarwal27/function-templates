# Google Dialogflow Configuration

The conversational chatbot is powered by an integration between Twilio and Google Dialogflow, a natural language understanding platform used to design and integrate a conversational user interfaces. You need to create a Dialogflow _agent_ to drive the conversational chatbot exposed via Twilio messaging channels. Your Dialogflow agent will be called by the Studio Flow included in this app each time an inbound message is sent.

## Create a new Dialogflow Agent
To get started, visit the [Dialogflow Console](https://dialogflow.cloud.google.com/#/getStarted) and click on the **Create Agent** button in the left nav:
![Create Dialogflow Agent](https://user-images.githubusercontent.com/4605360/121387444-88118f80-c8ff-11eb-8c6f-565550c738fb.png)

Give your agent a name, select the default language you will want the agent to use, and be sure to select the Google Cloud Project you configured in the [previous prerequisite step](prerequisites/google-cloud-platform-config.md):

![Create Agent Details](https://user-images.githubusercontent.com/4605360/121388593-74b2f400-c900-11eb-9a1d-4b9f996fd64d.png)

Click the **Create** button to save your new Dialogflow Agent.

## Configure your Dialogflow Agent
Next, you will need to train your new agent to be able to answer user questions about the COVID-19 vaccines appropriately.

There are two options for configuring your Dialogflow agent:
1. [**Use a pre-built Dialogflow agent**](#1-use-a-pre-built-dialogflow-chatbot-agent): Start with a pre-built chatbot that has been configured to respond to questions about COVID-19 vaccines. There are multiple pre-built chatbot profiles available that each target different audiences.
2. [**Create your own Dialogflow agent**](#2-configure-your-own-dialogflow-chatbot-agent): If the pre-built chatbots do not apply to the audiences you'd like to serve, you can configure your own Dialogflow agent and train it with questions and answers about the vaccine from trusted health sources. Contributing new Dialogflow agents back to this repo is encouraged to create a centralized repository of effective chatbot agents that build vaccine confidence.

### 1. Use a pre-built Dialogflow chatbot agent

Follow the below steps to configure your Dialogflow pre-built agent in your Google project:

1. Pre-built Dialogflow agents are available as `.zip` files under the [`assets/prebuilt-chatbots`](assets/prebuilt-chatbots) folder. There are currently two included pre-built chatbot agents for you to use:
- `usa_ama_agent.zip`: An agent trained the on American Medical Assocaition's [COVID-19 vaccine FAQ](https://www.ama-assn.org/delivering-care/public-health/covid-19-vaccines-patients-frequently-asked-questions) for US audiences. 
- `india_mohfw_agent.zip`: An agent trained on the India Ministry of Health and Family Welfare's [COVID-19 vaccine FAQ](https://www.mohfw.gov.in/covid_vaccination/vaccination/faqs.html) for Indian audiences

Download the `.zip` file from the [prebuilt chatbots]((assets/prebuilt-chatbots)) folder to your local machine by clicking on the file name, then clicking the Download button in the GitHub file interface as shown below:

![Download Zip](https://user-images.githubusercontent.com/4605360/121403008-56a0c000-c90f-11eb-8b50-31c39d35d603.png)

Learn more about Dialogflow agents [here](https://cloud.google.com/dialogflow/es/docs/agents-overview#:~:text=A%20Dialogflow%20agent%20is%20a,apps%20and%20services%20can%20understand).

2. Back on the [Google Dialogflow ES Console](https://dialogflow.cloud.google.com/), click on the gear icon in the left nav next to the agent's name to access your agent's settings:

![Access Dialogflow agent settings](https://user-images.githubusercontent.com/4605360/121403415-b9925700-c90f-11eb-9d55-2a328db0f299.png)

Then, click on the tab called **Export and Import**. This is the place where you will import the `.zip` file containing the prebuilt agent that you downloaded from this repo in the previous step.

Now, click on the **Import from Zip** button as shown below:

![import_agent](https://user-images.githubusercontent.com/4605360/121403937-49d09c00-c910-11eb-84f5-203f874918e6.png)

A modal will appear with a filepicker. Either drag and drop or select the `.zip` file containing the prebuilt agent from the previous step, type "IMPORT" as requested then click the **Import** button.

![Import modal](https://user-images.githubusercontent.com/4605360/121404216-974d0900-c910-11eb-8643-714df27911b8.png)

Congrats! you've imported a pre-built chatbot agent. If everything worked, you should be able to go to the **Intents** page and see the imported questions and answers from the prebuilt agent:

![Confirm import](https://user-images.githubusercontent.com/4605360/121404481-db400e00-c910-11eb-9b4b-148f3d105838.png)

You can now return to the main [README](README.md) to complete installing this app.

### 2. Configure your own Dialogflow chatbot agent

Messaging around vaccine hesitancy should be tailored to specific audiences for maximum effectiveness. If you wish to customize the chatbot interactions to have content targeted to the communities that you serve and create your own chatbot agents, you can use the Jupyter notebook [`studioflow-agent-generator.ipynb`](../assets/make-your-own/studioflow-agent-generator.ipynb) under the `assets/make-your-own/` folder. 

To use the script, head to [Google Colab](https://colab.research.google.com) and click **File > Upload** from the top nav menu:
![Upload](https://user-images.githubusercontent.com/4605360/122097158-361bae80-cdc4-11eb-907f-b94428d7b70a.png)

You can click the **GitHub** tab and paste in [the link to the script](../assets/make-your-own/studioflow-agent-generator.ipynb) to upload to Colab, or download the file and manually upload it:

![GitHub import link](https://user-images.githubusercontent.com/4605360/122097828-f608fb80-cdc4-11eb-998b-7df3711fbbcd.png)

The notebook consists of three sections:
 
1. An example which shows how to extract question/answer pairs from an HTML (or any XML) format, and convert those question/answer pairs into a CSV format.
2. Data upsampling in the shape of paraphrase generation. This section generates paraphrases for each of the questions and generates the intents that will later be included in the dialogflow agent. The output for this section is a second intermediate CSV file which you can check for correctness and manually edit before generating the chatbot agent.
3. Creating a chatbot agent out of the output CSV file from section (2). The output will be a directory containing .json files that can zipped and uploaded directly to Google Dialogflow.

You can find more specific instructions in the [`studioflow-agent-generator.ipynb`](../assets/make-your-own/studioflow-agent-generator.ipynb) Jupyter notebook. 

Once you have your agent ready, follow Step 2 in the [section above](#1-use-a-pre-built-dialogflow-chatbot-agent) to import your `.zip` file Dialogflow agent in your Google project.
