let maxUnit = [
  {
    noteVal: 2000,
    max2000: 5
  },
  {
    noteVal: 500,
    max500: 10
  },
  {
    noteVal: 200,
    max200: 20
  },
  {
    noteVal: 100,
    max100: 20
  },
  {
    noteVal: 50,
    max50: 20
  },
  {
    noteVal: 20,
    max20: 20
  },
  {
    noteVal: 10,
    max10: 20
  },
  {
    noteVal: 5,
    max5: 20
  },
  {
    noteVal: 2,
    max2: 20
  },
  {
    noteVal: 1,
    max1: 20
  }
];

let notePres = [
  {
    noteVal: 2000,
    pres2000: 5
  },
  {
    noteVal: 500,
    pres500: 10
  },
  {
    noteVal: 200,
    pres200: 20
  },
  {
    noteVal: 100,
    pres100: 20
  },
  {
    noteVal: 50,
    pres50: 20
  },
  {
    noteVal: 20,
    pres20: 20
  },
  {
    noteVal: 10,
    pres10: 20
  },
  {
    noteVal: 5,
    pres5: 20
  },
  {
    noteVal: 2,
    pres2: 20
  },
  {
    noteVal: 1,
    pres1: 20
  }
];

let noteReturn = [
  {
    noteVal: 2000,
    pres2000: 0
  },
  {
    noteVal: 500,
    pres500: 0
  },
  {
    noteVal: 200,
    pres200: 0
  },
  {
    noteVal: 100,
    pres100: 0
  },
  {
    noteVal: 50,
    pres50: 0
  },
  {
    noteVal: 20,
    pres20: 0
  },
  {
    noteVal: 10,
    pres10: 0
  },
  {
    noteVal: 5,
    pres5: 0
  },
  {
    noteVal: 2,
    pres2: 0
  },
  {
    noteVal: 1,
    pres1: 0
  }
];
const bill = document.querySelector("#bill_amount");
const paid = document.querySelector("#paid_amount");
const returned = document.querySelector("#return_amount");
const PresCashUnits = document.querySelectorAll(".presCashUnits");
const ReturnedCashUnits = document.querySelectorAll(".returnedCashUnits");
const calculate = document.querySelector(".calculate");
const reset = document.querySelector('input[type=reset]')
let returnValue = 0;
let noteUnitRequired;
let eligibleNoteValues;

console.log(`This application can be improved a lot more, but at this stage neoG does not require that level of scrutiny.

The application works like a real cashier where there are finite numbers of cash available and transaction can not go beyond that limit, In this app the count displayed in the first table are the available cash beyond that negative numbers shall appear.

As mentioned above the requirement does not call for such standards at the moment.`)

function valueReturned(returnValue) {
  if (Number(bill.value) > 0 && Number(paid.value) > Number(bill.value)) {
    returnValue = paid.value - bill.value;
  }
  return returnValue;
}

function eligibleNoteCalculator(notePres, balanceAmount) {
  eligibleNoteValues = [];
  notePres.forEach((note) => {
    if (balanceAmount >= Object.values(note)[0]) {
      eligibleNoteValues.push(note);
    }
  });
  return eligibleNoteValues;
}

function noteRequiredCalculator(balanceAmount, note) {
  return (noteUnitRequired = Math.floor(
    balanceAmount / note[Object.keys(note)[0]]
  ));
}

function updateTransaction(note) {
  console.log(`Note required for return : ${noteUnitRequired}`);
  notePres.forEach((noteObj) => {
    if (noteObj[Object.keys(noteObj)[0]] === note[Object.keys(note)[0]] && noteObj[Object.keys(noteObj)[1]] > 0) {
      noteObj[Object.keys(noteObj)[1]] =
        Object.values(noteObj)[1] - noteUnitRequired;
      PresCashUnits.forEach((element) => {
        if (element.id === `pres${noteObj[Object.keys(noteObj)[0]]}`) {
          element.innerText = `${noteObj[Object.keys(noteObj)[1]]}`;
        }
      });
    }
  });
  noteReturn.forEach((noteObj, index) => {
    console.log(notePres[index][Object.keys(notePres[index])[1]])
    if (noteObj[Object.keys(noteObj)[0]] === note[Object.keys(note)[0]] && noteObj[Object.keys(noteObj)[1]] < (maxUnit[index][Object.keys(maxUnit[index])[1]])) {
      noteObj[Object.keys(noteObj)[1]] =
        Object.values(noteObj)[1] + noteUnitRequired;
      ReturnedCashUnits.forEach((element) => {
        if (element.id === `returned${noteObj[Object.keys(noteObj)[0]]}`) {
          element.innerText = `${noteObj[Object.keys(noteObj)[1]]}`;
        }
      });
    }
  });
}

function balanceDisolver(balanceAmount) {
  console.log(`Balance Amount is : ${balanceAmount}`);
  eligibleNoteValues = eligibleNoteCalculator(notePres, balanceAmount);
  console.log(
    `Valid denominations for return cash: ${JSON.stringify(eligibleNoteValues)}`
  );
  eligibleNoteValues.forEach((note) => {
    noteUnitRequired = noteRequiredCalculator(balanceAmount, note);
    if (noteUnitRequired <= note[Object.keys(note)[1]]) {
      balanceAmount -= noteUnitRequired * note[Object.keys(note)[0]];
      console.log(`Remaining balance : ${balanceAmount}`);
      updateTransaction(note);
    } else {
      balanceAmount =
        balanceAmount - note[Object.keys(note)[0]] * note[Object.keys(note)[1]];
      console.log(`Remaining balance : ${balanceAmount}`);
      updateTransaction(note);
    }
  });
}

function noteAvailCheck() {
  returnValue = valueReturned(returnValue);
  balanceDisolver(returnValue);
  console.log(`    `);
  console.log(`Presesnt cash units: ${JSON.stringify(notePres)}`);
  console.log(`    `);
  console.log(`Returned cash units: ${JSON.stringify(noteReturn)}`);
}

calculate.addEventListener("click", function() {
  if((bill.value) && (paid.value) && Number(paid.value) > Number(bill.value)) {
    noteAvailCheck() 
    document.querySelector('.disclaimer').innerText = 'Please refer the console for a better perspective of the core mechanics of the code.'
  } else if((bill.value) && (paid.value) && Number(paid.value) < Number(bill.value)) {
    document.querySelector('.disclaimer').innerText = 'Please pay more than the generated bill amount.'
  } else {
    document.querySelector('.disclaimer').innerText = 'Please enter valid inputs.'
  }
});

reset.addEventListener('click', function() {
  document.querySelector('.disclaimer').innerText = ''
})
