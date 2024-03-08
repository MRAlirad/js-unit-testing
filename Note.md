# Intoduction To Unit Testing

## What we will cover

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
    - Verify the correctness of individual units or compnents of an application in isolation.
    - Help catch bugs early in the development process
2. Integration Testing
    - Verify how diffrent units or components of your application work together as a whole
    - idenfity issues that might arise when combining diffrent units such as data flow problems, communication between modules, and copatibility issues between components.
3. End-to-end Testing
    - broadest type of test focusing on testing the entire application as a whole
    - the simulate real user interactions with the entire system

## Tesing Framework

A set of tools for writing and running tests

### Wath a test framwork includes

1. Test Runner => executing tests
2. Assertion Libraries => check if the code behaves as expected
3. Mocking Tools => replace certain modules with fake simulating different scenarios
4. Test Coverage Tools => check how much of the code is covered by tests

## Test Driven Development (TDD)

1. start by writing a failing test
2. write just enough code to make the test pass
3. refactor if necessary

TDD produces code that is **100% coverd** by tests.

TDD prevents us from over-engineering solutions.

# Core Unit Testing Techniques

## What we will cover

1. Characteeristics of good unit tests => guiding principles that ensure your tests are reliable, maintainable and effective.
2. Using matchers
3. Writing good assertions
4. Positive and negative testing
5. Boundary testing
6. Writing parameterized tests
7. Testing asynchronous code
8. Setup and tear down

## Characteeristics of good unit tests

Not all tests are created equall.
Writing bad tests is worse than having no tests.
Not only don't they provide any value, but they also get in the way and prevent you from getting your job done.

Good tests are maintainable, robust, and trustworthy

### Maintainable Tests

1. have a clear name
2. Test a single behavior
3. are small (ideally, less than 10 lines).
4. Have clear variables/constants
5. Are properly formatted

### Robust Tests

A test that is resilient to changes in code

1. Test the behavior, not implementation
2. Avoid tight assertions

### Trustworthy Tests

A test that can be trusted. => out tests should not produce false positives or false negatives.

-   When they pass, we should be confident that the behavior we have tested is actually working.
-   When They fail, we should know that somethid is wrong with the production code and not the test

<br>

1. Validate the correct behavior.
2. Test boundary conditions. => such as empty arrays, null inputs and extreme values to verify that our code handles them correctly.
3. Are deterministic. => produce the same result every time.
4. Tests should be isolated
    - Are not dependent on random data
    - Are not dependent on current data/time
    - Are not dependent on global state

## Using Mathers

1. Equality
    - toBe => use to be with primitive values like numbers, strings, and booleans
    - toEqual => comparing objects
2. Truthiness
    - toBeTruthy
    - toBefalsy
    - toBeNull
    - toBeUndefined
    - toBeDefined
3. Numbers
    - toBeGreaterThan
    - toBeGreaterThanOrEqualTo
    - toBeLessThan
    - toBeLessThanOrEqualTo
    - toBeCloseTo => for floating point numbers
4. Stings
    - toMatch => look for certain words or pharases in a message.
5. Objects
    - toMatchObject => assert that an object matches a subset of properties of an object.
    - toHaveProperty => to see if an object has a particular property.
6. Arrays
    - toContain => to assert that an array contains a certain value.
    - toHaveLength => for asserting the length of an array
7. Exceptions
    - toThrowError => when we expect a function to thorw an exeption.

## Positive and Negative Testing

1. Positive Testing => Ensure that our application works correctly under normal conditions.
2. Negative Tesing => Checks how well our applications handles unexpected or incorrect input.

## Boundary Testing

A testing technique where we focus on the edges or boundaries of input values to ensure our software behaves correctly under extreme conditions
