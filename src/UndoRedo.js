(() => {
    class UndoRedojs {
        constructor(cooldown) {
            if (!cooldown || isNaN(cooldown) || cooldown <= 0) this.cooldown = 1
            else this.cooldown = cooldown
            this.stack = ['']
            this.currentIndex = 0
            this.cooldownState = 0
        }
        record(data, force) {
            if (this.currentIndex === this.stack.length - 1) { //checking for regular history updates
                if ((this.cooldownState >= this.cooldown || this.cooldownState === 0) && force !== true) { //history updates after a new cooldown
                    this.stack.push(data)
                    this.currentIndex++
                    this.cooldownState = 1
                } else if (this.cooldownState < this.cooldown && force !== true) { //history updates during cooldown
                    this.current(data)
                    this.cooldownState++
                } else if (force === true) { //force to record without cooldown
                    this.stack.push(data)
                    this.currentIndex++
                    this.cooldownState = this.cooldown
                }
            } else if (this.currentIndex < this.stack.length - 1) { //checking for history updates after undo
                if (force !== true) { //history updates after undo
                    this.stack.length = this.currentIndex + 1
                    this.stack.push(data)
                    this.currentIndex++
                    this.cooldownState = 1
                } else if (force === true) { ////force to record after undo 
                    this.stack.length = this.currentIndex + 1
                    this.stack.push(data)
                    this.currentIndex++
                    this.cooldownState = this.cooldown
                }
            }
        }
        undo(readOnly) {
            if (this.currentIndex > 0) {
                if (readOnly !== true) {
                    this.currentIndex--
                    return this.stack[this.currentIndex]
                } else {
                    return this.stack[this.currentIndex - 1]
                }
            }
        }
        redo(readOnly) {
            if (this.currentIndex < this.stack.length - 1) {
                if (readOnly !== true) {
                    this.currentIndex++
                    return this.stack[this.currentIndex]
                } else {
                    return this.stack[this.currentIndex + 1]
                }
            }
        }
        current(data) {
            if (data) this.stack[this.currentIndex] = data
            return this.stack[this.currentIndex]
        }
    }
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') { //node
        module.exports = UndoRedojs
    } 
    if (typeof window === 'object') { //browser
        window.UndoRedojs = UndoRedojs
    }
})()
