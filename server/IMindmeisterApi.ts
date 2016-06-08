namespace Mindmeister {
	export interface IAuthData {
		apiKey: string
		secretKey: string
		authToken: string
	}

	export interface IApi {
		downloadMap(mapId: string, auth: IAuthData) : Promise<string>
	}
}
