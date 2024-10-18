# CurrencyQuotesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

## Process Description

### Server-Side

The server, written in `Node.js`, is responsible for generating and sending quotes to the client. It generates quote objects in the following format:

```typescript
{
  time: Date; 
  symbol: string; 
  bid: number; 
  ask: number; 
}
```

* ___Quote Generation Frequency___ — 20 times per second.


* ___Data Validation___ — Before sending the quotes, the server checks that the bid value is always less than or equal to the ask. This is necessary to maintain accurate data.


* ___Data Transmission___ — The generated objects are serialized into _JSON_ and sent to the clients via WebSocket connection.


* ___Connection Handling___ — The server maintains a persistent connection with multiple clients simultaneously, sending updated quotes to all connected clients in real time.

### Client-Side
The client establishes a WebSocket connection with the server and processes the received quotes as follows:

* ___WebSocket Connection___ — The client establishes a WebSocket connection with the server using the `rxjs/webSocket` library.


* ___Data Deserialization___ — Messages received from the server are deserialized using the `deserializer()` function.


* ___Update Rate Limiting___ — After deserialization, the data is subjected to a throttle using the throttleTime() operator. This reduces the update frequency to one update every `500 milliseconds` to avoid overloading the client side.


* ___Data Validation___ — Before saving to the store, the data is checked for validity: the `bid` value must always be less than or equal to the `ask`. If the validation is successful, the data is saved to the store using state management.

### Table Component
The component responsible for displaying the quotes is built using semantic HTML markup. Key points:

* ___Data Display___ — Data is rendered through a loop using interpolation, allowing the table to update dynamically when new quotes are received.


* ___Rendering Optimization___ — To optimize performance, the `trackBy` function is used. It prevents unnecessary DOM updates when the list of quotes changes.


* ___Styling___ — The table is styled in a Material Design fashion using SCSS.


* ___Store Subscription___ — The store is injected into the component's constructor. To subscribe to the data stream, the `toSignal()` function is used, which converts the data into signals. This allows the component to automatically update when the store data changes.


* ___Change Detection Strategy___ — The `OnPush` change detection strategy is used. This strategy minimizes the number of component updates, triggering updates only when data references change rather than data values. This significantly improves performance, especially with large datasets.

## Why WebSocket Instead of REST:

* ___Real-time data:___ WebSocket enables real-time, two-way communication, essential for frequent updates like live quotes.


* ___Low latency:___ WebSocket reduces the delay between data generation and transmission, unlike REST, which involves more overhead due to frequent HTTP requests.


* ___Persistent connection:___ WebSocket maintains a single, open connection, allowing continuous data flow, whereas REST requires repeated connections, increasing server load.

## Why Signals in Template Instead of RxJS:

* ___Performance:___ Signals trigger updates only when data changes, reducing the number of component re-renders compared to RxJS with the async pipe.


* ___Simplicity:___ Signals streamline the template by eliminating the need for the async pipe, resulting in cleaner code.


* ___Seamless integration:___ Signals integrate smoothly with state management tools like NgRx, improving data handling.


* ___Optimized change detection:___ Signals work effectively with ChangeDetectionStrategy.OnPush, minimizing unnecessary component updates.


## Testing
### Unit Tests:
*  File `effects/quotes.effects.spec.ts` contains a test to check the template's performance under high loads.
   

__To run the test, use the command `ng test`__

## Automated Tests
* File `cypress/e2e/load-test.cy.js` contains a test to check the template's performance under high loads.


* ___Preparation for Running:___
1. For proper verification, comment out line `21` in the `quotes.effects.ts` file:
```typescript 
 //throttleTime(500)
```
2. To further increase the load, you can increase the data sending frequency from the server. For this, change line `30` in the `server/server.js` file:
```typescript
const updateInterval = 1000 / 20; // 20 times per second

// The larger the number, the more frequently the data is sent (30 === 30 times per second etc.).
```
__To run automation test, use the command `npx cypress open`__


## Node.js server 

Run `node server/server.js` to start the server.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
