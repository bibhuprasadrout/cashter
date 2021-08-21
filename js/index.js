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
const calculate = document.querySelector(".calculate");
const PresCashUnits = document.querySelectorAll(".presCashUnits");
const ReturnedCashUnits = document.querySelectorAll(".returnedCashUnits");
let returnValue = 0;
let noteUnitRequired;
let eligibleNoteValues;

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
    if (noteObj[Object.keys(noteObj)[0]] === note[Object.keys(note)[0]]) {
      noteObj[Object.keys(noteObj)[1]] =
        Object.values(noteObj)[1] - noteUnitRequired;
      PresCashUnits.forEach((element) => {
        if (element.id === `pres${noteObj[Object.keys(noteObj)[0]]}`) {
          element.innerText = `${noteObj[Object.keys(noteObj)[1]]}`;
        }
      });
    }
  });
  noteReturn.forEach((noteObj) => {
    if (noteObj[Object.keys(noteObj)[0]] === note[Object.keys(note)[0]]) {
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

calculate.addEventListener("click", noteAvailCheck);
