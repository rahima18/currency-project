document.addEventListener("DOMContentLoaded", async function () {
    const defaultFromCurrency = 'RUB';
    const defaultToCurrency = 'USD';

    const fromCurrencyButtons = document.querySelectorAll('.from');
    const toCurrencyButtons = document.querySelectorAll('.to');
    let from = defaultFromCurrency;
    let toUser = defaultToCurrency;

    const apiUrlMain = 'https://v6.exchangerate-api.com/v6';
    const apiKey = '355a1739208fb2a770b2a2de';

    const amountFromInput = document.querySelector('.amount1');
    const amountToInput = document.querySelector('.amount2');
    const textFrom = document.querySelector('.areaText1');
    const textTo = document.querySelector('.areaText2');

    function removeSelectedClass(elements) {
        elements.forEach(element => {
            element.classList.remove('selected');
        });
    }

    function addSelectedClass(element) {
        element.classList.add('selected');
    }

    function updateConversionResults(from, to, amount) {
        fetch(`${apiUrlMain}/${apiKey}/pair/${from}/${to}/${amount}`)
            .then(response => response.json())
            .then(data => {
                if (data.conversion_result !== undefined) {
                    amountToInput.value = data.conversion_result;
                } else {
                    amountToInput.value = '0';
                }
            })
            .catch(() => {
                alert('İnternetinizi yoxlayin.');
            });

        fetch(`${apiUrlMain}/${apiKey}/pair/${from}/${to}/1`)
            .then(response => response.json())
            .then(data => {
                textFrom.innerText = `1 ${from} = ${data.conversion_result} ${to}`;
                textTo.innerText = `1 ${to} = ${1 / data.conversion_result} ${from}`;
            })
            .catch(() => {
                alert('İnternetinizi yoxlayin.');
            });
    }

    function handleFromButtonClick(event) {
        removeSelectedClass(fromCurrencyButtons);
        addSelectedClass(event.target);
        from = event.target.id;
        updateConversionResults(from, toUser, amountFromInput.value);
    }

    function handleToButtonClick(event) {
        removeSelectedClass(toCurrencyButtons);
        addSelectedClass(event.target);
        toUser = event.target.id;
        updateConversionResults(from, toUser, amountFromInput.value);
    }

    fromCurrencyButtons.forEach(button => {
        button.addEventListener('click', handleFromButtonClick);
    });

    toCurrencyButtons.forEach(button => {
        button.addEventListener('click', handleToButtonClick);
    });

    amountFromInput.addEventListener('input', () => {
        updateConversionResults(from, toUser, amountFromInput.value);
    });

    updateConversionResults(defaultFromCurrency, defaultToCurrency, 1);
});