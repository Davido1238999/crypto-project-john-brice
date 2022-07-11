// parallax Effect
function reveal() {
    var reveals = $(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);

/////////////////////////////////////////////////////////////////////////////////////////////

// מציג נתונים של מטבעות אחד אחד בהכנסת ערך

(function () {
    let coinsArray;
    (function () {
        let api = 'https://api.coingecko.com/api/v3/coins';
        $.get(api)
            .then(function (coins) {
                coinsArray = coins;
                getCoins(coins);
            })
    })()
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////  הצבת המטבעות במשתנים
    function getCoins(coins) {
        $(".cards").empty();
        for (let coin of coins) {
            let image = coin.image.large;
            let coinSymbol = coin.symbol;
            let coinId = coin.id;
            let currencyUSD = coin.market_data.current_price.usd;
            let currencyEUR = coin.market_data.current_price.eur;
            let currencyILS = coin.market_data.current_price.ils;
            let cardsDiv = $(`<div class="card">
                    <div class="img-name">
                    <img src="${image}">
                    <h2 id="coinId">${coinId.toUpperCase()}</h2>
                    </div>
                    <p>${coinSymbol.toUpperCase()}</p>
                    <p class="currency hidden">USD:${currencyUSD}$</p>
                    <p class="currency hidden">EUR:${currencyEUR}€</p>
                    <p class="currency hidden">ILS:${currencyILS}₪</p>
                    <div class="forMore">
                        <button id="button">more information</button>
                    </div>`);
            $(cardsDiv).appendTo(".cards");
            $(cardsDiv).find("button").click(function () {
                $(cardsDiv).find(".currency").toggleClass("hidden");
            });
        }

    }
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////חיפוש לפי מטבע
    $("#searchCoins").keyup(function () {
        $(".header").hide();
        if ($("#searchCoins").val() == "") {
            $(".header").show();
            window.location.replace("index.html#page1");
        }

        let coinSearchValue = $("#searchCoins").val();
        filterCoins(coinSearchValue);

    });
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////פילטור מטבעות
    function filterCoins(coinSearchValue) {
        if (coinSearchValue == "") {
            getCoins(coinsArray);
            return;
        }
        let filteredCoins = coinsArray.filter(function (coin) {
            let filterId = coin.id.toString().toLowerCase().includes(coinSearchValue);
            let filterSymbol = coin.symbol.toLowerCase().includes(coinSearchValue);
            let filterName = coin.name.toLowerCase().includes(coinSearchValue);
            return filterId || filterSymbol || filterName;
        })
        getCoins(filteredCoins);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////


    // $(window).on("load", function () {
    //     $(".loading-wrapper").fadeOut("slow");
    // });

    setTimeout(function () {
        $(".loading-wrapper").fadeOut("slow");
    }, 1000);
})();