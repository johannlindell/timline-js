function expandDate () {
    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + days);
        return this;
    }

    Date.prototype.addMonths = function (months) {
        var currentMonth = this.getMonth();
        var newMonth = currentMonth + months;
        this.setMonth(newMonth)
    }

    Date.prototype.getDaysInMonth = function() {
        if (this.isLeapYear && this.getMonth() === 1) {
            return 29;
        }

        const daysInMonth = {
            0:31, //jan
            1:28, //feb
            2:31, //mar
            3:30, //apr
            4:31, //may
            5:30, //june
            6:31, //jul
            7:31, //aug
            8:30, //sep
            9:31, //oct
            10:30, //nov
            11:31 //dec
        }

        return daysInMonth[this.getMonth()];
    }

    Date.prototype.getMonthName = function() {    
        const monthName = {
            0:"Jan",
            1:"Feb",
            2:"Mar",
            3:"Apr",
            4:"May",
            5:"Jun",
            6:"Jul",
            7:"Aug",
            8:"Sep",
            9:"Oct",
            10:"Nov",
            11:"Dec"
        }

        return monthName[this.getMonth()];
    }


    Date.prototype.isLeapYear = function() {
        return this.getFullYear % 4 === 0;
    }
}