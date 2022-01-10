import { Selector, t } from 'testcafe'

class RezeptPage {
	stepSection: Selector = Selector('h3')
	findCompanySection: Selector = this.stepSection.withText('Rezept bei der Krankenkasse einreichen')
	inputField: Selector = Selector('div.app-input input')
	inputIcon: Selector = Selector('.app-input__icon')
	listElements: Selector = Selector('li div.cursor-pointer')

	insuranceTitle: Selector = Selector('.insurance__title h3')
	recommendLabel: Selector = Selector('.recommend')

	appSection: Selector = Selector('.contact--app')
	portalButton: Selector = Selector('button.app-button--lg').withText('Zum Online-Portal')
	androidAppLink: Selector = Selector('a').withText('Android App')
	iosAppLink: Selector = Selector('a').withText('iOS App')

	emailSection: Selector = Selector('.contact--email')
	sentEmailLink: Selector = this.emailSection.find('a[href^="mailto:"]')
	generateEmailButton: Selector = Selector('button').withText('Rezept einreichen')
	copyTemplateButton: Selector = Selector('button').withText('E-Mail-Vorlage kopieren')
	templateCopiedButton: Selector = Selector('button').withText('In Zwischenablage kopiert')

	postSection: Selector = Selector('.contact--post')

	contactsSection: Selector = Selector('.contact--tel')
	websiteLink: Selector = this.contactsSection.find('p').withText('Website:').child('a')
	contactFormLink: Selector = Selector('a').withText('Kontaktformular')
	contactEmailLink: Selector = this.contactsSection.find('a[href^="mailto:"]')

	getInputFieldSelector(): Selector {
		return this.stepSection.withText('Rezept bei der Krankenkasse einreichen').find('input')
	}

	async getButtonLink(selector: Selector): Promise<string> {
		return selector.parent().getAttribute('href')
	}
}

export default new RezeptPage