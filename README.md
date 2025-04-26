# n8n-nodes-kakiyo

This is an n8n community node. It lets you use Kakiyo in your n8n workflows.

[Kakiyo](https://kakiyo.com/) is a powerful API-driven platform that helps businesses automate and scale their LinkedIn outreach and nurture campaigns with AI-powered conversations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Campaign

- **Create**: Create a new outreach campaign
- **Get All**: List all campaigns
- **Update**: Update an existing campaign
- **Pause**: Pause an active campaign
- **Resume**: Resume a paused campaign
- **Get Stats**: Get statistics for a campaign

### Prospect

- **Add Single**: Add a single prospect to a campaign
- **Add Batch**: Add multiple prospects to a campaign
- **Get All**: List all prospects in a campaign
- **Get Details**: Get details about a prospect and conversation
- **Pause Conversation**: Pause a conversation with a prospect
- **Resume Conversation**: Resume a paused conversation
- **Qualify**: Mark a prospect as qualified

### Product

- **Create**: Create a new product
- **Get All**: List all products

### Prompt

- **Create**: Create a new prompt template
- **Get All**: List all prompt templates

### Agent

- **Create**: Create a new agent
- **Get All**: List all agents
- **Get Details**: Get details about an agent
- **Setup**: Set up an agent with LinkedIn credentials
- **Pause**: Pause an agent
- **Resume**: Resume a paused agent

## Credentials

This node uses the Kakiyo API key for authentication, which you can obtain from your Kakiyo dashboard.

## Example Usage

This workflow shows how to create a new campaign and add prospects to it:

1. **Kakiyo: Get All Products** - First, retrieve all your products to select the right product ID
2. **Kakiyo: Get All Prompts** - Get all your prompts to select the right prompt ID
3. **Kakiyo: Get All Agents** - Get all agents to select the right agent ID
4. **Kakiyo: Create Campaign** - Create a new campaign using the IDs from previous steps
5. **Kakiyo: Add Batch Prospects** - Add multiple prospects to the newly created campaign

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Kakiyo API documentation](https://docs.kakiyo.com/api-reference/introduction)

## Version History

- 1.0.0 - Initial release
