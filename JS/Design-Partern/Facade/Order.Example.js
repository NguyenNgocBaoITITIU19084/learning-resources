"use strict";

class SendEmailService {
  sendEmail(email) {
    console.log(`EmailService:::Send Email to ${email}`);
  }
}

class DiscountService {
  calculatePrice(price) {
    console.log(`Price after get Discount:::${price}`);
  }
}

class VerifyPhoneNumberService {
  verify(phoneNumber) {
    console.log(`verify phone number:::${phoneNumber}`);
  }
}

class Order {
  constructor() {
    this.sendEmailService = new SendEmailService();
    this.discountService = new DiscountService();
    this.verifyPhoneNumber = new VerifyPhoneNumberService();
  }

  createOrder(email, phoneNumber, price) {
    this.sendEmailService.sendEmail(email);
    this.discountService.calculatePrice(price);
    this.verifyPhoneNumber.verify(phoneNumber);
  }
}

const orderService = new Order();
orderService.createOrder("ngocbao123steam@gmail.com", "0933546078", 20000);
