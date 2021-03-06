import {Component} from '@angular/core';
import {ionicBootstrap} from '../../../../../src';
import {Control, ControlGroup} from '@angular/common';


@Component({
  templateUrl: 'main.html'
})
class E2EPage {
  fruits: Control;
  fruitsForm: ControlGroup;
  currenciesControl: Control;
  currencyForm: ControlGroup;
  currencies: Array<string>;
  items: Array<{description: string, value: any}>;
  relationship: string;
  selectedTime: number = 60;

  constructor() {
    this.fruits = new Control('apple');

    this.fruitsForm = new ControlGroup({
      'fruits': this.fruits
    });

    this.currencies = ['USD', 'EUR'];
    this.currenciesControl = new Control('EUR');
    this.currencyForm = new ControlGroup({
      'currenciesControl': this.currenciesControl
    });

    this.relationship = 'enemies';

    this.items = [
      { description: 'value undefined', value: undefined },
      { description: 'value false string', value: 'false' },
      { description: 'value false boolean', value: false },
      { description: 'value 0', value: 0 },
    ];
  }

  setApple() {
    this.fruits.updateValue('apple');
  }

  setBanana() {
    this.fruits.updateValue('banana');
  }

  setCherry() {
    this.fruits.updateValue('cherry');
  }

  doSubmit(event) {
    console.log('Submitting form', this.fruitsForm.value);
    event.preventDefault();
  }

  petChange(ev) {
    console.log('petChange', ev);
  }

  dogSelect(ev) {
    console.log('dogSelect', ev);
  }

  catSelect(ev) {
    console.log('catSelect', ev);
  }

  turtleSelect(ev) {
    console.log('turtleSelect', ev);
  }
}

@Component({
  template: '<ion-nav [root]="root"></ion-nav>'
})
class E2EApp {
  root = E2EPage;
}

ionicBootstrap(E2EApp);
