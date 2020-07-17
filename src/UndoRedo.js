(() => {
    class UndoRedojs {
        constructor(cooldownNumber) {
            if (!cooldownNumber || isNaN(cooldownNumber) || cooldownNumber <= 0) this.cooldownNumber = 1
            else this.cooldownNumber = cooldownNumber
            this.stack = ['']
            this.currentNumber = 0
            this.currentCooldownNumber = 0
        }
        record(data, force) {
            if (this.currentNumber === this.stack.length - 1) { //checking for regular history updates
                if ((this.currentCooldownNumber >= this.cooldownNumber || this.currentCooldownNumber === 0) && force !== true) { //history updates after a new cooldown
                    this.stack.push(data)
                    this.currentNumber++
                    this.currentCooldownNumber = 1
                } else if (this.currentCooldownNumber < this.cooldownNumber && force !== true) { //history updates during cooldown
                    this.current(data)
                    this.currentCooldownNumber++
                } else if (force === true) { //force to record without cooldown
                    this.stack.push(data)
                    this.currentNumber++
                    this.currentCooldownNumber = this.cooldownNumber
                }
            } else if (this.currentNumber < this.stack.length - 1) { //checking for history updates after undo
                if (force !== true) { //history updates after undo
                    this.stack.length = this.currentNumber + 1
                    this.stack.push(data)
                    this.currentNumber++
                    this.currentCooldownNumber = 1
                } else if (force === true) { ////force to record after undo 
                    this.stack.length = this.currentNumber + 1
                    this.stack.push(data)
                    this.currentNumber++
                    this.currentCooldownNumber = this.cooldownNumber
                }
            }
        }
        undo(readOnly) {
            if (this.currentNumber > 0) {
                if (readOnly !== true) {
                    this.currentNumber--
                    return this.stack[this.currentNumber]
                } else {
                    return this.stack[this.currentNumber - 1]
                }
            }
        }
        redo(readOnly) {
            if (this.currentNumber < this.stack.length - 1) {
                if (readOnly !== true) {
                    this.currentNumber++
                    return this.stack[this.currentNumber]
                } else {
                    return this.stack[this.currentNumber + 1]
                }
            }
        }
        current(data) {
            if (data) this.stack[this.currentNumber] = data
            return this.stack[this.currentNumber]
        }
    }
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') { //node
        module.exports = UndoRedojs
    } 
    if (typeof window === 'object') { //browser
        window.UndoRedojs = UndoRedojs
    }
})()