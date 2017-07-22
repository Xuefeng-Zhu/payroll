pragma solidity ^0.4.13;

contract Payroll {
    uint constant payDuration = 10 seconds;

    address owner;
    address employee;
    uint salary;
    uint lastPaidDay;

    function Payroll() {
        owner = msg.sender;
    }

    function updateEmployee(address newEmployee, uint newSalary) {
        require(msg.sender == owner);
        
        if (employee != 0x0) {
            uint payment = salary * (now - lastPaidDay) / payDuration;
            assert(payment <= this.balance);
            employee.transfer(payment);
        }

        employee = newEmployee;
        salary = newSalary * 1 ether;
        lastPaidDay = now;
    }

    function addFund() payable returns (uint) {
        require(msg.value > 0);
        return this.balance;
    }

    function calculateRunWay() returns (uint) {
        assert(salary > 0);
        return this.balance / salary;
    }

    function hasEnoughFund() returns (bool) {
        return calculateRunWay() > 0;
    }

    function getPaid() {
        require(employee == msg.sender);
        
        uint nextPayDay = lastPaidDay + payDuration;
        assert(now > nextPayDay);
        employee.transfer(salary);
        lastPaidDay = nextPayDay;
    }
}
