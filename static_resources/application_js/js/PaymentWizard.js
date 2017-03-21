var tblMain;
Number.prototype.toFixed = function (fractionDigits) {
    //return Math.floor(Number(this) * 100) / 100
    return Number(this.toString().match(/^-?\d+(?:\.\d{0,2})?/))
}

function changeContribAmount(elem) {
    var paymentAmount = $(elem).closest('table').closest('tr').find('td input.paymentAmount').val().trim().replace(',', '');
    var contribAmountElement = $(elem).closest('tr').find('.ContribAmount');
    var allContribs = $(elem).closest('table').find('tr td input.ContribAmount');
    var totalContribAmount = parseFloat('0');
    var oldAmount = $(contribAmountElement).val().trim() != '' ? parseFloat($(contribAmountElement).val().trim().replace(',', '')) : parseFloat('0');

    if ($(elem).val().trim() == '') {
        alert('You entered non-digit value!\nPlease enter valid value.');
        $(elem).val(getPercentage(paymentAmount, oldAmount));
        event.returnValue = false;
    }
    else if ($(elem).val().trim().indexOf('-') >= 0) {
        alert('You entered negative percentage!\nPlease enter valid value.');
        $(elem).val(getPercentage(paymentAmount, oldAmount));
        event.returnValue = false;
    }
    else {
        var newAmount = $(elem).val().trim() != '' ? parseFloat(parseFloat($(elem).val().trim().replace(',', '')) * parseFloat(paymentAmount) / 100) : parseFloat('0');
        for (var iIndex = 0; iIndex < allContribs.length; iIndex++) {
            if (allContribs[iIndex].value.trim() != '')
                totalContribAmount = parseFloat(totalContribAmount).toFixed(2) + parseFloat(allContribs[iIndex].value.trim().replace(',', '')).toFixed(2);
        }
        totalContribAmount = parseFloat(totalContribAmount) + parseFloat(parseFloat(newAmount) - parseFloat(oldAmount));
        var totalContribAmountNew;
        var paymentAmountNew;

        if (totalContribAmount < 0)
            totalContribAmountNew = -(totalContribAmount)
        else
            totalContribAmountNew = totalContribAmount;

        if (paymentAmount < 0)
            paymentAmountNew = -(paymentAmount);
        else
            paymentAmountNew = paymentAmount;

        if (parseFloat(parseFloat(totalContribAmountNew).toFixed(2)) > parseFloat(parseFloat(paymentAmountNew).toFixed(2))) {
            $(elem).val(getPercentage(paymentAmount, oldAmount));
            event.returnValue = false;
        }
        else if (parseFloat(parseFloat(totalContribAmountNew).toFixed(2)) < parseFloat(parseFloat(paymentAmountNew).toFixed(2))) {
            //contribAmountElement.val(parseFloat(newAmount).toFixed(2));
            contribAmountElement.val(parseFloat(parseFloat(newAmount).toPrecision(getLength(newAmount.toString()))).toFixed(2));
            calculateScheduledPayment();
        }
        else {
            //contribAmountElement.val(parseFloat(newAmount).toFixed(2));
            contribAmountElement.val(parseFloat(parseFloat(newAmount).toPrecision(getLength(newAmount.toString()))).toFixed(2));
            calculateScheduledPayment();
        }
    }
}

function getPercentage(totalAmount, unitAmount)
//{ if (unitAmount != NaN && totalAmount != NaN) return parseFloat((unitAmount / totalAmount) * 100).toFixed(2); else parseFloat('0'); }
{ if (unitAmount != NaN && totalAmount != NaN) return parseFloat(parseFloat((unitAmount / totalAmount) * 100).toPrecision(getLength(((unitAmount / totalAmount) * 100).toString()))).toFixed(2); else parseFloat('0'); }

function getUnitAmountFromPercentage(totalAmt, percentage)
//{ if (percentage != NaN && totalAmt != NaN) return parseFloat((totalAmt * percentage) / 100).toFixed(2); else return parseFloat('0'); }
{ if (percentage != NaN && totalAmt != NaN) return parseFloat(parseFloat((totalAmt * percentage) / 100).toPrecision(getLength(((totalAmt * percentage) / 100).toString()))).toFixed(2); else return parseFloat('0'); }

function changeContribPercentage(elem) {
    var paymentAmount = $(elem).closest('table').closest('tr').find('td input.paymentAmount').val().trim().replace(',', '');
    var contribPercentageElement = $(elem).closest('tr').find('.ContribPercentage');
    var allContribs = $(elem).closest('table').find('tr td input.ContribAmount');
    var totalContribAmount = parseFloat('0');
    var oldAmount = $(contribPercentageElement).val().trim() != '' ? parseFloat(getUnitAmountFromPercentage(parseFloat(paymentAmount), parseFloat($(contribPercentageElement).val().trim().replace(',', '')))) : parseFloat('0');
    if ($(elem).val().trim() == '') {
        alert('You entered non-digit value!\nPlease enter valid value.');
        $(elem).val(parseFloat(oldAmount).toFixed(2));
        event.returnValue = false;
    }
    else {
        var newAmount = $(elem).val().trim() != '' ? parseFloat($(elem).val().trim().replace(',', '')) : parseFloat('0');
        for (var iIndex = 0; iIndex < allContribs.length; iIndex++) {
            if (allContribs[iIndex].value.trim() != '')
                totalContribAmount = parseFloat(totalContribAmount).toFixed(2) + parseFloat(allContribs[iIndex].value.trim().replace(',', '')).toFixed(2);
        }
        var totalContribAmountNew;
        var paymentAmountNew;

        if (totalContribAmount < 0)
            totalContribAmountNew = -(totalContribAmount)
        else
            totalContribAmountNew = totalContribAmount;

        if (paymentAmount < 0)
            paymentAmountNew = -(paymentAmount);
        else
            paymentAmountNew = paymentAmount;

        if (parseFloat(totalContribAmountNew).toFixed(2) > parseFloat(paymentAmountNew).toFixed(2)) {
            $(elem).val(parseFloat(oldAmount).toFixed(2));
            event.returnValue = false;
        }
        else if (parseFloat(totalContribAmountNew).toFixed(2) < parseFloat(paymentAmountNew).toFixed(2)) {
            if (parseFloat(getPercentage(paymentAmount, newAmount)).toFixed(2) >= 0) {
                contribPercentageElement.val(parseFloat(getPercentage(paymentAmount, newAmount)).toFixed(2));
                calculateScheduledPayment();
            }
            else {
                alert("Contributing percentage can not be negative");
                $(elem).val(parseFloat(oldAmount).toFixed(2));
                event.returnValue = false;
            }
        }
        else {
            contribPercentageElement.val(parseFloat(getPercentage(paymentAmount, newAmount)).toFixed(2));
            calculateScheduledPayment();
        }
    }
}

function changePaymentAmount(elem) {
    var arrTokens = $('span[id$=inpOppAmount]').text().split(' ');
    //arrTokens = arrTokens[1] != '' ? arrTokens[1].value.split('('):'';
    var paymentAmount = parseFloat(AwardedAmount); //arrTokens[1] != '' ? parseFloat(arrTokens[1].trim().replace(',', '')) : parseFloat('0');
    var paymentAmountElement = $(elem).closest('tr').find('.paymentAmount');
    var allPayments = $(elem).closest('table').find('tr td input.paymentAmount');
    var totalContribAmount = parseFloat('0');
    var oldAmount = $(paymentAmountElement).val().trim() != '' ? parseFloat($(paymentAmountElement).val().trim().replace(',', '')) : parseFloat('0');
    //if (oldAmount < 0)
       // oldAmount = -(oldAmount);
    var arrMessage = $(elem).closest('table').find('tr td span.spMsg');

    for (var iIndex = 0; iIndex < arrMessage.length; iIndex++)
        arrMessage[iIndex].innerHTML = '';

    if ($(elem).val().trim() == '') {
        alert('You entered non-digit value!\nPlease enter valid value.');
        $(elem).val(getPercentage(paymentAmount, oldAmount));
        event.returnValue = false;
    }
    else {
        var newAmount = $(elem).val().trim() != '' ? parseFloat(parseFloat($(elem).val().trim()) * parseFloat(paymentAmount) / 100) : parseFloat('0');
        for (var iIndex = 0; iIndex < allPayments.length; iIndex++) {
            if (allPayments[iIndex].value.trim() != '')
                totalContribAmount = parseFloat(totalContribAmount).toFixed(2) + parseFloat(allPayments[iIndex].value.trim().replace(',', '')).toFixed(2);
        }
        totalContribAmount = parseFloat(totalContribAmount) + parseFloat(parseFloat(newAmount) - parseFloat(oldAmount));

        var totalContribAmountNew;
        var paymentAmountNew;

        if (totalContribAmount < 0)
            totalContribAmountNew = -(totalContribAmount)
        else
            totalContribAmountNew = totalContribAmount;

        if (paymentAmount < 0)
            paymentAmountNew = -(paymentAmount);
        else
            paymentAmountNew = paymentAmount;

        if (parseFloat(parseFloat(totalContribAmountNew).toFixed(2)) > parseFloat(parseFloat(paymentAmountNew).toFixed(2))) {
            $(elem).val(getPercentage(paymentAmount, oldAmount));
            calculateScheduledPayment();
            alert('Unscheduled amount cannot exceed awarded amount');
            event.returnValue = false;
        }
        else if (parseFloat(parseFloat(totalContribAmountNew).toFixed(2)) < parseFloat(parseFloat(paymentAmountNew).toFixed(2))) {
            paymentAmountElement.val(parseFloat(newAmount).toFixed(2));
            changeRelatedContribsAmounts(elem);
            calculateScheduledPayment();
        }
        else {
            paymentAmountElement.val(parseFloat(newAmount).toFixed(2));
            changeRelatedContribsAmounts(elem);
            calculateScheduledPayment();
        }
    }
}

function changePaymentPercentage(elem) {
    var allContribProgram;
    var arrTokens = $('span[id$=inpOppAmount]').text().split(' ');
    //arrTokens = arrTokens[1] != '' ? arrTokens[1].value.split('('):'';
    var paymentAmount = parseFloat(AwardedAmount); //arrTokens[1] != '' ? parseFloat(arrTokens[1].trim().replace(',', '')) : parseFloat('0');
    var paymentPercentageElement = $(elem).closest('tr').find('.paymentPercentage');
    var allPayments = $(elem).closest('table').find('tr td input.paymentAmount');
    var arrMessage = $(elem).closest('table').find('tr td span.spMsg');
    var totalContribAmount = parseFloat('0').toFixed(2);
    var oldAmount = $(paymentPercentageElement).val().trim() != '' ? parseFloat(getUnitAmountFromPercentage(parseFloat(paymentAmount), parseFloat($(paymentPercentageElement).val().trim().replace(',', '')))) : parseFloat('0');
    if ($(elem).val().trim() == '') {
        alert('You entered non-digit value!\nPlease enter valid value.');
        $(elem).val(parseFloat(oldAmount).toFixed(2));
        event.returnValue = false;
    }
    else {
        var newAmount = $(elem).val().trim() != '' ? parseFloat($(elem).val().trim().replace(',', '')) : parseFloat('0');
        for (var iIndex = 0; iIndex < allPayments.length; iIndex++) {
            if (allPayments[iIndex].value.trim() != '')
                totalContribAmount = parseFloat(totalContribAmount).toFixed(2) + parseFloat(allPayments[iIndex].value.trim().replace(',', '')).toFixed(2);
        }
        if (parseFloat(totalContribAmount).toFixed(2) > parseFloat(paymentAmount).toFixed(2)) {
            $(elem).val(parseFloat(oldAmount).toFixed(2));
            calculateScheduledPayment();
            var totalcontrib = 0;
            for (var iIndex = 0; iIndex < allPayments.length; iIndex++) {
                totalcontrib = 0;
                allContribProgram = $(elem).closest('table').find('tr td table')[iIndex];

                for (var iIndex_1 = 1; iIndex_1 < allContribProgram.rows.length; iIndex_1++) {
                    totalcontrib = parseFloat(totalcontrib).toFixed(2) + parseFloat($($(allContribProgram.rows[iIndex_1].cells[2]).find("input"))[0].value.replace(',', '')).toFixed(2);
                    totalcontrib = parseFloat(parseFloat(totalcontrib).toPrecision(getLength(totalcontrib.toString())));
                }

                //if (totalcontrib.toFixed(2) < parseFloat(parseFloat(allPayments[iIndex].value.trim().replace(',', '')).toPrecision(getLength(allPayments[iIndex].value.trim().replace(',', '')))).toFixed(2))
                if (totalcontrib.toFixed(2) < parseFloat(allPayments[iIndex].value.trim().replace(',', '')).toFixed(2))
                    arrMessage[iIndex].innerHTML = 'The contributing program amount is not equal to payment amount. Please schedule ' + parseFloat(parseFloat(allPayments[iIndex].value.trim().replace(',', '')).toFixed(2) - totalcontrib.toFixed(2)).toFixed(2) + ' in contributing program'
                else
                    arrMessage[iIndex].innerHTML = '';
            }
            tblMain = elem;
            alert('Unscheduled amount cannot exceed awarded amount');
            event.returnValue = false;
        }
        else if (parseFloat(totalContribAmount).toFixed(2) < parseFloat(paymentAmount).toFixed(2)) {
            paymentPercentageElement.val(parseFloat(getPercentage(paymentAmount, newAmount)).toFixed(2));
            changeRelatedContribsAmounts(elem);
            calculateScheduledPayment();
        }
        else {
            paymentPercentageElement.val(parseFloat(getPercentage(paymentAmount, newAmount)).toFixed(2));
            changeRelatedContribsAmounts(elem);
            calculateScheduledPayment();
        }
    }
}

function changeRelatedContribsAmounts(elem) {
    var paymentAmount = $(elem).closest('tr').find('input.paymentAmount').val().trim() != '' ? parseFloat($(elem).closest('tr').find('input.paymentAmount').val().trim().replace(',', '')).toFixed(2) : parseFloat('0');
    var arrContribAmounts = $(elem).closest('tr').find('td input.ContribAmount');
    var arrContribPercents = $(elem).closest('tr').find('td input.ContribPercentage');
    for (var iIndex = 0; iIndex < arrContribPercents.length; iIndex++) {
        if (arrContribPercents[iIndex].value.trim() != '')
            arrContribAmounts[iIndex].value = getUnitAmountFromPercentage(parseFloat(paymentAmount), parseFloat(arrContribPercents[iIndex].value.trim().replace(',', '')));
        else
            arrContribAmounts[iIndex].value = parseFloat('0').toFixed(2);
    }
}

function calculateScheduledPayment() {
    var arrTotalPaymentTokens = $('span[id$=inpOppAmount]').text().split(' ');
    //arrTotalPaymentTokens = arrTotalPaymentTokens[1] != '' ? arrTotalPaymentTokens[1].value.split('('):'';
    var availPaymentAmount = parseFloat(AwardedAmount); //arrTotalPaymentTokens[1] != '' ? parseFloat(arrTotalPaymentTokens[1].trim().replace(',', '')) : parseFloat('0');
    var scheduledAmount = parseFloat('0');
    var unusedPaymentAmt = parseFloat('0');
    var arrPaymentsAmounts = $(document).find('input.ContribAmount');
    var unscheduledAmtElement = $(document).find('span.unsheduledAmount');
    if (arrPaymentsAmounts != null) {
        for (var iIndex = 0; iIndex < arrPaymentsAmounts.length; iIndex++) {
            if (arrPaymentsAmounts[iIndex].value.trim() != '') {
                scheduledAmount = parseFloat(scheduledAmount).toFixed(2) + parseFloat(arrPaymentsAmounts[iIndex].value.trim().replace(',', '')).toFixed(2);
                scheduledAmount = parseFloat(scheduledAmount).toPrecision(getLength(scheduledAmount.toString()));
            }
        }
        if (scheduledAmount != null) {
            unusedPaymentAmt = parseFloat(availPaymentAmount).toFixed(2) - parseFloat(scheduledAmount).toFixed(2);
            unusedPaymentAmt = parseFloat(unusedPaymentAmt).toPrecision(getLength(unusedPaymentAmt.toString()));
        }
    }
    if (unscheduledAmtElement[0] != null)
        unscheduledAmtElement[0].innerHTML = parseFloat(unusedPaymentAmt).toFixed(2);

    if (tblMain != null) {
        var arrMessage = $(tblMain).closest('table').find('tr td span.spMsg');
        for (var iIndex = 0; iIndex < arrMessage.length; iIndex++)
            arrMessage[iIndex].innerHTML = '';
    }
}

function setPaymentEditability(elem) {
    var currentStatus = $(elem).val();
    var arrInputTextboxes = $(elem).closest('tr').find('td input');
    var arrDropdownList = $(elem).closest('tr').find('td select');
    if (currentStatus == 'Paid') {
        for (var iIndex = 0; iIndex < arrInputTextboxes.length; iIndex++) {
            if (arrInputTextboxes[iIndex].type == 'button')
                arrInputTextboxes[iIndex].disabled = true;
            else {
                arrInputTextboxes[iIndex].readOnly = true;
                var onfocusScript = arrInputTextboxes[iIndex].onfocus;
                if (onfocusScript != null && onfocusScript != '') {
                    arrInputTextboxes[iIndex].disabled = true;
                }
            }
        }
        for (var iIndex = 0; iIndex < arrDropdownList.length; iIndex++) {
            if (arrDropdownList[iIndex] != elem)
                arrDropdownList[iIndex].disabled = true;
        }
    }
    else {
        for (var iIndex = 0; iIndex < arrInputTextboxes.length; iIndex++) {
            if (arrInputTextboxes[iIndex].type == 'button')
                arrInputTextboxes[iIndex].disabled = false;
            else {
                arrInputTextboxes[iIndex].readOnly = false;
                var onfocusScript = arrInputTextboxes[iIndex].onfocus;
                if (onfocusScript != null && onfocusScript != '') {
                    arrInputTextboxes[iIndex].disabled = false;
                }
            }
        }
        for (var iIndex = 0; iIndex < arrDropdownList.length; iIndex++) {
            if (arrDropdownList[iIndex] != elem)
                arrDropdownList[iIndex].disabled = false;
        }
    }
}

function getLength(str) {
    var len = 2;

    for (var i = 0; i < str.length; i++) {
        if (str[i] == '.')
            break;
        if (parseInt(str[i]) >= 0 && parseInt(str[i]) <= 9)
            len++;
    }
    return len;
}