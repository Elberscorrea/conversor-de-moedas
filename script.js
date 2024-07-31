const listaDeslizante = document.querySelectorAll("form select"),
  moedaOrigem = document.querySelector(".from select"),
  moedaDestino = document.querySelector(".to select"),
  botaoObterTaxa = document.querySelector("form button");

const taxasDeCambio = {
  USD: { EUR: 0.85, JPY: 110.57, GBP: 0.73, AUD: 1.34, CAD: 1.25, CHF: 0.91, CNY: 6.45, SEK: 8.63, NZD: 1.40, BRL: 5.25 },
  EUR: { USD: 1.18, JPY: 130.17, GBP: 0.86, AUD: 1.58, CAD: 1.47, CHF: 1.08, CNY: 7.60, SEK: 10.14, NZD: 1.64, BRL: 6.20 },
  JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0066, AUD: 0.012, CAD: 0.011, CHF: 0.0083, CNY: 0.059, SEK: 0.078, NZD: 0.013, BRL: 0.048 },
  GBP: { USD: 1.37, EUR: 1.17, JPY: 151.39, AUD: 1.85, CAD: 1.71, CHF: 1.25, CNY: 8.87, SEK: 11.78, NZD: 1.91, BRL: 7.25 },
  AUD: { USD: 0.75, EUR: 0.63, JPY: 81.91, GBP: 0.54, CAD: 0.92, CHF: 0.68, CNY: 4.80, SEK: 6.36, NZD: 1.03, BRL: 3.92 },
  CAD: { USD: 0.80, EUR: 0.68, JPY: 88.81, GBP: 0.58, AUD: 1.09, CHF: 0.74, CNY: 5.20, SEK: 6.91, NZD: 1.12, BRL: 4.33 },
  CHF: { USD: 1.10, EUR: 0.92, JPY: 120.00, GBP: 0.80, AUD: 1.47, CAD: 1.36, CNY: 7.02, SEK: 9.33, NZD: 1.51, BRL: 5.91 },
  CNY: { USD: 0.15, EUR: 0.13, JPY: 17.36, GBP: 0.11, AUD: 0.21, CAD: 0.19, CHF: 0.14, SEK: 1.33, NZD: 0.21, BRL: 0.84 },
  SEK: { USD: 0.12, EUR: 0.099, JPY: 13.05, GBP: 0.085, AUD: 0.16, CAD: 0.14, CHF: 0.11, CNY: 0.75, NZD: 0.16, BRL: 0.63 },
  NZD: { USD: 0.71, EUR: 0.61, JPY: 79.28, GBP: 0.52, AUD: 0.97, CAD: 0.89, CHF: 0.67, CNY: 4.70, SEK: 6.15, BRL: 3.80 },
  BRL: { USD: 0.19, EUR: 0.16, JPY: 20.87, GBP: 0.14, AUD: 0.26, CAD: 0.23, CHF: 0.17, CNY: 1.19, SEK: 1.59, NZD: 0.26 }
};

for (let i = 0; i < listaDeslizante.length; i++) {
  for (let moeda in taxasDeCambio) {
    let selecionado =
      i == 0
        ? moeda == "USD"
          ? "selected"
          : ""
        : moeda == "EUR"
        ? "selected"
        : "";
    let opcaoTag = `<option value="${moeda}" ${selecionado}>${moeda}</option>`;
    listaDeslizante[i].insertAdjacentHTML("beforeend", opcaoTag);
  }
}

botaoObterTaxa.addEventListener("click", (e) => {
  e.preventDefault();
  calcularTaxaDeCambio();
});

const iconeTroca = document.querySelector("form .icon");
iconeTroca.addEventListener("click", () => {
  let codigoTemp = moedaOrigem.value;
  moedaOrigem.value = moedaDestino.value;
  moedaDestino.value = codigoTemp;
  calcularTaxaDeCambio();
});

function calcularTaxaDeCambio() {
  const valor = document.querySelector("form input");
  const taxaCambioTxt = document.querySelector("form .exchange-rate");
  let valorQuantia = valor.value;
  if (valorQuantia == "" || valorQuantia == "0") {
    valor.value = "1";
    valorQuantia = 1;
  }
  let taxaCambio = taxasDeCambio[moedaOrigem.value][moedaDestino.value];
  if (taxaCambio) {
    let totalTaxaCambio = (valorQuantia * taxaCambio).toFixed(2);
    taxaCambioTxt.innerText = `${valorQuantia} ${moedaOrigem.value} = ${totalTaxaCambio} ${moedaDestino.value}`;
  } else {
    taxaCambioTxt.innerText = "Taxa de câmbio não disponível";
  }
}
