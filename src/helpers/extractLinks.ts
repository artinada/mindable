import { t } from 'testcafe'
import * as api from './api'

type CompanyData = {
	recommendation?: string
	url?: string
	app?: string
	android?: string
	ios?: string
	contactForm?: string
	email?: string
}

export async function verifyOpenedLink(link: Selector, linksObject): Promise<void> {
	await t.click(link)
	const currentUrl = await t.eval(() => window.location.href)
	const expectedUrl = updateProtocolToSecure(linksObject)
	await t
		.expect(currentUrl)
		.contains(expectedUrl)
		.closeWindow()
}

export function updateProtocolToSecure(link: string): string {
	return  link.includes('https')
		? link
		: link.replace('http', 'https')
}

export async function extractLinksForCompany(
	companyName: string,
): Promise<CompanyData> {
	const responseData = await api.getInsuranceData(companyName)
	if (!responseData || !responseData.length) {
		throw new Error(`API: No data provided for company: ${companyName}`)
	}
	const company = responseData[0]
	return {
		recommendation: company.recommendation,
		url: company.url,
		app: company.app,
		android: company.android,
		ios: company.ios,
		contactForm: company.form,
		email: company.email,
	}
}