describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://automationexercise.com')
  })
});

describe("Automation Exercise E-commerce Test Suite", () => {
  const dynamicEmail = `student${Date.now()}@test.com`;
  const password = "TestPassword123";

  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.get("body").then(($body) => {
      if ($body.find(".modal-content").length > 0) {
        cy.get(".modal-content").invoke("remove");
      }
    });
  });

  it("Test Case 1: Verify Homepage Loads", () => {
    cy.url().should("include", "automationexercise.com");
    cy.get(".logo img").should("be.visible");
    cy.get(".shop-menu").should("be.visible");
    cy.get('a[href="/login"]').should("be.visible");

    cy.screenshot('verification-if-the-home-page-loads-correctly');
  });

  it("Test Case 2: Register a New User", () => {
  cy.get('a[href="/login"]').click();

  const email = `user_${Date.now()}@test.com`;
  cy.get('[data-qa="signup-name"]').type("Test User");
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();

  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]').type("Password123!");
  cy.get('[data-qa="days"]').select("1");
  cy.get('[data-qa="months"]').select("January");
  cy.get('[data-qa="years"]').select("2000");

  cy.get('[data-qa="first_name"]').type("First");
  cy.get('[data-qa="last_name"]').type("Last");
  cy.get('[data-qa="address"]').type("123 Street");
  cy.get('[data-qa="country"]').select("United States");
  cy.get('[data-qa="state"]').type("State");
  cy.get('[data-qa="city"]').type("City");
  cy.get('[data-qa="zipcode"]').type("12345");
  cy.get('[data-qa="mobile_number"]').type("1234567890");
  cy.get('[data-qa="create-account"]').click();

  cy.get('[data-qa="account-created"]').should("be.visible");
  cy.get('[data-qa="continue-button"]').click();

  cy.contains("Logged in as Test User").should("be.visible");

  cy.get('a[href="/delete_account"]').click();
  cy.get('[data-qa="account-deleted"]').should("be.visible");
  cy.get('[data-qa="continue-button"]').click();
  cy.screenshot('register-a-new-user-then-delete-the-account');

});


it("Test Case 3: Login With Valid Credentials", () => {

  cy.get('a[href="/login"]').click();

  const email = `user_${Date.now()}@test.com`;
  cy.get('[data-qa="signup-name"]').type("Test User");
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();

  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]').type("Password123!");
  cy.get('[data-qa="days"]').select("1");
  cy.get('[data-qa="months"]').select("January");
  cy.get('[data-qa="years"]').select("2000");

  cy.get('[data-qa="first_name"]').type("First");
  cy.get('[data-qa="last_name"]').type("Last");
  cy.get('[data-qa="address"]').type("123 Street");
  cy.get('[data-qa="country"]').select("United States");
  cy.get('[data-qa="state"]').type("State");
  cy.get('[data-qa="city"]').type("City");
  cy.get('[data-qa="zipcode"]').type("12345");
  cy.get('[data-qa="mobile_number"]').type("1234567890");
  cy.get('[data-qa="create-account"]').click();

  cy.get('[data-qa="account-created"]').should("be.visible");
  cy.get('[data-qa="continue-button"]').click();

  cy.get('a[href="/logout"]').click();
  cy.url().should("include", "/login");
  cy.screenshot('verification-if-a-user-can-login-the-page-and-can-logout.');

});


it("Test Case 4: Login With Invalid Credentials", () => {
  cy.get('a[href="/login"]').click();

  cy.get('[data-qa="login-email"]').type("invalid_user@test.com");
  cy.get('[data-qa="login-password"]').type("WrongPassword123!");
  cy.get('[data-qa="login-button"]').click();

  cy.get('form[action="/login"] p').should("be.visible");
  cy.screenshot('verification-if-a-user-can-login-the-page-with-invalid-credentials.');

});

it("Test Case 5: Search for a Product", () => {
  cy.get('a[href="/products"]').click();

  cy.url().should("include", "/products");
  cy.get(".title").should("be.visible");

  cy.get("#search_product").type("dress");
  cy.get("#submit_search").click();

  cy.get(".title").should("be.visible");
  cy.get(".features_items").should("contain.text", "Dress");
  cy.screenshot('verification-if-a-user-can-search-for-an-item-on-the-page.');

    
});


it("Test Case 6: View Product Details", () => {
  cy.get('a[href="/products"]').click();

  cy.get('.choose a').first().click();

  cy.get('.product-information h2').should('be.visible');
  cy.get('.product-information p').contains('Category:').should('be.visible');
  cy.get('.product-information span span').should('be.visible');
  cy.get('.product-information p').contains('Availability:').should('be.visible');
  cy.get('.product-information p').contains('Condition:').should('be.visible');
  cy.get('.product-information p').contains('Brand:').should('be.visible');
  cy.screenshot('verification-if-a-user-can-view-the-product-details.');

});


it("Test Case 7: Add Product to Cart", () => {
  cy.get('a[href="/products"]').click();

  cy.get('.add-to-cart').first().click();
  cy.get('.modal-body a[href="/view_cart"]').click();

  cy.url().should("include", "/view_cart");
  cy.get("#cart_info_table").should("be.visible");
  
  cy.get(".cart_description").should("be.visible");
  cy.get(".cart_price").should("be.visible");
  cy.get(".cart_quantity").should("be.visible");
  cy.screenshot('verification-if-a-user-can-add-a-product-to cart.');

});

it("Test Case 8: Remove Product From Cart", () => {
  cy.get('.add-to-cart').first().click();
  cy.get('.modal-body a[href="/view_cart"]').click();

  cy.get('.cart_quantity_delete').click();

  cy.get('#empty_cart').should("be.visible");
  cy.screenshot('verification-if-a-user-can-remove-a-product-to cart.');

});

it("Test Case 9: Submit Contact Us Form", () => {
  cy.get('a[href="/contact_us"]').click();

  cy.get('[data-qa="name"]').type("Test User");
  cy.get('[data-qa="email"]').type("user@test.com");
  cy.get('[data-qa="subject"]').type("Support Request");
  cy.get('[data-qa="message"]').type("This is a test message for automation.");
  
  cy.get('input[name="upload_file"]').selectFile({
    contents: Cypress.Buffer.from("file content"),
    fileName: "testfile.txt",
    mimeType: "text/plain",
  });

  cy.get('[data-qa="submit-button"]').click();

  cy.get('.status').should("be.visible");
  cy.screenshot('verification-if-a-user-can-submit-the-contact-form.');

});

it("Challenge 1: Add Multiple Products", () => {
  cy.visit("https://automationexercise.com");

  cy.get(".add-to-cart").eq(0).click();
  cy.get(".btn-success").click(); 

  cy.get(".add-to-cart").eq(2).click(); 
  cy.get("a[href='/view_cart']").last().click();

  cy.get("#cart_info_table tbody tr").should("have.length", 2);
});

it("Challenge 3: Subscribe to Newsletter", () => {
  cy.visit("https://automationexercise.com");
  
  cy.get("#footer").scrollIntoView();

  cy.get("#susbscribe_email").type("test_subscriber@test.com");
  cy.get("#subscribe").click();

  cy.get(".alert-success").should("be.visible");
});



});
