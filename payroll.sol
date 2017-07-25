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
    
    function findEmployee(address employeeId) private returns (Employee storage) {
        for (uint index = 0; index < employees.length; index++) {
            Employee storage employee = employees[index];
            if (employee.id == employeeId) {
                return employee;
            }
        }  
    }
    
    function checkEmployee(address employeeId) returns (uint salary, uint lastPaidDay) {
        Employee storage employee = findEmployee(employeeId);
        salary = employee.salary;
        lastPaidDay = employee.lastPaidDay;
    }

    function updateEmployee(address employeeId, uint salary) {
        require(msg.sender == owner);
        Employee storage employee = findEmployee(employeeId);
        
        if (employee.salary == 0) {
            addEmployee(employeeId, salary);
        } else {
            uint payment = employee.salary *
                (now - employee.lastPaidDay) / payDuration;
            assert(payment <= this.balance);
            employee.id.transfer(payment);
            employee.salary = salary;
            employee.lastPaidDay = now;
       
        }
    }
    
    function addEmployee(address employeeId, uint salary) {
        employees.push(Employee(employeeId, salary, now));
    }

    function addFund() payable returns (uint) {
        require(msg.value > 0);
        return this.balance;
    }

    function calculateRunWay() returns (uint) {
        // assert(salary > 0);
        // return this.balance / salary;
    }

    function hasEnoughFund() returns (bool) {
        return calculateRunWay() > 0;
    }

    function getPaid() {
        // require(employee == msg.sender);
        
        // uint nextPayDay = lastPaidDay + payDuration;
        // assert(now > nextPayDay);
        // employee.transfer(salary);
        // lastPaidDay = nextPayDay;
    }
}
