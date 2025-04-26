import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class KakiyoApi implements ICredentialType {
	name = 'kakiyoApi';
	displayName = 'Kakiyo API';
	documentationUrl = 'https://docs.kakiyo.com/api-reference/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The Kakiyo API key obtained from your dashboard',
		},
		{
			displayName: 'API URL',
			name: 'url',
			type: 'string',
			default: 'https://api.kakiyo.com/v1',
			description: 'The URL to the Kakiyo API',
		},
	];

	// This allows the credential to be used by other parts of n8n
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// This credential is testable
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url}}',
			url: '/verify',
			method: 'GET',
		},
	};
}
