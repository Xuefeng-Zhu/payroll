pragma solidity ^0.4.13;

contract Payroll {
    uint constant payDuration = 10 seconds;

    struct Employee {
        address id;
        uint salary;
        uint lastPaidDay;
    }

    address owner;
    uint public totalSalary;
    mapping (address => Employee) public employees;

    event NewEmployee(
        address id,
        uint salary,
        uint lastPaidDay
    );
    event NewFund(
        uint value
    );

    function Payroll() {
        owner = msg.sender;
    }

    function checkEmployee(address employeeId) returns (uint salary, uint lastPaidDay) {
        Employee storage employee = employees[employeeId];
        salary = employee.salary;
        lastPaidDay = employee.lastPaidDay;
    }

    function _partialPaid(Employee employee) private {
        uint payment = employee.salary *
            (now - employee.lastPaidDay) / payDuration;
        assert(payment <= this.balance);
        employee.lastPaidDay = now;
        employee.id.transfer(payment);
    }

    function updateEmployee(address employeeId, uint salary) {
        require(msg.sender == owner);
        require(salary > 0);

        Employee storage employee = employees[employeeId];

        NewEmployee(employeeId, salary, now);
        if (employee.salary == 0) {
            employees[employeeId] = Employee(employeeId, salary * 1 ether, now);
            totalSalary += employees[employeeId].salary;
        } else {
            _partialPaid(employee);
            totalSalary -= employee.salary;
            employee.salary = salary * 1 ether;
            totalSalary += employee.salary;
        }
    }

    function removeEmployee(address employeeId) returns(uint) {
        Employee storage employee = employees[employeeId];
        require(employee.id != 0x0);

        _partialPaid(employee);
        totalSalary -= employees[employeeId].salary;
        delete employees[employeeId];
    }

    function addFund() payable {
        require(msg.value > 0);
        NewFund(this.balance);
    }

    function calculateRunWay() returns (uint round) {
        assert(totalSalary > 0);
        round = this.balance / totalSalary;
    }

    function hasEnoughFund() returns (bool) {
        return calculateRunWay() > 0;
    }

    function getPaid() {
        Employee storage employee = employees[msg.sender];
        require(employee.id != 0x0);

        uint nextPayDay = employee.lastPaidDay + payDuration;
        assert(now > nextPayDay);
        assert(employee.salary <= this.balance);
        employee.lastPaidDay = nextPayDay;
        employee.id.transfer(employee.salary);
    }
}
