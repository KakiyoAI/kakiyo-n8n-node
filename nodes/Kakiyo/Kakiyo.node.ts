import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Kakiyo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kakiyo',
		name: 'kakiyo',
		icon: 'file:kakiyo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Kakiyo API',
		defaults: {
			name: 'Kakiyo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'kakiyoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.url}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Prompt',
						value: 'prompt',
					},
					{
						name: 'Prospect',
						value: 'prospect',
					},
				],
				default: 'campaign',
			},
			// Campaign Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new campaign',
						action: 'Create a campaign',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many campaigns',
						action: 'Get many campaigns',
					},
					{
						name: 'Get Stats',
						value: 'getStats',
						description: 'Get campaign statistics',
						action: 'Get campaign statistics',
					},
					{
						name: 'Pause',
						value: 'pause',
						description: 'Pause a campaign',
						action: 'Pause a campaign',
					},
					{
						name: 'Resume',
						value: 'resume',
						description: 'Resume a paused campaign',
						action: 'Resume a campaign',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a campaign',
						action: 'Update a campaign',
					},
				],
				default: 'getAll',
			},

			// Prospect Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prospect'],
					},
				},
				options: [
					{
						name: 'Add Batch',
						value: 'addBatch',
						description: 'Add multiple prospects to a campaign',
						action: 'Add multiple prospects',
					},
					{
						name: 'Add Single',
						value: 'addSingle',
						description: 'Add a single prospect to a campaign',
						action: 'Add a single prospect',
					},
					{
						name: 'Get Details',
						value: 'getDetails',
						description: 'Get prospect details',
						action: 'Get prospect details',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many prospects for a campaign',
						action: 'Get many prospects',
					},
					{
						name: 'Pause Conversation',
						value: 'pauseConversation',
						description: 'Pause a conversation with a prospect',
						action: 'Pause a conversation',
					},
					{
						name: 'Qualify',
						value: 'qualify',
						description: 'Mark a prospect as qualified',
						action: 'Qualify a prospect',
					},
					{
						name: 'Resume Conversation',
						value: 'resumeConversation',
						description: 'Resume a paused conversation',
						action: 'Resume a conversation',
					},
				],
				default: 'getAll',
			},

			// Product Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new product',
						action: 'Create a product',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many products',
						action: 'Get many products',
					},
				],
				default: 'getAll',
			},

			// Prompt Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new prompt',
						action: 'Create a prompt',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many prompts',
						action: 'Get many prompts',
					},
				],
				default: 'getAll',
			},

			// Agent Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['agent'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new agent',
						action: 'Create an agent',
					},
					{
						name: 'Get Details',
						value: 'getDetails',
						description: 'Get agent details',
						action: 'Get agent details',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many agents',
						action: 'Get many agents',
					},
					{
						name: 'Pause',
						value: 'pause',
						description: 'Pause an agent',
						action: 'Pause an agent',
					},
					{
						name: 'Resume',
						value: 'resume',
						description: 'Resume a paused agent',
						action: 'Resume an agent',
					},
					{
						name: 'Setup',
						value: 'setup',
						description: 'Setup an agent',
						action: 'Setup an agent',
					},
				],
				default: 'getAll',
			},

			// Campaign Fields
			// Get All Campaigns
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['getAll'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'After',
				name: 'after',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Cursor for pagination',
			},

			// Create Campaign
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				description: 'Name of the campaign',
			},
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				description: 'ID of the product for this campaign',
			},
			{
				displayName: 'Prompt ID',
				name: 'promptId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				description: 'ID of the prompt for this campaign',
			},
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				description: 'ID of the agent for this campaign',
			},
			{
				displayName: 'Qualification Automatic',
				name: 'qualificationAutomatic',
				type: 'number',
				default: 70,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				description: 'Automatic qualification threshold (0-100)',
			},
			{
				displayName: 'Qualification Verification',
				name: 'qualificationVerification',
				type: 'number',
				default: 50,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				description: 'Verification qualification threshold (0-100)',
			},
			{
				displayName: 'Variables',
				name: 'variables',
				placeholder: 'Add Variable',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: {},
				options: [
					{
						name: 'variable',
						displayName: 'Variable',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the variable',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the variable',
							},
						],
					},
				],
			},

			// Update Campaign
			{
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['update', 'pause', 'resume', 'getStats'],
					},
				},
				description: 'ID of the campaign',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['update'],
					},
				},
				description: 'New name for the campaign',
			},
			{
				displayName: 'Qualification Automatic',
				name: 'qualificationAutomatic',
				type: 'number',
				default: 70,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['update'],
					},
				},
				description: 'New automatic qualification threshold (0-100)',
			},
			{
				displayName: 'Qualification Verification',
				name: 'qualificationVerification',
				type: 'number',
				default: 50,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['update'],
					},
				},
				description: 'New verification qualification threshold (0-100)',
			},
			{
				displayName: 'Variables',
				name: 'variables',
				placeholder: 'Add Variable',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['update'],
					},
				},
				default: {},
				options: [
					{
						name: 'variable',
						displayName: 'Variable',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the variable',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the variable',
							},
						],
					},
				],
			},

			// Prospect Fields
			// Get All Prospects
			{
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: ['getAll', 'addSingle', 'addBatch'],
					},
				},
				description: 'ID of the campaign',
			},

			// Get Prospect Details, Pause/Resume Conversation, Qualify
			{
				displayName: 'Chat ID',
				name: 'chatId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: ['getDetails', 'pauseConversation', 'resumeConversation', 'qualify'],
					},
				},
				description: 'ID of the chat/conversation',
			},

			// Add Single Prospect
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: ['addSingle'],
					},
				},
				description: 'Name of the prospect',
			},
			{
				displayName: 'LinkedIn URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: ['addSingle'],
					},
				},
				description: 'LinkedIn URL of the prospect',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				placeholder: 'Add Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: ['addSingle'],
					},
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field Name',
								name: 'fieldName',
								type: 'string',
								default: '',
								description: 'Name of the field',
							},
							{
								displayName: 'Field Value',
								name: 'fieldValue',
								type: 'string',
								default: '',
								description: 'Value of the field',
							},
						],
					},
				],
			},

			// Add Batch Prospects
			{
				displayName: 'Prospects',
				name: 'prospects',
				placeholder: 'Add Prospect',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['prospect'],
						operation: ['addBatch'],
					},
				},
				default: {},
				options: [
					{
						name: 'prospect',
						displayName: 'Prospect',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the prospect',
							},
							{
								displayName: 'LinkedIn URL',
								name: 'url',
								type: 'string',
								default: '',
								description: 'LinkedIn URL of the prospect',
							},
							{
								displayName: 'Additional Fields',
								name: 'additionalFields',
								placeholder: 'Add Field',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'field',
										displayName: 'Field',
										values: [
											{
												displayName: 'Field Name',
												name: 'fieldName',
												type: 'string',
												default: '',
												description: 'Name of the field',
											},
											{
												displayName: 'Field Value',
												name: 'fieldValue',
												type: 'string',
												default: '',
												description: 'Value of the field',
											},
										],
									},
								],
							},
						],
					},
				],
			},

			// Product Fields
			// Create Product
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create'],
					},
				},
				description: 'Name of the product',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create'],
					},
				},
				description: 'Detailed description of the product',
			},

			// Prompt Fields
			// Create Prompt
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				description: 'Name of the prompt',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				options: [
					{
						name: 'GPT-4',
						value: 'model_gpt4',
					},
					{
						name: 'Claude 3',
						value: 'model_claude3',
					},
					{
						name: 'GPT-3.5',
						value: 'model_gpt35',
					},
				],
				default: 'model_claude3',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				description: 'AI model to use for the prompt',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Invitation',
						value: 'invitation',
					},
				],
				default: 'message',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				description: 'Type of prompt',
			},

			// Agent Fields
			// Get Agent Details, Pause/Resume Agent
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['getDetails', 'pause', 'resume', 'setup'],
					},
				},
				description: 'ID of the agent',
			},

			// Setup Agent
			{
				displayName: 'Login Email',
				name: 'login',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['setup'],
					},
				},
				description: 'LinkedIn login email',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['setup'],
					},
				},
				description: 'LinkedIn password',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'US',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['setup'],
					},
				},
				description: '2-letter country code (e.g., US, GB)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		let resource: string;
		let operation: string;

		// For all items
		for (let i = 0; i < items.length; i++) {
			try {
				resource = this.getNodeParameter('resource', i) as string;
				operation = this.getNodeParameter('operation', i) as string;

				let endpoint = '';
				let method = '';
				let body: any = {};
				let qs: any = {};

				// Campaign operations
				if (resource === 'campaign') {
					if (operation === 'getAll') {
						method = 'GET';
						endpoint = '/campaigns';
						const limit = this.getNodeParameter('limit', i, 20) as number;
						const after = this.getNodeParameter('after', i, '') as string;
						if (limit) qs.limit = limit;
						if (after) qs.after = after;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/campaigns';
						const name = this.getNodeParameter('name', i) as string;
						const productId = this.getNodeParameter('productId', i) as string;
						const promptId = this.getNodeParameter('promptId', i) as string;
						const agentId = this.getNodeParameter('agentId', i) as string;
						const qualificationAutomatic = this.getNodeParameter('qualificationAutomatic', i, 70) as number;
						const qualificationVerification = this.getNodeParameter('qualificationVerification', i, 50) as number;

						body = {
							name,
							productId,
							promptId,
							agentId,
							qualificationAutomatic,
							qualificationVerification,
							variables: {},
						};

						// Process variables
						const variablesCollection = this.getNodeParameter('variables.variable', i, []) as Array<{ name: string; value: string }>;
						if (variablesCollection.length > 0) {
							const variables: { [key: string]: string } = {};
							for (const variable of variablesCollection) {
								variables[variable.name] = variable.value;
							}
							body.variables = variables;
						}
					} else if (operation === 'update') {
						method = 'PUT';
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						endpoint = `/campaigns/${campaignId}`;

						const name = this.getNodeParameter('name', i, null) as string | null;
						const qualificationAutomatic = this.getNodeParameter('qualificationAutomatic', i, null) as number | null;
						const qualificationVerification = this.getNodeParameter('qualificationVerification', i, null) as number | null;

						body = {};
						if (name) body.name = name;
						if (qualificationAutomatic !== null) body.qualificationAutomatic = qualificationAutomatic;
						if (qualificationVerification !== null) body.qualificationVerification = qualificationVerification;

						// Process variables
						const variablesCollection = this.getNodeParameter('variables.variable', i, []) as Array<{ name: string; value: string }>;
						if (variablesCollection.length > 0) {
							const variables: { [key: string]: string } = {};
							for (const variable of variablesCollection) {
								variables[variable.name] = variable.value;
							}
							body.variables = variables;
						}
					} else if (operation === 'pause') {
						method = 'POST';
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						endpoint = `/campaigns/${campaignId}/pause`;
					} else if (operation === 'resume') {
						method = 'POST';
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						endpoint = `/campaigns/${campaignId}/resume`;
					} else if (operation === 'getStats') {
						method = 'GET';
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						endpoint = `/campaigns/${campaignId}/stats`;
					}
				}

				// Prospect operations
				else if (resource === 'prospect') {
					if (operation === 'getAll') {
						method = 'GET';
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						endpoint = `/prospects/campaign/${campaignId}`;
					} else if (operation === 'getDetails') {
						method = 'GET';
						const chatId = this.getNodeParameter('chatId', i) as string;
						endpoint = `/prospects/${chatId}`;
					} else if (operation === 'addSingle') {
						method = 'POST';
						endpoint = '/prospects';
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const url = this.getNodeParameter('url', i) as string;

						body = {
							campaignId,
							name,
							url,
						};

						// Process additional fields
						const additionalFieldsCollection = this.getNodeParameter('additionalFields.field', i, []) as Array<{ fieldName: string; fieldValue: string }>;
						if (additionalFieldsCollection.length > 0) {
							body.additionalFields = additionalFieldsCollection.map(field => ({
								fieldName: field.fieldName,
								fieldValue: field.fieldValue,
							}));
						}
					} else if (operation === 'addBatch') {
						method = 'POST';
						endpoint = '/prospects/batch';
						const campaignId = this.getNodeParameter('campaignId', i) as string;

						// Process prospects
						const prospectsCollection = this.getNodeParameter('prospects.prospect', i, []) as Array<{
							name: string;
							url: string;
							additionalFields: { field: Array<{ fieldName: string; fieldValue: string }> };
						}>;

						const prospects = prospectsCollection.map(prospectData => {
							const prospect: any = {
								name: prospectData.name,
								url: prospectData.url,
							};

							if (prospectData.additionalFields && prospectData.additionalFields.field && prospectData.additionalFields.field.length > 0) {
								prospect.additionalFields = prospectData.additionalFields.field.map(field => ({
									fieldName: field.fieldName,
									fieldValue: field.fieldValue,
								}));
							}

							return prospect;
						});

						body = {
							campaignId,
							prospects,
						};
					} else if (operation === 'pauseConversation') {
						method = 'POST';
						const chatId = this.getNodeParameter('chatId', i) as string;
						endpoint = `/prospects/${chatId}/pause`;
					} else if (operation === 'resumeConversation') {
						method = 'POST';
						const chatId = this.getNodeParameter('chatId', i) as string;
						endpoint = `/prospects/${chatId}/resume`;
					} else if (operation === 'qualify') {
						method = 'POST';
						const chatId = this.getNodeParameter('chatId', i) as string;
						endpoint = `/prospects/${chatId}/qualify`;
					}
				}

				// Product operations
				else if (resource === 'product') {
					if (operation === 'getAll') {
						method = 'GET';
						endpoint = '/products';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/products';
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;

						body = {
							name,
							description,
						};
					}
				}

				// Prompt operations
				else if (resource === 'prompt') {
					if (operation === 'getAll') {
						method = 'GET';
						endpoint = '/prompts';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/prompts';
						const name = this.getNodeParameter('name', i) as string;
						const model = this.getNodeParameter('model', i) as string;
						const type = this.getNodeParameter('type', i) as string;

						body = {
							name,
							model,
							type,
						};
					}
				}

				// Agent operations
				else if (resource === 'agent') {
					if (operation === 'getAll') {
						method = 'GET';
						endpoint = '/agents';
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/agents';
					} else if (operation === 'getDetails') {
						method = 'GET';
						const agentId = this.getNodeParameter('agentId', i) as string;
						endpoint = `/agents/${agentId}`;
					} else if (operation === 'setup') {
						method = 'POST';
						const agentId = this.getNodeParameter('agentId', i) as string;
						endpoint = `/agents/${agentId}/setup`;
						const login = this.getNodeParameter('login', i) as string;
						const password = this.getNodeParameter('password', i) as string;
						const country = this.getNodeParameter('country', i) as string;

						body = {
							login,
							password,
							country,
						};
					} else if (operation === 'pause') {
						method = 'POST';
						const agentId = this.getNodeParameter('agentId', i) as string;
						endpoint = `/agents/${agentId}/pause`;
					} else if (operation === 'resume') {
						method = 'POST';
						const agentId = this.getNodeParameter('agentId', i) as string;
						endpoint = `/agents/${agentId}/resume`;
					}
				}

				// Make the request
				const options: any = {
					method,
					url: endpoint,
					qs,
				};

				if (Object.keys(body).length > 0) {
					options.body = body;
					options.json = true;
				}

				const responseData = await this.helpers.requestWithAuthentication.call(this, 'kakiyoApi', options);

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
