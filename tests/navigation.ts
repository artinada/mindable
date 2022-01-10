import { fixture, test } from 'testcafe'
import * as api from '../src/helpers/extractLinks'
import RezeptPage from '../src/pages/RezeptPage'
import { verifyOpenedLink } from '../src/helpers/extractLinks'

fixture`Getting prescription`
	.page`https://mh.mindable.health/rezept`

test('Check links on Company sections', async t => {
	const companyName = 'IKK BB - Brandenburg und Berlin'

	// show company information (select by the name)
	await t
		.scrollIntoView(RezeptPage.findCompanySection)
		.typeText(RezeptPage.inputField, companyName)
		.click(RezeptPage.inputIcon)
		.expect(RezeptPage.listElements.exists)
		.ok('List of companies is not shown')
	await t.click(RezeptPage.listElements.withText(companyName))
		.expect(RezeptPage.insuranceTitle.innerText)
		.eql(companyName)
		.expect(RezeptPage.recommendLabel.exists)
		.ok('Label "Recommended" is not showed')

	// api get response for the company
	const linksObject = await api.extractLinksForCompany(companyName)
	console.log('linksObject: ', linksObject)

	// getting email links and asserting them with object
	if (linksObject.recommendation === 'email') {
		await t.expect(RezeptPage.emailSection.exists).ok('Email section is not shown')
		await t
			.expect(RezeptPage.sentEmailLink.exists)
			.ok('Email address is not shown')
			.expect(RezeptPage.sentEmailLink.getAttribute('href'))
			.contains(linksObject.email)
		await t
			.expect(RezeptPage.generateEmailButton.exists)
			.ok('Generate email button is not shown')
			.expect(await RezeptPage.getButtonLink(RezeptPage.generateEmailButton))
			.contains(linksObject.email)
	} else {
		await t
			.expect(RezeptPage.contactEmailLink.exists)
			.ok('Contact email is not shown')
			.expect(RezeptPage.contactEmailLink.getAttribute('href'))
			.contains(linksObject.email)
	}

	// getting application links
	// but first - behaviour should be clarified with PO
	if (linksObject.recommendation === 'app') {
		await t.expect(RezeptPage.appSection.exists).ok('App section is not shown')
		await t.expect(RezeptPage.portalButton.exists).ok('Online-portal button is not shown')
		await verifyOpenedLink(RezeptPage.portalButton, linksObject.app)

		await t.expect(RezeptPage.androidAppLink.exists).ok('Link to Google Play is not shown')
		await verifyOpenedLink(RezeptPage.androidAppLink, linksObject.android)

		await t.expect(RezeptPage.iosAppLink.exists).ok('Link to iOS App is not shown')
		await verifyOpenedLink(RezeptPage.iosAppLink, linksObject.ios)
	}

	// getting links from "Contacts" section
	await t.expect(RezeptPage.contactsSection.exists).ok('Contacts section is not shown')
	await t.expect(RezeptPage.websiteLink.exists).ok('Link to website is not shown')
	await verifyOpenedLink(RezeptPage.websiteLink, linksObject.url)
	if (linksObject.contactForm) {
		await t.expect(RezeptPage.contactFormLink.exists).ok('Link to Contact Form is not shown')
		await verifyOpenedLink(RezeptPage.contactFormLink, linksObject.contactForm)
	}
})