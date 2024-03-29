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

## Parameterized Tests (Data Driven Test)

a way to run the same test multiple times with different sets of inpu data.

## Setup and Teardown

Sometimes we need to create a consitent environment before running our tests and to clean up any resources or state after the tests have executed. For example, before runnig our tests, we may want to set up a database conncetion, create necessary tables with data and so on. And after our tests, we want to do clean up.

# Breaking Dependencies with Mocks

## What we will cover

1. Creating mock functions
2. Mocking modules
3. Interaction testing using mocks
4. Partial mocking
5. Working with spies
6. Mocking dates/times

## Mock function

a function that imitates the behavior of a real function. wer use them to test a unit in isolation.

### Two cases for mock functions

1. to provide values
2. to test the interaction between units

### Mock functions

1. mockReturnValue => programm a mock function to return a value
2. mockResolvedValue => program a mock function to return a promise that resolves to a value
3. mockImplementation => add loginc to a mock function

### Mock Matchers

1. toHaveBeenCalled() => check if the mock function was called
2. toHaveBeenCalledWith() => check if the mock function was called with an argument
3. toHaveBennCalledOnce() => when we want to make sure that a given mock function is called only once

## Intraction Testing

Sometimes, we need to test the interaction between different units or different funcctions.

## partial Mocking

When we call v.mock() vitest replaces every exported function in this module with a mock function.but there are situations where we want to keep some of the functions in this module. we don't want to replace all of them with mock functions. this is what partial mock function all about.

## Spying on Functions

to monitor the behavior of functions during test execution. it collects information about our function calls, and the result.

## Clearing, Resetting, and Restoring Mocks

we should always clear out our mock functions before or after each test

1. mockClear() => whick clears all information about every call.
2. mockReset() => the same as mockClear(), but it also make the implementation an empty function. so if we programmed our mock function, if we changed its implementations, mockReset() is going ot change that implementation to an empty function.
3. mockRestore()=> similar to mockClear(), but instead of reseting the inner function to an empty function, it restores the original implementation.

this only makes sence in spies because if we create a mock using vi.fn() the original implementation is an empty function and return undefiend. but wen we create a spy, we can optionally changes the implementations, now if we call mock restore, the original implementation will be restored.

## To Mock or Not to Mock

mocks allow us to break dependencies and test our functions in isolation.

But there is a problem with mocks we need to be aware of. Tests that use mocks become dependent on the implementation of our functions. And that's something we should avoid. Because I told you that, we should test what our functions do, not how they are implemented. If our tests know how our functions are implemented, they can break once we change the implementation.

So don't overuse mocks. Use them only for mocking external dependencies like databases, APIs, or services that may not be available or slow to work with during test execution.

# Static Analysis Tools

improve code quality with static analysis tools.

Tools that analyze source code without executing it.

## Benefits of Static Analysis Tools

1. Catch potential errors early in the development process
2. Enforce coding standards and best practices
3. Improve code quality
4. Ensure consistent code quality across the team

## Tools

1. Formatting code with Prettier.
2. Linting code with ESLint
3. catching type errors with TypeScript.
4. Automating code quality checks with Husky.

### Prettier

1. the most-loved code-formatting tool.
2. Consistent code style
3. More readable code
4. Reduced code review discussions about formatting

### ESLint

1. A Popular code quality checker for JavaScript.
2. Catch common coding mistakes early.
3. Enforce coding standards and best practices.
4. Facilitate collaboration within teams

### TypeScript

a statically-typed superset of JavaScript.

1. superset => it means it has everything JS has to offer plus more.
2. statically-typed => the type of our vairables and function parameters are specified at compile time as we code.

#### Benefits of TS

1. Catch typ-related issues at compile time.
2. Improved code documentation.
3. Better tooling for refactoring
4. Stronger codebase with fewer runtime issues.

### Husky

A popular tool for Git hooks automation