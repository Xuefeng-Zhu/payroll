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
    
    function findEmployee(address employeeId) private returns (Employee employee, uint index) {
        for (index = 0; index < employees.length; index++) {
            employee = employees[index];
            if (employee.id == employeeId) {
                return;
            }
        }  
    }
    
    function checkEmployee(address employeeId) returns (uint salary, uint lastPaidDay) {
        var (employee, index) = findEmployee(employeeId);
        salary = employee.salary;
        lastPaidDay = employee.lastPaidDay;
    }

    function updateEmployee(address employeeId, uint salary) {
        require(msg.sender == owner);
        require(salary > 0);

        var (employee, index) = findEmployee(employeeId);
        
        if (employee.id == 0x0) {
            addEmployee(employeeId, salary);
        } else {
            uint payment = employee.salary *
                (now - employee.lastPaidDay) / payDuration;
            assert(payment <= this.balance);
            employee.id.transfer(payment);
            employee.salary = salary * 1 ether;
            employee.lastPaidDay = now;
       
        }
    }
    
    function addEmployee(address employeeId, uint salary) {
        require(salary > 0);
        employees.push(Employee(employeeId, salary * 1 ether, now));
    }
    
    function removeEmployee(address employeeId) returns(uint) {
        var (employee, index) = findEmployee(employeeId);
        delete employees[index];
        return employees.length;
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
        var (employee, index) = findEmployee(msg.sender);
        require(employee.id != 0x0);

        uint nextPayDay = employee.lastPaidDay + payDuration;
        assert(now > nextPayDay);
        assert(employee.salary <= this.balance);
        employee.lastPaidDay = nextPayDay;
        employee.id.transfer(employee.salary);
    }
}
