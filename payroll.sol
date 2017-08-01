pragma solidity ^0.4.13;

contract Payroll {
    uint constant payDuration = 10 seconds;

    struct Employee {
        address id;
        uint salary;
        uint lastPaidDay;
    }

    address owner;
    Employee[] employees;

    function Payroll() {
        owner = msg.sender;
    }

    function _findEmployee(address employeeId) private returns (Employee employee, uint index) {
        for (index = 0; index < employees.length; index++) {
            employee = employees[index];
            if (employee.id == employeeId) {
                return;
            }
        }
    }

    function _partialPaid(Employee employee) private {
        uint payment = employee.salary *
            (now - employee.lastPaidDay) / payDuration;
        require(payment <= this.balance);
        employee.lastPaidDay = now;
        employee.id.transfer(payment);
    }

    function checkEmployee(address employeeId) returns (uint salary, uint lastPaidDay) {
        var (employee, index) = _findEmployee(employeeId);
        salary = employee.salary;
        lastPaidDay = employee.lastPaidDay;
    }

    function updateEmployee(address employeeId, uint salary) {
        require(msg.sender == owner);
        require(salary > 0);

        var (employee, index) = _findEmployee(employeeId);

        if (employee.id == 0x0) {
            addEmployee(employeeId, salary);
        } else {
            _partialPaid(employee);
            employee.salary = salary * 1 ether;

        }
    }

    function addEmployee(address employeeId, uint salary) {
        require(salary > 0);
        employees.push(Employee(employeeId, salary * 1 ether, now));
    }

    function removeEmployee(address employeeId) {
        var (employee, index) = _findEmployee(employeeId);
        require(employee.id != 0x0);

        _partialPaid(employee);
        delete employees[index];
    }

    function addFund() payable returns (uint) {
        require(msg.value > 0);
        return this.balance;
    }

    function calculateRunWay() returns (uint) {
        uint totalSalary = 0;
        for (uint index = 0; index < employees.length; index++) {
            Employee memory employee = employees[index];
            totalSalary += employee.salary;
        }

        assert(totalSalary > 0);
        return this.balance / totalSalary;
    }

    function hasEnoughFund() returns (bool) {
        return calculateRunWay() > 0;
    }

    function getPaid() {
        var (employee, index) = _findEmployee(msg.sender);
        require(employee.id != 0x0);

        uint nextPayDay = employee.lastPaidDay + payDuration;
        assert(now > nextPayDay);
        assert(employee.salary <= this.balance);
        employee.lastPaidDay = nextPayDay;
        employee.id.transfer(employee.salary);
    }
}
