function customPhoneValidator(phoneNumber) {

    var str,
        maxLength,
        minLength,
        countryValues,
        phoneNumberPrefix,
        countryPhoneCodes;

    str = phoneNumber;
    minLength = 8;
    maxLength = 8;

    //CountryCode Phone prefix
    countryPhoneCodes = {
        'United Kingdom': { 'code': '44', 'minChar': 10, 'max': 10 },
        'Denmark': { 'code': '45', 'minChar': 8, 'maxChar': 8 },
        'Sweden': { 'code': '46', 'minChar': 9, 'maxChar': 9 },
        'Norway': { 'code': '47', 'minChar': 8, 'maxChar': 8 },
        'Germany': { 'code': '49', 'minChar': 11, 'maxChar': 11 }
    };

    // Check the input for valid phone chars [0-9] and + character.
    if (generalFunctions.validCharsInPhoneNumber(str)) {

        setValidity('notValidPhoneFormat', true);

        // If phone Prefix is eks. +45
        if (generalFunctions.stringStartWithPlus(str)) {

            phoneNumberPrefix = str[1].concat(str[2]);
            countryValues = generalFunctions.findPropertyKeyInCollection(countryPhoneCodes, 'code', phoneNumberPrefix);

            // If lookup doesen´t exist in countryPhoneCodes then set maxlengt to 20. DTG requirement
            if (countryValues) {
                minLength = (countryValues.minChar + 3);
                maxLength = (countryValues.maxChar + 3);
            } else {
                maxLength = 20;
            }

        } else if (generalFunctions.stringStartWithDoubleZero(str)) {

            if (str.length >= 4) {

                phoneNumberPrefix = str[2].concat(str[3]);

                countryValues = generalFunctions.findPropertyKeyInCollection(countryPhoneCodes, 'code', phoneNumberPrefix);

                // If lookup doesen´t exist in countryPhoneCodes then set maxlengt to 20. DTG requirement
                if (countryValues) {
                    minLength = (countryValues.minChar + 4);
                    maxLength = (countryValues.maxChar + 4);
                } else {
                    maxLength = 20;
                }
            }
        }

        // check if phone number has been cleared.
        if (str === '' || str.length === 0) {
            inputCleared();
        } else {
            setValidity('required', true);
            //run phone validators on min and max length regarding to country specifications
            if (str.length !== 0) {
                setValidity('required', true);
                phoneToShort(str, minLength);
                phoneTolong(str, maxLength);
            } else {
                setValidity('required', false);
            }
        }

    } else {
        setValidity('notValidPhoneFormat', false);
    }

    /**
     * @author MKI
     * @description When user clears input field only required field is shown
     */
    function inputCleared() {
        setValidity('required', false);
        setValidity('notValidPhoneFormat', true);
        setValidity('validPhoneToShort', true);
        setValidity('validPhoneToLong', true);
    }

    /**
     * @author MKI
     * @description Check if a string contains spaces. if so then strip out the spaces. If no spaces are found
     * Then just return the original string.
     * @param {String} str
     * @returns {String}
     */
    function checkAndSpaceStripper(str) {

        if (typeof str === 'string') {

            if (str.match(/ /g)) {
                str = str.replace(/ /g, '');
            }
        } else {
            console.error('Type is not string');
        }
        return str;
    }

    /**
     * @author MKI
     * @description set Validity on validPhoneToShort (Required  minLength) regarding to condition
     * @param {String} phoneNumber
     * @param {Number} minLength
     */
    function phoneToShort(phoneNumber, minLength) {

        phoneNumber = checkAndSpaceStripper(phoneNumber);

        if (phoneNumber.length < minLength) {
            setValidity('validPhoneToShort', false);
        } else {
            setValidity('validPhoneToShort', true);
        }
    }

    /**
     * @author MKI
     * @description set Validity on validPhoneToLong (Required  maxLength) regarding to condition
     * @param {String} phoneNumber
     * @param {Number} maxLength
     */
    function phoneTolong(phoneNumber, maxLength) {

        phoneNumber = checkAndSpaceStripper(phoneNumber);

        if (phoneNumber.length > maxLength) {
            setValidity('validPhoneToLong', false);
        } else {
            setValidity('validPhoneToLong', true);
        }
    }

    function setValidity(field, isValid) {
        ctrl.$setValidity(field, isValid);
    }

    // we need to return our ngModelValue, to be displayed to the user(value of the input)
    return ngModelValue;
}

const PHONE_NUMBER = 91528964;
customPhoneValidator(PHONE_NUMBER); //?

export default customPhoneValidator