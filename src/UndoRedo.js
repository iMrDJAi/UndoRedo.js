(function () {
  var UndoRedojs = function (cooldownNumber) {
    if (!cooldownNumber || isNaN(cooldownNumber) || cooldownNumber <= 0) cooldownNumber = 1;
    var history = {};
    history.stack = [''];
    history.currentNumber = 0;
    history.currentCooldownNumber = 0;
    history.record = function (data, force) {
      if (history.currentNumber === history.stack.length - 1) { //checking for regular history updates
        if ((history.currentCooldownNumber >= cooldownNumber || history.currentCooldownNumber === 0) && force !== true) { //history updates after a new cooldown
          history.stack.push(data);
          history.currentNumber++;
          history.currentCooldownNumber = 1;
        } else if (history.currentCooldownNumber < cooldownNumber && force !== true) { //history updates during cooldown
          history.current(data);
          history.currentCooldownNumber++;
        } else if (force === true) { //force to record without cooldown
          history.stack.push(data);
          history.currentNumber++;
          history.currentCooldownNumber = cooldownNumber;
        }
      } else if (history.currentNumber < history.stack.length - 1) { //checking for history updates after undo
        if (force !== true) { //history updates after undo
          history.stack.length = history.currentNumber + 1;
          history.stack.push(data);
          history.currentNumber++;
          history.currentCooldownNumber = 1;
        } else if (force === true) { ////force to record after undo 
          history.stack.length = history.currentNumber + 1;
          history.stack.push(data);
          history.currentNumber++;
          history.currentCooldownNumber = cooldownNumber;
        }
      }
    }
    history.undo = function (readOnly) {
      if (history.currentNumber > 0) {
        if (readOnly !== true) {
          history.currentNumber--;
          return history.stack[history.currentNumber];
        } else {
          return history.stack[history.currentNumber - 1];
        }
      }
    }
    history.redo = function (readOnly) {
      if (history.currentNumber < history.stack.length - 1) {
        if (readOnly !== true) {
          history.currentNumber++;
          return history.stack[history.currentNumber];
        } else {
          return history.stack[history.currentNumber + 1];
        }
      }
    }
    history.current = function (data) {
      if (data) history.stack[history.currentNumber] = data;
      return history.stack[history.currentNumber];
    }
    return history;
  }
  if (typeof (module) !== 'undefined' && typeof (module.exports) !== 'undefined') {
    module.exports = UndoRedojs;
  } 
  if (typeof (window) !== 'undefined' && typeof (window) === 'object') {
    window.UndoRedojs = UndoRedojs;
  }
})();