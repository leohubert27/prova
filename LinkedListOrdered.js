class LinkedListOrdered {
    constructor() {
        this.count = 0;
        this.head = undefined;
    }

    equalsFn(a, b) {
        return a.id === b.id;
    }

    greatherOrEqual(elementA, elementB) { 
        return elementA.priority >= elementB.priority;
    }

    indexOfGreatherThan(element) { 
        let current = this.head;
        let i = 0;
        while (current != null) {
            if (this.greatherOrEqual(current.element, element)) {
                return i;
            }
            current = current.next;
            i++;
        }
        return i;
    }

    insertOrdered(element) {
        let index = 0;
        if (this.isEmpty() || element.priority === 0) {
            this.push(element);
        } else {
            index = this.indexOfGreatherThan(element); 
            this.insert(element, index);
        }
    }

    push(element) {
        const node = new Node(element);
        let current; 
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;    
        }
        this.count++; 
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }

    getElementAt(index) { 
        if (index >= 0 && index < this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }

    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        } 
        return -1;
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head; 
            if (index === 0) {
                this.head = current.next; 
            } else {
                let previous;
                for (let i = 0; i < index; i++) { 
                    previous = current; 
                    current = current.next; 
                }
                previous.next = current.next; 
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count;
    }

    getHead() {
        return this.head;
    }

    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${JSON.stringify(this.head.element)}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString}\n${JSON.stringify(current.element)}`;
            current = current.next;
        }
        return objString;
    }

    removeMaiorWait() {
        if (this.isEmpty()) {
            return undefined;
        }

        let current = this.head;
        let maxWaitNode = current;
        while (current != null) {
            if (current.element.wait > maxWaitNode.element.wait) {
                maxWaitNode = current;
            }
            current = current.next;
        }

        return this.remove(maxWaitNode.element);
    }

    executarProcesso() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.removeAt(0); // Remove o primeiro processo da lista
    }
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

// Exemplo de uso
let processList = new LinkedListOrdered();
processList.insertOrdered({ id: 104, name: "Gerenciador de janelas", priority: 4, wait: 20 });
processList.insertOrdered({ id: 105, name: "Explorador de arquivos", priority: 0, wait: 10 });
processList.insertOrdered({ id: 106, name: "Editor de texto", priority: 2, wait: 15 });

console.log("Lista de Processos:");
console.log(processList.toString());

// Matar o processo com maior tempo de espera
const processoRemovido = processList.removeMaiorWait();
console.log("Processo Removido:");
console.log(JSON.stringify(processoRemovido));

// Executar um processo
const processoExecutado = processList.executarProcesso();
console.log("Processo Executado:");
console.log(JSON.stringify(processoExecutado));

console.log("Lista de Processos Atualizada:");
console.log(processList.toString());
