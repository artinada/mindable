import axios from 'axios'
const axiosInstance = axios.create()

export async function getInsuranceData(searchQuery: string): Promise<Array<any>> {
	try {
		const response = await axiosInstance({
			method: 'POST',
			baseURL: 'https://mh.mindable.health/_content/insurance',
			headers: {
				'content-Type': 'application/json',
			},
			timeout: 30000,
			data: {
				'search': { 'query': searchQuery },
			},
		})
		if (!response.data) {
			throw new Error(
				'There is no data in response',
			)
		}
		return response.data as Array<any>
	} catch (err) {
		console.log('Failed getting company data', err)
		throw err
	}
}