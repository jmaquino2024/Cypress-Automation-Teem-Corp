import 'cypress-xpath';

describe('User Registration and Login', () => {
  let randomName;
  let randomEmail;
  const password = 'SecurePass123!';
  const baseUrl = 'https://fmp.telecomonline.com.au';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Registers a new user', () => {
    cy.xpath('//a[contains(@href, "/register") and contains(text(), "Register")]').click();
    cy.url().should('eq', `${baseUrl}/register`);

    randomName = `User${Math.floor(Math.random() * 10000)}`;
    randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;

    cy.xpath('//input[@id="name" and @name="name"]').type(randomName);
    cy.xpath('//input[@id="email" and @name="email"]').type(randomEmail);
    cy.xpath('//input[@id="password" and @name="password"]').type(password);
    cy.xpath('//input[@id="password_confirmation" and @name="password_confirmation"]').type(password);

    cy.log(`Generated Name: ${randomName}`);
    cy.log(`Generated Email: ${randomEmail}`);

    cy.xpath('//button[contains(@class, "bg-gray-800") and contains(text(), "Register")]').click();
    cy.url().should('eq', `${baseUrl}/dashboard`);
  });

  it('Logs in with registered credentials', () => {
    cy.xpath('//a[contains(@href, "/login") and contains(text(), "Log in")]').click();
    cy.url().should('eq', `${baseUrl}/login`);

    cy.xpath('//input[@id="email" and @name="email"]').type(randomEmail);
    cy.xpath('//input[@id="password" and @name="password"]').type(password);
    
    cy.xpath('//button[contains(@class, "bg-gray-800") and contains(text(), "Log in")]').click();
    cy.url().should('eq', `${baseUrl}/dashboard`);
  });

  it('Verifies Dashboard Page and Company Information', () => {
    cy.xpath('//a[contains(@href, "/login") and contains(text(), "Log in")]').click();
    cy.url().should('eq', `${baseUrl}/login`);

    cy.xpath('//input[@id="email" and @name="email"]').type(randomEmail);
    cy.xpath('//input[@id="password" and @name="password"]').type(password);
    cy.xpath('//button[contains(@class, "bg-gray-800") and contains(text(), "Log in")]').click();
    cy.url().should('eq', `${baseUrl}/dashboard`);

    // Navigate to Company Information
    cy.xpath('//a[contains(@href, "/company-information") and contains(text(), "Company Information")]').click();
    cy.url().should('eq', `${baseUrl}/company-information`);

    cy.xpath('//input[@placeholder="Symbol"]').type('AAA').should('have.value', 'AAA');
    cy.xpath('//button[contains(@class, "bg-indigo-500") and contains(text(), "Get Profile")]').click();
    
    cy.xpath('//div[contains(@class, "max-w-screen-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden")]')
      .should('be.visible');
    
    // Verify labels
    cy.xpath('//p[contains(@class, "text-sm text-gray-500")]').then(($elements) => {
      const extractedLabels = $elements.map((i, el) => Cypress.$(el).text()).get();
      const expectedLabels = [
        "Symbol", "Price", "Beta", "VolAvg", "MktCap", "LastDiv", "Range", "Changes",
        "Currency", "Cik", "Isin", "Cusip", "Exchange", "ExchangeShortName", "Industry",
        "Website", "Ceo", "Sector", "Country", "FullTimeEmployees", "Phone", "Address",
        "City", "State", "Zip", "DcfDiff", "Dcf", "IpoDate", "DefaultImage", "IsEtf",
        "IsActivelyTrading", "IsAdr", "IsFund"
      ];
      expect(extractedLabels.sort()).to.deep.equal(expectedLabels.sort());
    });

    // Navigate to Company Quote
    cy.xpath('//a[contains(@href, "/company-quote") and contains(text(), "Company Quote")]').click();
    cy.url().should('eq', `${baseUrl}/company-quote`);
    
    cy.xpath('//input[@placeholder="Symbol"]').type('AAA');
    cy.xpath('//button[contains(text(), "Get Full Quote")]').click();
    
    cy.xpath('//div[contains(@class, "max-w-screen-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden")]')
      .should('be.visible');
    
    cy.get('p.text-sm.text-gray-500').then(($elements) => {
      const uniqueLabels = [...new Set($elements.map((i, el) => Cypress.$(el).text()).get())];
      const expectedLabels = [
        "Symbol", "Price", "ChangesPercentage", "Change", "DayLow", "DayHigh", 
        "YearHigh", "YearLow", "MarketCap", "PriceAvg50", "PriceAvg200", 
        "Exchange", "Volume", "AvgVolume", "Open", "PreviousClose", 
        "Eps", "Pe", "EarningsAnnouncement", "SharesOutstanding", "Timestamp"
      ];
      expect(uniqueLabels.sort()).to.deep.equal(expectedLabels.sort());
    });
  });
});
