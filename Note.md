# What we will cover

1. what is unit tesing
2. types of tests
3. testing frameworks
4. setting up vitest
5. Test-driven Development (TDD)
6. running tests efficiently
7. code coverage

## What is Unit Testing?

A form of automated testing where we write code to test our code

### Benefits of Unit Testing

1. Detects bug Early
2. Facilitates Refactoring => changing the structure of the code without changing its behavior.
3. Improves code quality
4. Documentation

### Types of Tests

1. Unit Testing
    * Verify the correctness of individual units or compnents of an application in isolation.
    * Help catch bugs early in the development process
2. Integration Testing
    * Verify how diffrent units or components of your application work together as a whole
    * idenfity issues that might arise when combining diffrent units such as data flow problems, communication between modules, and copatibility issues between components.
3. End-to-end Testing
    * broadest type of test focusing on testing the entire application as a whole
    * the simulate real user interactions with the entire system
    
    

## Test Driven Development (TDD)

1. start by writing a failing test
2. write just enough code to make the test pass
3. refactor if necessary

TDD produces code that is **100% coverd** by tests.

TDD prevents us from over-engineering solutions.
