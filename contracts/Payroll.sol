pragma solidity ^0.4.13;

contract Payroll {
    uint constant payDuration = 10 seconds;

    struct Employee {
        address id;
        uint salary;
        uint lastPaidDay;
    }

    address owner;
    uint totalSalary;
    uint employeeCount;
    address[] employeeList;
    mapping (address => Employee) public employees;

    event NewEmployee(
        address employee
    );
    event UpdateEmployee(
        address employee
    );
    event RemoveEmployee(
        address employee
    );
    event NewFund(
        uint balance
    );
    event GetPaid(
        address employee
    );

    function Payroll() {
        owner = msg.sender;
    }

    function checkEmployee(uint index) returns (address employeeId, uint salary, uint lastPaidDay) {
        employeeId = employeeList[index];
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

        if (employee.salary == 0) {
            employees[employeeId] = Employee(employeeId, salary * 1 ether, now);
            totalSalary += employees[employeeId].salary;
            employeeCount += 1;
            employeeList.push(employeeId);
            NewEmployee(employeeId);
        } else {
            _partialPaid(employee);
            totalSalary -= employee.salary;
            employee.salary = salary * 1 ether;
            totalSalary += employee.salary;
            UpdateEmployee(employeeId);
        }
    }

    function removeEmployee(address employeeId) returns(uint) {
        Employee storage employee = employees[employeeId];
        require(employee.id != 0x0);

        _partialPaid(employee);
        totalSalary -= employees[employeeId].salary;
        delete employees[employeeId];
        employeeCount -= 1;
        RemoveEmployee(employeeId);
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
        GetPaid(employee.id);
    }

    function getInfo() returns (uint balance, uint runway, uint employeeC) {
        balance = this.balance;
        employeeC = employeeCount;

        if (totalSalary > 0) {
            runway = calculateRunWay();
        }
    }
}
