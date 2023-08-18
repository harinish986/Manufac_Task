var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(ceo) {
        this.history = {
            move: [],
            undo: [],
        };
        this.ceo = ceo;
    }
    EmployeeOrgApp.prototype.move = function (employeeID, supervisorID) {
        var employee = this.findEmployee(this.ceo, employeeID);
        var supervisor = this.findEmployee(this.ceo, supervisorID);
        if (!employee || !supervisor) {
            throw new Error('Invalid employee or supervisor ID');
        }
        // Store the current state for undo operation
        this.history.undo.push({
            employeeID: employeeID,
            supervisorID: employee.subordinates.length > 0 ? employee.subordinates[0].uniqueId : null,
        });
        // Update the employee's supervisor
        employee.subordinates = [];
        supervisor.subordinates.push(employee);
        employee.subordinates = [];
        // Store the move action in history
        this.history.move.push({ employeeID: employeeID, supervisorID: supervisorID });
    };
    EmployeeOrgApp.prototype.undo = function () {
        var lastMove = this.history.move.pop();
        if (lastMove) {
            var employeeID_1 = lastMove.employeeID, supervisorID = lastMove.supervisorID;
            var employee = this.findEmployee(this.ceo, employeeID_1);
            var supervisor = this.findEmployee(this.ceo, supervisorID);
            if (!employee || !supervisor) {
                throw new Error('Invalid employee or supervisor ID');
            }
            // Store the current state for redo operation
            this.history.undo.push({
                employeeID: employeeID_1,
                supervisorID: employee.subordinates.length > 0 ? employee.subordinates[0].uniqueId : null,
            });
            // Move the employee back to the previous supervisor
            supervisor.subordinates = supervisor.subordinates.filter(function (subordinate) { return subordinate.uniqueId !== employeeID_1; });
            employee.subordinates = [];
            // Store the undo action in history
            this.history.undo.push({ employeeID: employeeID_1, supervisorID: supervisorID });
        }
    };
    EmployeeOrgApp.prototype.redo = function () {
        var lastUndo = this.history.undo.pop();
        if (lastUndo) {
            var employeeID = lastUndo.employeeID, supervisorID = lastUndo.supervisorID;
            var employee = this.findEmployee(this.ceo, employeeID);
            var supervisor = this.findEmployee(this.ceo, supervisorID);
            if (!employee || !supervisor) {
                throw new Error('Invalid employee or supervisor ID');
            }
            // Store the current state for undo operation
            this.history.move.push({
                employeeID: employeeID,
                supervisorID: employee.subordinates.length > 0 ? employee.subordinates[0].uniqueId : null,
            });
            // Move the employee back to the previous supervisor
            employee.subordinates = [];
            supervisor.subordinates.push(employee);
            employee.subordinates = [];
            // Store the redo action in history
            this.history.undo.push({ employeeID: employeeID, supervisorID: supervisorID });
        }
    };
    EmployeeOrgApp.prototype.findEmployee = function (employee, employeeID) {
        if (employee.uniqueId === employeeID) {
            return employee;
        }
        for (var _i = 0, _a = employee.subordinates; _i < _a.length; _i++) {
            var subordinate = _a[_i];
            var foundEmployee = this.findEmployee(subordinate, employeeID);
            if (foundEmployee) {
                return foundEmployee;
            }
        }
        return undefined;
    };
    return EmployeeOrgApp;
}());
var ceo = {
    uniqueId: 1,
    name: "John Smith",
    subordinates: [
        {
            uniqueId: 2,
            name: "Margot Donald",
            subordinates: [
                { uniqueId: 3, name: "Cassandra Reynolds", subordinates: [] },
                { uniqueId: 4, name: "Mary Blue", subordinates: [] },
                { uniqueId: 5, name: "Bob Saget", subordinates: [] },
                { uniqueId: 6, name: "Tina Teff", subordinates: [] },
                { uniqueId: 7, name: "Will Turner", subordinates: [] },
            ],
        },
        {
            uniqueId: 8,
            name: "Tyler Simpson",
            subordinates: [
                { uniqueId: 9, name: "Harry Tobs", subordinates: [] },
                { uniqueId: 10, name: "Thomas Brown", subordinates: [] },
                { uniqueId: 11, name: "George Carrey", subordinates: [] },
                { uniqueId: 12, name: "Gary Styles", subordinates: [] },
                { uniqueId: 13, name: "Ben Willis", subordinates: [] },
                { uniqueId: 14, name: "Georgina Flangy", subordinates: [] },
                { uniqueId: 15, name: "Sophie Turner", subordinates: [] },
            ],
        },
    ],
};
var app = new EmployeeOrgApp(ceo);
// Move an employee to a new supervisor 
app.move(5, 14);
// Print the updated organization chart 
console.log(JSON.stringify(app.ceo, null, 2));
// Undo the last move
app.undo();
// Print the organization chart after undoing the move 
console.log(JSON.stringify(app.ceo, null, 2));
// Redo the previously undone action 
app.redo();
// Print the organization chart after redoing the move 
console.log(JSON.stringify(app.ceo, null, 2));
